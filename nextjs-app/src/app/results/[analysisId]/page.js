"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const getDeadlineUrgency = (note) => {
  if (!note) return null;
  const n = note.toUpperCase();
  if (n.startsWith("URGENT")) return "urgent";
  if (n.startsWith("ACT SOON")) return "soon";
  if (n.includes("CLOSED")) return "closed";
  return "standard";
};

const getTypePillClass = (type, claim) => {
  if (type === "coordination_of_benefits") return " result-pill-danger-next";
  if (type === "out_of_network" && (claim?.network_status === "out_of_network" || claim?.in_network === false)) return " result-pill-danger-next";
  if (type === "billing_error" || type === "balance_billing" || type.includes("duplicate") || type.includes("overcharge") || type.includes("saving")) return " result-pill-savings-next";
  return "";
};

const formatOpportunityType = (type) => {
  if (type === "coordination_of_benefits") return "Coordination of Benefits";
  if (type === "billing_error") return "Billing Error";
  if (type === "balance_billing") return "Balance Billing";
  if (type === "out_of_network") return "Out of Network";
  return type.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const extractReasonCode = (opportunity) => {
  const flagMatch = (opportunity?.flag_reason || "").match(/Reason code ([A-Z]{2}-\d+)/i);
  if (flagMatch) return flagMatch[1].toUpperCase();
  const descMatch = (opportunity?.description || "").match(/Denial code ([A-Z]{2}-\d+)/i);
  return descMatch ? descMatch[1].toUpperCase() : null;
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
  const [carcCache, setCarcCache] = useState({});
  const [carcExpanded, setCarcExpanded] = useState(new Set());
  const [outcomeMap, setOutcomeMap] = useState({}); // opportunity_id -> outcome string
  const [outcomeSaving, setOutcomeSaving] = useState({}); // opportunity_id -> bool
  const toolkitUnlockTrackedRef = useRef(false);

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

      // If no session_id in URL, try to restore one saved from a previous paid visit
      const storageKey = `lmmb_session_${analysisId}`;
      const effectiveSessionId = sessionId || (typeof localStorage !== "undefined" ? localStorage.getItem(storageKey) : null);

      // Persist session_id to localStorage so future page loads can recover paid status
      if (sessionId && typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, sessionId);
      }

      for (let attempt = 0; attempt < attempts; attempt += 1) {
        try {
          const query = effectiveSessionId ? `?session_id=${encodeURIComponent(effectiveSessionId)}` : "";
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
          if (response.status === 404) {
            // Analysis no longer exists (server restart wiped it). Remove from recent history.
            try {
              const existing = JSON.parse(localStorage.getItem("lmmb_recent_analyses") || "[]");
              localStorage.setItem(
                "lmmb_recent_analyses",
                JSON.stringify(existing.filter((e) => e.analysisId !== analysisId))
              );
            } catch { /* ignore */ }
            throw new Error("__expired__");
          }
          throw new Error("Failed to load analysis results. Please try again.");
        }
        const payload = await response.json();
        if (!mounted) {
          return;
        }
        setAnalysis(payload);

        // Load any previously recorded outcomes for this analysis
        try {
          const outcomesRes = await fetch(`${API_BASE}/api/eob/outcomes/${analysisId}`);
          if (outcomesRes.ok && mounted) {
            const outcomesPayload = await outcomesRes.json();
            const map = {};
            for (const o of outcomesPayload.outcomes || []) {
              map[o.opportunity_id] = o.outcome;
            }
            setOutcomeMap(map);
          }
        } catch {
          // Outcomes are non-critical; ignore fetch errors.
        }

        await trackEvent("results_page_viewed", {
          analysisId,
          price_variant: pricing.variant,
          price_amount_cents: pricing.amountCents,
          totalSavings: payload.total_potential_savings,
          opportunitiesFound: (payload.savings_opportunities || []).length,
        });

        await trackEvent("results_viewed", {
          analysisId,
          price_variant: pricing.variant,
          price_amount_cents: pricing.amountCents,
          total_savings: payload.total_potential_savings,
          opportunities_found: (payload.savings_opportunities || []).length,
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

  const handleToggleCarcLookup = async (opportunityId, code) => {
    setCarcExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(opportunityId)) {
        next.delete(opportunityId);
      } else {
        next.add(opportunityId);
      }
      return next;
    });
    if (!(code in carcCache)) {
      try {
        const response = await fetch(`${API_BASE}/api/eob/carc-lookup/${encodeURIComponent(code)}`);
        const data = response.ok ? await response.json() : null;
        setCarcCache((prev) => ({ ...prev, [code]: data }));
      } catch {
        setCarcCache((prev) => ({ ...prev, [code]: null }));
      }
    }
  };

  const handleRecordOutcome = async (opportunityId, outcome) => {
    // Toggle off if clicking the same outcome again
    if (outcomeMap[opportunityId] === outcome) {
      setOutcomeMap((prev) => ({ ...prev, [opportunityId]: undefined }));
      return;
    }
    setOutcomeSaving((prev) => ({ ...prev, [opportunityId]: true }));
    try {
      const response = await fetch(`${API_BASE}/api/eob/outcomes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_id: analysisId, opportunity_id: opportunityId, outcome }),
      });
      if (response.ok) {
        setOutcomeMap((prev) => ({ ...prev, [opportunityId]: outcome }));
      }
    } catch {
      // Non-critical; outcome state stays unchanged on error.
    } finally {
      setOutcomeSaving((prev) => ({ ...prev, [opportunityId]: false }));
    }
  };

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

  const handleToggleOpportunity = (opportunity) => {
    const isCurrentlyOpen = expandedOpportunity === opportunity.opportunity_id;
    setExpandedOpportunity(isCurrentlyOpen ? null : opportunity.opportunity_id);

    if (!isCurrentlyOpen) {
      trackEvent("verification_details_viewed", {
        analysisId,
        opportunity_id: opportunity.opportunity_id,
        opportunity_type: opportunity.type,
        confidence_level: getConfidenceLevel(opportunity),
      });
    }
  };

  useEffect(() => {
    if (isPaid && !toolkitUnlockTrackedRef.current) {
      toolkitUnlockTrackedRef.current = true;
      trackEvent("toolkit_unlocked", {
        analysisId,
        payment_status: paymentStatus,
        price_variant: pricing.variant,
        amount_cents: pricing.amountCents,
      });
    }
  }, [analysisId, isPaid, paymentStatus, pricing.amountCents, pricing.variant]);

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
    const isExpired = error === "__expired__";
    return (
      <main className="content-page">
        <section className="results-error-card">
          {isExpired ? (
            <>
              <h1>Results no longer available</h1>
              <p>
                Your previous analysis has expired — our server clears stored results periodically.
                Re-upload your EOB to run a fresh analysis. <strong>You will not be charged again</strong> for a file you have already paid for.
              </p>
            </>
          ) : (
            <>
              <h1>Unable to load results</h1>
              <p>{error}</p>
            </>
          )}
          <p>
            <Link href="/analyzer" className="btn-primary">
              {isExpired ? "Re-upload my EOB" : "Try another upload"}
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

      <div className={`unlock-banner-next ${isPaid ? "unlock-banner-next-paid" : "unlock-banner-next-unpaid"}`}>
        <span>{isPaid ? "Unlock confirmed: your appeal templates are ready below." : "Templates are locked until checkout is completed."}</span>
        {isPaid && hasDownloadedPackage && (
          <button className="btn-primary unlock-banner-download-btn" type="button" onClick={handleDownloadPdf}>
            ↓ Download Appeal Package (PDF)
          </button>
        )}
      </div>

      <section className="value-breakdown-next">
        <article className="value-tier-next value-tier-next-free">
          <h3>Included Free</h3>
          <ul>
            <li>Claim summary and totals</li>
            <li>Confidence-rated opportunities</li>
            <li>Verification checklist before action</li>
          </ul>
        </article>
        <article className={`value-tier-next value-tier-next-toolkit ${isPaid ? "value-tier-next-active" : ""}`}>
          <h3>{isPaid ? "Toolkit Unlocked" : `Appeal Prep Toolkit (${formatUsdFromCents(pricing.amountCents)})`}</h3>
          <ul>
            <li>Downloadable appeal package PDF</li>
            <li>Insurer and provider phone scripts</li>
            <li>Step-by-step appeal workflow documents</li>
          </ul>
        </article>
      </section>

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
          Claim Signal Queue ({opportunities.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "appeals" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("appeals")}
          type="button"
        >
          Appeal Playbook ({appeals.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "claims" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("claims")}
          type="button"
        >
          Claim Ledger ({claims.length})
        </button>
      </section>

      {activeTab === "opportunities" ? (
        <section className="results-list-next">
          {opportunities.length === 0 ? (
            <p className="empty-state-next">No high-priority claim signals were detected for this upload.</p>
          ) : (
            <>
              {opportunities.some((o) => o.type === "coordination_of_benefits") ? (
                <div className="cob-callout-next" role="alert">
                  <strong>Coordination of Benefits Pattern Detected</strong>
                  <p>
                    Multiple claims were denied with reason code CO-22. This is usually a systemic
                    payer-order issue — resolving it once with your insurer typically fixes all affected claims.
                    See the flagged opportunity below for next steps.
                  </p>
                </div>
              ) : null}
              {opportunities.map((opportunity) => {
                const relatedClaim = claimsById.get(opportunity.claim_id);
                const deadlineUrgency = getDeadlineUrgency(opportunity.appeal_deadline_note);
                return (
                  <article className={`result-card-next${getConfidenceLevel(opportunity) === "low" ? " result-card-next-caution" : ""}`} key={opportunity.opportunity_id}>
                    <div className="result-card-next-top">
                      <p className={`result-pill-next${getTypePillClass(opportunity.type, relatedClaim)}`}>
                        {formatOpportunityType(opportunity.type)}
                      </p>
                      <div className="result-money-wrap-next">
                        <p className="result-money-next">{formatMoney(opportunity.estimated_savings)}</p>
                        <div className="result-badge-row-next">
                          <p className={`result-confidence-badge-next result-confidence-badge-next-${getConfidenceLevel(opportunity)}`}>
                            Confidence: {getConfidenceLevel(opportunity)}
                          </p>
                          {opportunity.appeal_deadline_note ? (
                            <p className={`deadline-note-next deadline-note-next-${deadlineUrgency}`}>
                              {deadlineUrgency === "urgent" ? "⚠️" : deadlineUrgency === "soon" ? "⏰" : "🗓️"}{" "}
                              {opportunity.appeal_deadline_note}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <h3>{opportunity.description}</h3>
                    <p>{opportunity.recommended_action}</p>
                    {opportunity.type === "out_of_network" && relatedClaim?.network_status === "unknown" ? (
                      <p className="result-verify-banner-next">Needs verification: network status is unknown for this claim.</p>
                    ) : null}
                    <button
                      type="button"
                      className="result-expand-btn-next"
                      onClick={() => handleToggleOpportunity(opportunity)}
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
                        {(() => {
                          const code = extractReasonCode(opportunity);
                          if (!code) return null;
                          const isOpen = carcExpanded.has(opportunity.opportunity_id);
                          const entry = carcCache[code];
                          return (
                            <div className="carc-lookup-section-next">
                              <button
                                type="button"
                                className="carc-lookup-btn-next"
                                onClick={() => handleToggleCarcLookup(opportunity.opportunity_id, code)}
                              >
                                {isOpen ? `▲ Hide code ${code} details` : `▼ What does code ${code} mean?`}
                              </button>
                              {isOpen ? (
                                entry === undefined ? (
                                  <p className="carc-lookup-status-next">Loading&hellip;</p>
                                ) : entry === null ? (
                                  <p className="carc-lookup-status-next">Code details unavailable.</p>
                                ) : (
                                  <div className="carc-lookup-panel-next">
                                    <p className="carc-lookup-explanation-next">{entry.explanation}</p>
                                    <p className="carc-lookup-meta-next">
                                      Success probability: {Math.round((entry.success_probability || 0) * 100)}% &middot; Estimated resolution: {entry.time_estimate_days} days &middot; Difficulty: {entry.difficulty_level}
                                    </p>
                                  </div>
                                )
                              ) : null}
                            </div>
                          );
                        })()}
                      </div>
                    ) : null}
                    <div className="outcome-row-next">
                      <p className="outcome-label-next">Did you try this?</p>
                      {[
                        { value: "won", label: "Won" },
                        { value: "in_progress", label: "In Progress" },
                        { value: "lost", label: "Lost" },
                        { value: "not_tried", label: "Not Tried" },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          disabled={outcomeSaving[opportunity.opportunity_id]}
                          className={`outcome-btn-next outcome-btn-next-${value}${outcomeMap[opportunity.opportunity_id] === value ? " outcome-btn-next-active" : ""}`}
                          onClick={() => handleRecordOutcome(opportunity.opportunity_id, value)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
              </article>
            )})}
          </>
          )}
        </section>
      ) : null}

      {activeTab === "appeals" ? (
        <section className="results-list-next">
          {appeals.length === 0 ? (
            <p className="empty-state-next">No appeal playbook steps were generated for this upload.</p>
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
            <p className="empty-state-next">No claim ledger entries were parsed from this file.</p>
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

      {!hasDownloadedPackage ? (
        !emailCaptureSubmitted ? (
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
        )
      ) : null}

      {hasDownloadedPackage && templates?.templates ? (
        <section className="templates-section-next">
          <div className="templates-header-next">
            <div>
              <h3>Your Appeal Templates and Scripts</h3>
              <p>Use these as your starting point. Verify plan-specific facts before submitting.</p>
            </div>
            <button className="btn-primary templates-pdf-btn-next" type="button" onClick={handleDownloadPdf}>
              ↓ Download PDF
            </button>
          </div>
          <div className="toolkit-grid-next">
            {Object.entries(templates.templates).map(([key, content]) => {
              const iconMap = {
                appeal_letter: "📄",
                phone_script_insurer: "📞",
                phone_script_provider: "📞",
                appeal_checklist: "✅",
                negotiation_talking_points: "💬",
              };
              const icon = iconMap[key] || "📋";
              const label = key.replaceAll("_", " ");
              const isOpen = expandedTemplate === key;
              return (
                <div key={key} className={`toolkit-chip-next ${isOpen ? "toolkit-chip-next-open" : ""}`}>
                  <button
                    type="button"
                    className="toolkit-chip-btn-next"
                    onClick={() => setExpandedTemplate(isOpen ? null : key)}
                  >
                    <span className="toolkit-chip-icon">{icon}</span>
                    <span className="toolkit-chip-label">{label}</span>
                    <span className="toolkit-chip-arrow">{isOpen ? "▲" : "▼"}</span>
                  </button>
                  {isOpen && (
                    <div className="toolkit-chip-content">
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
                    </div>
                  )}
                </div>
              );
            })}
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
