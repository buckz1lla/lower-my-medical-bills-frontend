"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { getAffiliateLink } from "@/lib/affiliateLinks";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const SHOW_PARSER_DEBUG = process.env.NEXT_PUBLIC_SHOW_PARSER_DEBUG === "true";
const PRICE_EXPERIMENT_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PRICE_EXPERIMENT === "true";
const PRICE_CONTROL_CENTS = Number(process.env.NEXT_PUBLIC_PRICE_CONTROL_CENTS || 299);
const PRICE_TEST_CENTS = Number(process.env.NEXT_PUBLIC_PRICE_TEST_CENTS || 499);

const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

const formatUsdFromCents = (value) => `$${(Number(value || 0) / 100).toFixed(2)}`;

const isClaimOutOfNetwork = (claim) => {
  if (!claim) {
    return false;
  }

  if (claim.network_status === "out_of_network") {
    return true;
  }

  return claim.in_network === false;
};

const formatNetworkStatus = (claim) => {
  if (!claim) {
    return "Unknown";
  }

  if (claim.network_status === "in_network") {
    return "In network";
  }

  if (claim.network_status === "out_of_network") {
    return "Out of network";
  }

  if (claim.in_network === true) {
    return "In network";
  }

  if (claim.in_network === false) {
    return "Out of network";
  }

  return "Unknown (verify with insurer)";
};

const getConfidenceLevel = (opportunity) => {
  const level = (opportunity?.confidence_level || "").toLowerCase();
  if (level === "high" || level === "medium" || level === "low") {
    return level;
  }

  const score = Number(opportunity?.confidence_score || 0);
  if (score >= 0.8) {
    return "high";
  }
  if (score >= 0.6) {
    return "medium";
  }
  return "low";
};

const pickPriceVariant = (analysisId) => {
  if (!PRICE_EXPERIMENT_ENABLED || !analysisId) {
    return { variant: "control", amountCents: PRICE_CONTROL_CENTS };
  }

  let hash = 0;
  for (let i = 0; i < analysisId.length; i += 1) {
    hash = (hash << 5) - hash + analysisId.charCodeAt(i);
    hash |= 0;
  }

  const variant = Math.abs(hash) % 2 === 0 ? "control" : "test";
  return {
    variant,
    amountCents: variant === "test" ? PRICE_TEST_CENTS : PRICE_CONTROL_CENTS,
  };
};

const trackEvent = async (event, data = {}) => {
  try {
    await fetch(`${API_BASE}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      }),
    });
  } catch {
    // Silent fail by design.
  }
};

const generatePdf = (analysis, templates) => {
  const pdf = new jsPDF();
  let y = 20;
  const margin = 20;
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const contentW = pageW - margin * 2;

  const addText = (text, size = 10, color = [0, 0, 0], gap = 5) => {
    if (!text) {
      return;
    }
    pdf.setFontSize(size);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(text, contentW);
    for (const line of lines) {
      if (y > pageH - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += gap;
    }
  };

  addText("Personalized EOB Appeal Package", 18, [0, 102, 204], 8);
  y += 2;
  addText(`File: ${analysis.file_name}`, 11);
  addText(`Generated: ${new Date().toLocaleDateString()}`, 11);
  y += 2;

  addText("Analysis Summary", 14, [0, 102, 204], 7);
  addText(`Potential Savings: ${formatMoney(analysis.total_potential_savings)}`);
  addText(`Total Billed: ${formatMoney(analysis.total_billed)}`);
  addText(`Insurance Paid: ${formatMoney(analysis.total_paid_by_insurance)}`);
  addText(`Your Responsibility: ${formatMoney(analysis.total_patient_responsibility)}`);

  if ((analysis.savings_opportunities || []).length > 0) {
    y += 3;
    addText("Savings Opportunities", 14, [0, 102, 204], 7);
    analysis.savings_opportunities.forEach((opp, idx) => {
      addText(`${idx + 1}. ${opp.description} (${formatMoney(opp.estimated_savings)})`, 10);
      addText(`Action: ${opp.recommended_action}`, 10, [70, 70, 70]);
      y += 1;
    });
  }

  if ((analysis.appeal_recommendations || []).length > 0) {
    y += 3;
    addText("Appeal Recommendations", 14, [0, 102, 204], 7);
    analysis.appeal_recommendations.forEach((rec, idx) => {
      addText(`${idx + 1}. ${rec.reason} (Success: ${Math.round((rec.success_probability || 0) * 100)}%)`, 10);
      (rec.steps || []).forEach((step, stepIdx) => {
        addText(`Step ${stepIdx + 1}: ${step}`, 10, [70, 70, 70]);
      });
      y += 1;
    });
  }

  if (templates?.templates) {
    y += 3;
    addText("Your Appeal Templates", 14, [0, 102, 204], 7);
    Object.entries(templates.templates).forEach(([key, content]) => {
      const title =
        key === "appeal_letter"
          ? "Appeal Letter"
          : key === "phone_script_insurer"
            ? "Phone Script - Insurance Co."
            : key === "phone_script_provider"
              ? "Phone Script - Provider"
              : key === "appeal_checklist"
                ? "Appeal Checklist"
                : "Negotiation Talking Points";
      addText(title, 11, [0, 102, 204]);
      addText(content, 9, [60, 60, 60], 4);
      y += 1;
    });
  }

  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    "Educational use only. Confirm all billing and coverage details directly with your insurer.",
    margin,
    pageH - 10,
  );

  return pdf;
};

function PaymentButton({ analysisId, pricing, disabled }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await trackEvent("checkout_started", {
        analysisId,
        price_variant: pricing.variant,
        amount_cents: pricing.amountCents,
      });

      const response = await fetch(`${API_BASE}/api/payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis_id: analysisId,
          origin: window.location.origin,
          price_variant: pricing.variant,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.checkout_url) {
        throw new Error(payload?.detail || "Unable to start checkout.");
      }

      window.location.href = payload.checkout_url;
    } catch (error) {
      alert(error.message || "Unable to start checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="payment-gate-next payzone-next">
      <div className="payzone-header-next">
        <p className="payzone-kicker-next">Next Step</p>
        <h3>Get Your Appeal Prep Toolkit</h3>
        <p className="payzone-subtitle-next">
          Checkout unlocks templates and guided checklists to help you prepare stronger calls and appeals.
        </p>
      </div>

      <div className="payzone-meta-next">
        <p className="payzone-price-next">{formatUsdFromCents(pricing.amountCents)} one-time</p>
        <p className="payzone-status-next">Locked until payment</p>
      </div>

      <ul>
        <li>Customized appeal letter template</li>
        <li>Phone scripts for insurer and provider</li>
        <li>Step-by-step appeal and verification checklist</li>
        <li>Negotiation talking points</li>
      </ul>
      <button
        className="btn-primary analyzer-submit payzone-cta-next"
        disabled={isLoading || disabled}
        onClick={handlePayment}
        type="button"
      >
        {isLoading ? "Redirecting to secure checkout..." : `Get Toolkit - ${formatUsdFromCents(pricing.amountCents)}`}
      </button>
      <p className="payment-gate-note-next">Secure Stripe checkout. One-time payment. No subscription.</p>
      <p className="safety-disclaimer-next">
        Educational support only. Verify benefits, network status, and billing details with your insurer before filing appeals.
      </p>
    </section>
  );
}

function ResultsContent() {
  const params = useParams();
  const { analysisId } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentParam = searchParams.get("payment");
  const sessionIdParam = searchParams.get("session_id");

  const [analysis, setAnalysis] = useState(null);
  const [templates, setTemplates] = useState(null);
  const [activeTab, setActiveTab] = useState("opportunities");
  const [expandedOpportunity, setExpandedOpportunity] = useState(null);
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [hasDownloadedPackage, setHasDownloadedPackage] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [emailCaptureValue, setEmailCaptureValue] = useState("");
  const [emailCaptureSubmitted, setEmailCaptureSubmitted] = useState(false);
  const [emailCaptureLoading, setEmailCaptureLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pricing = useMemo(() => pickPriceVariant(analysisId), [analysisId]);

  const loadTemplates = useCallback(async () => {
    const response = await fetch(`${API_BASE}/api/eob/templates/${analysisId}`);
    if (!response.ok) {
      throw new Error("Failed to load templates.");
    }
    const payload = await response.json();
    setTemplates(payload);
    setHasDownloadedPackage(true);
    return payload;
  }, [analysisId]);

  const refreshPaymentStatus = useCallback(
    async ({ sessionId = null, poll = false } = {}) => {
      setIsCheckingPayment(true);
      const attempts = poll ? 5 : 1;
      let paid = false;
      let latestStatus = "unpaid";

      for (let attempt = 0; attempt < attempts; attempt += 1) {
        try {
          const query = sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : "";
          const response = await fetch(`${API_BASE}/api/payments/status/${analysisId}${query}`);
          if (response.ok) {
            const payload = await response.json();
            latestStatus = payload.status || "unpaid";
            setPaymentStatus(latestStatus);
            if (payload.paid) {
              paid = true;
              break;
            }
          }
        } catch {
          // Continue polling attempts.
        }

        if (attempt < attempts - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }

      if (paid) {
        try {
          await loadTemplates();
          setPaymentMessage("Payment confirmed. Your appeal package is unlocked.");
        } catch {
          setPaymentMessage("Payment confirmed, but templates are still preparing. Refresh once.");
        }
      } else if (paymentParam === "cancelled") {
        setPaymentMessage("Checkout cancelled. You can return to payment whenever ready.");
      } else if (paymentParam === "success") {
        setPaymentMessage("Payment received. Waiting for Stripe confirmation. Refresh if still locked.");
      }

      setIsCheckingPayment(false);
      return latestStatus;
    },
    [analysisId, loadTemplates, paymentParam],
  );

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/eob/analysis/${analysisId}`);
        if (!response.ok) {
          throw new Error("Failed to load analysis results. Please try again.");
        }
        const payload = await response.json();
        if (!mounted) {
          return;
        }
        setAnalysis(payload);

        await trackEvent("results_page_viewed", {
          analysisId,
          price_variant: pricing.variant,
          price_amount_cents: pricing.amountCents,
          totalSavings: payload.total_potential_savings,
          opportunitiesFound: (payload.savings_opportunities || []).length,
        });
      } catch (loadError) {
        if (mounted) {
          setError(loadError.message || "Failed to load analysis results. Please try again.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
    refreshPaymentStatus({ sessionId: sessionIdParam, poll: paymentParam === "success" });

    return () => {
      mounted = false;
    };
  }, [analysisId, paymentParam, pricing.amountCents, pricing.variant, refreshPaymentStatus, sessionIdParam]);

  const handleEmailCapture = async (event) => {
    event.preventDefault();
    const email = emailCaptureValue.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return;
    }

    setEmailCaptureLoading(true);
    try {
      await fetch(`${API_BASE}/api/email/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          analysis_id: analysisId,
          savings_amount: analysis?.total_potential_savings || 0,
        }),
      });

      await trackEvent("email_subscribed", {
        analysisId,
        savings_amount: analysis?.total_potential_savings || 0,
      });
      setEmailCaptureSubmitted(true);
    } catch {
      setEmailCaptureSubmitted(true);
    } finally {
      setEmailCaptureLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!analysis) {
      return;
    }

    let latestTemplates = templates;
    if (hasDownloadedPackage) {
      try {
        latestTemplates = await loadTemplates();
      } catch {
        // Keep existing data.
      }
    }

    const pdf = generatePdf(analysis, latestTemplates);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    pdf.save(`appeal-package-${analysisId.substring(0, 8)}-${timestamp}.pdf`);
    await trackEvent("pdf_downloaded", {
      analysisId,
      hasTemplates: !!latestTemplates,
      opportunitiesCount: (analysis.savings_opportunities || []).length,
    });
  };

  const handleAffiliateClick = useCallback(async (affiliate, link) => {
    await trackEvent("affiliate_link_clicked", { affiliate, analysisId });
    window.open(link, "_blank");
  }, [analysisId]);

  const recommendations = useMemo(() => {
    if (!analysis) {
      return [];
    }

    const plansLink = getAffiliateLink("plans", "results-recommendations");
    const rightsLink = getAffiliateLink("rights", "results-recommendations");
    const appealsGuideLink = getAffiliateLink("appealsGuide", "results-recommendations");
    const coverageLink = getAffiliateLink("coverageOptions", "results-recommendations");

    const next = [];
    if (analysis.total_patient_responsibility > 500) {
      next.push({
        title: "Compare Your Health Plan Options",
        description: "High out-of-pocket costs may mean your current plan is not ideal.",
        cta: plansLink.isAffiliate ? "Compare Plans (Partner)" : "Compare Plans on HealthCare.gov",
        onClick: () => handleAffiliateClick("PlanOptions", plansLink.url),
        icon: "📊",
      });
    }

    if ((analysis.claims || []).some((claim) => isClaimOutOfNetwork(claim))) {
      next.push({
        title: "Learn Surprise Billing Protections",
        description: "The No Surprises Act may protect you from certain out-of-network charges.",
        cta: rightsLink.isAffiliate ? "See Protection Options (Partner)" : "Read Your Rights (CMS.gov)",
        onClick: () => handleAffiliateClick("BillingRights", rightsLink.url),
        icon: "🏥",
      });
    }

    if ((analysis.appeal_recommendations || []).length > 0) {
      next.push({
        title: "File a Formal Appeal",
        description: "CMS guidance can help you submit a stronger denied-claim appeal.",
        cta: appealsGuideLink.isAffiliate ? "Appeal Support Guide (Partner)" : "Appeal Guide (CMS.gov)",
        onClick: () => handleAffiliateClick("AppealsGuide", appealsGuideLink.url),
        icon: "🤝",
      });
    }

    next.push({
      title: "Explore All Coverage Options",
      description: "Browse ACA marketplace, Medicaid, and Medicare options.",
      cta: coverageLink.isAffiliate ? "Browse Coverage (Partner)" : "Browse Options (HealthCare.gov)",
      onClick: () => handleAffiliateClick("CoverageOptions", coverageLink.url),
      icon: "🏛️",
    });

    return next;
  }, [analysis, handleAffiliateClick]);

  const opportunities = analysis?.savings_opportunities || [];
  const appeals = analysis?.appeal_recommendations || [];
  const claims = analysis?.claims || [];
  const parserSource = analysis?.key_metrics?.parser_source || "unknown";
  const parserWarning = analysis?.key_metrics?.parser_warning || "";
  const analysisMode = analysis?.key_metrics?.analysis_mode || "live";
  const isPaid = paymentStatus === "paid" || hasDownloadedPackage;
  const claimsById = new Map((claims || []).map((claim) => [claim.claim_id, claim]));
  const hasLowConfidenceOpportunities = opportunities.some((opportunity) => getConfidenceLevel(opportunity) === "low");
  const hasUnknownNetworkClaims = claims.some((claim) => claim?.network_status === "unknown" || claim?.in_network === null);
  const shouldUseCautiousSavingsLabel = hasLowConfidenceOpportunities || hasUnknownNetworkClaims || Boolean(parserWarning);
  const actionAppealsGuideLink = getAffiliateLink("appealsGuide", "results-actions");

  if (loading) {
    return (
      <main className="content-page">
        <section className="content-card results-loading-card">
          <div className="spinner" />
          <p>Analyzing your EOB...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="content-page">
        <section className="content-card analyzer-alert analyzer-alert-error">
          <h1>Unable to load results</h1>
          <p>{error}</p>
          <p>
            <Link href="/analyzer" className="btn-primary">
              Try another upload
            </Link>
          </p>
        </section>
      </main>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <main className="content-page results-page-next">
      <section className="content-card results-shell-next">
      <section className="results-header-next">
        <h1>
          Your EOB Analysis Results <span className={`results-access-chip-next ${isPaid ? "results-access-chip-paid" : "results-access-chip-unpaid"}`}>{isPaid ? "Paid" : "Locked"}</span>
        </h1>
        <p>File: {analysis.file_name}</p>
      </section>

      <p className={`unlock-banner-next ${isPaid ? "unlock-banner-next-paid" : "unlock-banner-next-unpaid"}`}>
        {isPaid ? "Unlock confirmed: your appeal templates are ready below." : "Templates are locked until checkout is completed."}
      </p>

      <section className="summary-cards-next">
        <article className="summary-card-next summary-card-next-highlight">
          <p className="summary-card-next-value">{formatMoney(analysis.total_potential_savings)}</p>
          <p className="summary-card-next-label">{shouldUseCautiousSavingsLabel ? "Potential Review Value" : "Estimated Savings"}</p>
        </article>
        <article className="summary-card-next">
          <p className="summary-card-next-value">{formatMoney(analysis.total_billed)}</p>
          <p className="summary-card-next-label">Total Billed</p>
        </article>
        <article className="summary-card-next">
          <p className="summary-card-next-value">{formatMoney(analysis.total_paid_by_insurance)}</p>
          <p className="summary-card-next-label">Insurance Paid</p>
        </article>
        <article className="summary-card-next">
          <p className="summary-card-next-value">{formatMoney(analysis.total_patient_responsibility)}</p>
          <p className="summary-card-next-label">Your Responsibility</p>
        </article>
      </section>

      {SHOW_PARSER_DEBUG ? (
        <details className="parser-debug-panel-next" open>
          <summary>Parser Debug (Owner View)</summary>
          <div className="parser-debug-grid-next">
            <p>Parser Source: <strong>{parserSource}</strong></p>
            <p>Analysis Mode: <strong>{analysisMode}</strong></p>
            <p>Claims Parsed: <strong>{claims.length}</strong></p>
            <p>Opportunities: <strong>{opportunities.length}</strong></p>
          </div>
          {parserWarning ? <p className="parser-debug-warning-next">{parserWarning}</p> : null}
        </details>
      ) : null}

      {!hasDownloadedPackage ? (
        <>
          {!emailCaptureSubmitted ? (
            <section className="email-capture-card-next">
              <p>Not ready to pay yet? Get a reminder before your savings window expires.</p>
              <form onSubmit={handleEmailCapture} className="email-capture-form-next">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailCaptureValue}
                  onChange={(event) => setEmailCaptureValue(event.target.value)}
                  disabled={emailCaptureLoading}
                  required
                />
                <button type="submit" disabled={emailCaptureLoading || !emailCaptureValue.trim()}>
                  {emailCaptureLoading ? "Saving..." : "Remind me"}
                </button>
              </form>
            </section>
          ) : (
            <section className="email-capture-card-next email-capture-card-next-success">
              <p>Got it. We will send a reminder so this does not slip.</p>
            </section>
          )}

          <PaymentButton analysisId={analysisId} pricing={pricing} disabled={isCheckingPayment} />
          {paymentMessage ? <p className="payment-message-next">{paymentMessage}</p> : null}
        </>
      ) : null}

      <section className="results-tabs-next" aria-label="Results tabs">
        <button
          className={`results-tab-next ${activeTab === "opportunities" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("opportunities")}
          type="button"
        >
          Savings Opportunities ({opportunities.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "appeals" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("appeals")}
          type="button"
        >
          Appeal Recommendations ({appeals.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "claims" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("claims")}
          type="button"
        >
          All Claims ({claims.length})
        </button>
      </section>

      {activeTab === "opportunities" ? (
        <section className="results-list-next">
          {opportunities.length === 0 ? (
            <p className="empty-state-next">No savings opportunities detected for this upload.</p>
          ) : (
            opportunities.map((opportunity) => (
              <article className={`result-card-next${getConfidenceLevel(opportunity) === "low" ? " result-card-next-caution" : ""}`} key={opportunity.opportunity_id}>
                <div className="result-card-next-top">
                  <p className={`result-pill-next${
                    opportunity.type === 'out_of_network' && (claimsById.get(opportunity.claim_id)?.network_status === "out_of_network" || claimsById.get(opportunity.claim_id)?.in_network === false) ? ' result-pill-danger-next' :
                    opportunity.type.includes('saving') || opportunity.type.includes('overcharge') || opportunity.type.includes('duplicate') ? ' result-pill-savings-next' : ''
                  }`}>{opportunity.type.replaceAll("_", " ")}</p>
                  <div className="result-money-wrap-next">
                    <p className="result-money-next">{formatMoney(opportunity.estimated_savings)}</p>
                    <p className={`result-confidence-badge-next result-confidence-badge-next-${getConfidenceLevel(opportunity)}`}>
                      Confidence: {getConfidenceLevel(opportunity)}
                    </p>
                  </div>
                </div>
                <h3>{opportunity.description}</h3>
                <p>{opportunity.recommended_action}</p>
                {opportunity.type === "out_of_network" && claimsById.get(opportunity.claim_id)?.network_status === "unknown" ? (
                  <p className="result-verify-banner-next">Needs verification: network status is unknown for this claim.</p>
                ) : null}
                <button
                  type="button"
                  className="result-expand-btn-next"
                  onClick={() => setExpandedOpportunity(expandedOpportunity === opportunity.opportunity_id ? null : opportunity.opportunity_id)}
                >
                  {expandedOpportunity === opportunity.opportunity_id ? "Hide details" : "Show details"}
                </button>
                {expandedOpportunity === opportunity.opportunity_id ? (
                  <div className="result-details-next">
                    <p>Severity: {opportunity.severity}</p>
                    <p>Difficulty: {opportunity.difficulty_level}</p>
                    <p>Time estimate: {opportunity.time_estimate_days} day(s)</p>
                    <p>Confidence: {Math.round((opportunity.confidence_score || 0) * 100)}%</p>
                    {opportunity.flag_reason ? <p>Why flagged: {opportunity.flag_reason}</p> : null}
                    {(opportunity.verification_steps || []).length > 0 ? (
                      <div className="result-details-list-next">
                        <p>Verify before acting:</p>
                        <ul>
                          {opportunity.verification_steps.map((step, idx) => (
                            <li key={`${opportunity.opportunity_id}-verify-${idx}`}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {(opportunity.could_be_correct_if || []).length > 0 ? (
                      <div className="result-details-list-next">
                        <p>This may be correct if:</p>
                        <ul>
                          {opportunity.could_be_correct_if.map((item, idx) => (
                            <li key={`${opportunity.opportunity_id}-correct-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {(opportunity.missing_data_points || []).length > 0 ? (
                      <div className="result-details-list-next">
                        <p>Missing data points:</p>
                        <ul>
                          {opportunity.missing_data_points.map((item, idx) => (
                            <li key={`${opportunity.opportunity_id}-missing-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))
          )}
        </section>
      ) : null}

      {activeTab === "appeals" ? (
        <section className="results-list-next">
          {appeals.length === 0 ? (
            <p className="empty-state-next">No appeal recommendations for this upload.</p>
          ) : (
            appeals.map((appeal, index) => (
              <article className="result-card-next" key={`${appeal.claim_id}-${index}`}>
                <h3>{appeal.reason}</h3>
                <p>Success probability: {Math.round((appeal.success_probability || 0) * 100)}%</p>
                <ul>
                  {(appeal.steps || []).map((step, stepIndex) => (
                    <li key={`${appeal.claim_id}-${stepIndex}`}>{step}</li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </section>
      ) : null}

      {activeTab === "claims" ? (
        <section className="results-list-next">
          {claims.length === 0 ? (
            <p className="empty-state-next">No claims were parsed from this file.</p>
          ) : (
            claims.map((claim) => (
              <article className="result-card-next" key={claim.claim_id}>
                <h3>{claim.provider_name}</h3>
                <p>Claim ID: {claim.claim_id}</p>
                <p>Total billed: {formatMoney(claim.total_billed)}</p>
                <p>Patient responsibility: {formatMoney(claim.total_patient_responsibility)}</p>
                <p>Network: {formatNetworkStatus(claim)}</p>
              </article>
            ))
          )}
        </section>
      ) : null}

      {hasDownloadedPackage && templates?.templates ? (
        <section className="templates-section-next">
          <h3>Your Appeal Templates and Scripts</h3>
          <p>Use these templates as your preparation starting point, then verify plan-specific facts before submitting.</p>
          <button className="btn-primary" type="button" onClick={handleDownloadPdf}>
            Download Appeal Package (PDF)
          </button>

          <div className="results-list-next" style={{ marginTop: 12 }}>
            {Object.entries(templates.templates).map(([key, content]) => (
              <article className="result-card-next" key={key}>
                <div className="result-card-next-top">
                  <h4>{key.replaceAll("_", " ")}</h4>
                  <button
                    type="button"
                    className="result-expand-btn-next"
                    onClick={() => setExpandedTemplate(expandedTemplate === key ? null : key)}
                  >
                    {expandedTemplate === key ? "Hide" : "Open"}
                  </button>
                </div>
                {expandedTemplate === key ? (
                  <>
                    <pre className="template-content-next">{content}</pre>
                    <button
                      type="button"
                      className="result-expand-btn-next"
                      onClick={() => {
                        navigator.clipboard.writeText(content);
                        alert("Copied to clipboard");
                      }}
                    >
                      Copy to Clipboard
                    </button>
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="action-section-next">
        <h3>Next Steps</h3>
        <p className="safety-disclaimer-next">
          Guidance shown here is educational and may be incomplete. Confirm coverage rules, coding, and deadlines with your insurer.
        </p>
        <div className="recommendations-grid-next">
          <button className="action-button-next" onClick={handleDownloadPdf} type="button" disabled={!hasDownloadedPackage}>
            {hasDownloadedPackage ? "Download PDF" : "Get Package First"}
          </button>
          <button className="action-button-next" onClick={() => window.open(actionAppealsGuideLink.url, "_blank")} type="button">
            {actionAppealsGuideLink.isAffiliate ? "Appeal Support" : "Appeal Guide"}
          </button>
          <button className="action-button-next" onClick={() => router.push(`/appeal-tracker/${analysisId}`)} type="button">
            Open Tracker
          </button>
          <button className="action-button-next" onClick={() => router.push("/analyzer")} type="button">
            Analyze Another
          </button>
        </div>
      </section>

      <section className="contextual-recommendations-next">
        <h3>You Might Also Need</h3>
        <div className="recommendations-grid-next">
          {recommendations.map((recommendation, idx) => (
            <article className="result-card-next" key={`${recommendation.title}-${idx}`}>
              <p className="rec-icon-next">{recommendation.icon}</p>
              <h4>{recommendation.title}</h4>
              <p>{recommendation.description}</p>
              <button className="result-expand-btn-next" onClick={recommendation.onClick} type="button">
                {recommendation.cta}
              </button>
            </article>
          ))}
        </div>
      </section>
      </section>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsContent />
    </Suspense>
  );
}
