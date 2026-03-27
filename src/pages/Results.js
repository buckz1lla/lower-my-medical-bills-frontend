import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { getAffiliateLink } from '../utils/affiliateLinks';
import './Results.css';

const PRICE_EXPERIMENT_ENABLED = process.env.REACT_APP_ENABLE_PRICE_EXPERIMENT === 'true';
const PRICE_CONTROL_CENTS = Number(process.env.REACT_APP_PRICE_CONTROL_CENTS || 299);
const PRICE_TEST_CENTS = Number(process.env.REACT_APP_PRICE_TEST_CENTS || 499);

const formatUsd = (cents) => `$${(cents / 100).toFixed(2)}`;

const pickPriceVariant = (analysisId) => {
  if (!PRICE_EXPERIMENT_ENABLED || !analysisId) {
    return { variant: 'control', amountCents: PRICE_CONTROL_CENTS };
  }

  let hash = 0;
  for (let i = 0; i < analysisId.length; i += 1) {
    hash = (hash << 5) - hash + analysisId.charCodeAt(i);
    hash |= 0;
  }

  const variant = Math.abs(hash) % 2 === 0 ? 'control' : 'test';
  return {
    variant,
    amountCents: variant === 'test' ? PRICE_TEST_CENTS : PRICE_CONTROL_CENTS,
  };
};

const PaymentButton = ({ analysisId, disabled = false, pricing }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const safePricing = pricing || { variant: 'control', amountCents: PRICE_CONTROL_CENTS };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      trackEvent('checkout_started', {
        analysisId,
        price_variant: safePricing.variant,
        amount_cents: safePricing.amountCents,
      });

      const response = await axios.post('/api/payments/create-checkout-session', {
        analysis_id: analysisId,
        origin: window.location.origin,
        price_variant: safePricing.variant,
      });

      const checkoutUrl = response.data?.checkout_url;
      if (!checkoutUrl) {
        throw new Error('Stripe checkout URL was not returned.');
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      const detail = error.response?.data?.detail || 'Unable to start Stripe checkout. Please try again.';
      alert(detail);
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-gate">
      <div className="payment-content">
        <h3>🎁 Get Your Personalized Appeal Package</h3>
        <p>Get ready-to-use templates and scripts based on your specific issues:</p>
        <ul className="package-includes">
          <li>✓ Customized appeal letter template</li>
          <li>✓ Phone scripts for insurers & providers</li>
          <li>✓ Step-by-step appeal checklist</li>
          <li>✓ Negotiation talking points</li>
        </ul>
        <button 
          className="payment-button" 
          onClick={handlePayment}
          disabled={isLoading || disabled}
        >
          {isLoading ? 'Redirecting to secure checkout...' : `Unlock Templates - ${formatUsd(safePricing.amountCents)}`}
        </button>
        <p className="payment-note">Secure Stripe checkout. One-time payment. No subscription.</p>
      </div>
    </div>
  );
};

// Analytics tracking function
const trackEvent = async (eventName, eventData = {}) => {
  try {
    await axios.post('/api/analytics/track', {
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  } catch (error) {
    // Silent fail - don't interrupt user experience
    console.log('Analytics tracking note:', error.message);
  }
};

// PDF generation function
const generatePDF = (analysis, templates) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  
  // Helper function to add multi-line text (clean rendering)
  const addMultilineText = (text, maxWidth = contentWidth) => {
    if (!text) return;
    // Use jsPDF's splitTextToSize for proper wrapping
    const lines = pdf.splitTextToSize(text, maxWidth);
    lines.forEach(line => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });
  };

  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(0, 102, 204); // Medical blue
  pdf.text('Personalized EOB Appeal Package', margin, yPosition);
  yPosition += 15;

  // Summary Card
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`File: ${analysis.file_name}`, margin, yPosition);
  yPosition += 8;
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
  yPosition += 12;

  // Key Numbers
  pdf.setFontSize(14);
  pdf.setTextColor(0, 102, 204);
  pdf.text('Analysis Summary', margin, yPosition);
  yPosition += 10;
  
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  const summaryLines = [
    `Potential Savings: $${analysis.total_potential_savings.toFixed(2)}`,
    `Total Billed: $${analysis.total_billed.toFixed(2)}`,
    `Insurance Paid: $${analysis.total_paid_by_insurance.toFixed(2)}`,
    `Your Responsibility: $${analysis.total_patient_responsibility.toFixed(2)}`
  ];
  summaryLines.forEach(line => {
    pdf.text(line, margin, yPosition);
    yPosition += 7;
  });
  yPosition += 5;

  // Opportunities
  if (analysis.savings_opportunities && analysis.savings_opportunities.length > 0) {
    pdf.setFontSize(14);
    pdf.setTextColor(0, 102, 204);
    pdf.text('Savings Opportunities', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    analysis.savings_opportunities.forEach((opp, idx) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`${idx + 1}. ${opp.description} ($${opp.estimated_savings.toFixed(2)})`, margin, yPosition);
      yPosition += 6;
      addMultilineText(`Action: ${opp.recommended_action}`, contentWidth - 10);
      yPosition += 5;
    });
  }

  // Appeals
  if (analysis.appeal_recommendations && analysis.appeal_recommendations.length > 0) {
    yPosition += 5;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 102, 204);
    pdf.text('Appeal Recommendations', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    analysis.appeal_recommendations.forEach((rec, idx) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`${idx + 1}. ${rec.reason} (Success: ${(rec.success_probability * 100).toFixed(0)}%)`, margin, yPosition);
      yPosition += 7;
      rec.steps.forEach((step, stepIdx) => {
        addMultilineText(`  Step ${stepIdx + 1}: ${step}`, contentWidth - 20);
      });
      yPosition += 3;
    });
  }

  // Templates
  if (templates && templates.templates) {
    yPosition += 5;
    pdf.setFontSize(14);
    pdf.setTextColor(0, 102, 204);
    pdf.text('Your Appeal Templates', margin, yPosition);
    yPosition += 10;

    Object.entries(templates.templates).forEach(([key, content]) => {
      if (yPosition > pageHeight - 30) {
        pdf.addPage();
        yPosition = margin;
      }
      const title = key === 'appeal_letter' ? 'Appeal Letter' :
                   key === 'phone_script_insurer' ? 'Phone Script - Insurance Co.' :
                   key === 'phone_script_provider' ? 'Phone Script - Provider' :
                   key === 'appeal_checklist' ? 'Appeal Checklist' : 'Talking Points';
      
      pdf.setFontSize(11);
      pdf.setTextColor(0, 102, 204);
      pdf.text(title, margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      addMultilineText(content, contentWidth);
      yPosition += 3;
    });
  }

  // Footer
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.text('This guide is for educational purposes only. Confirm all details with your insurer before taking action.', margin, pageHeight - 10);

  return pdf;
};


function Results() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOpportunity, setExpandedOpportunity] = useState(null);
  const [activeTab, setActiveTab] = useState('opportunities');
  const [hasDownloadedPackage, setHasDownloadedPackage] = useState(false);
  const [templates, setTemplates] = useState(null);
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [emailCaptureValue, setEmailCaptureValue] = useState('');
  const [emailCaptureSubmitted, setEmailCaptureSubmitted] = useState(false);
  const [emailCaptureLoading, setEmailCaptureLoading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const paymentParam = searchParams.get('payment');
  const sessionIdParam = searchParams.get('session_id');
  const pricing = pickPriceVariant(analysisId);

  const loadTemplates = useCallback(async () => {
    const response = await axios.get(`/api/eob/templates/${analysisId}`);
    setTemplates(response.data);
    setHasDownloadedPackage(true);
    return response.data;
  }, [analysisId]);

  const refreshPaymentStatus = useCallback(async ({ sessionId = null, poll = false } = {}) => {
    setIsCheckingPayment(true);
    const attempts = poll ? 5 : 1;
    let paid = false;
    let latestStatus = 'unpaid';

    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        const response = await axios.get(`/api/payments/status/${analysisId}`, {
          params: sessionId ? { session_id: sessionId } : {},
        });

        latestStatus = response.data.status;
        setPaymentStatus(latestStatus);

        if (response.data.paid) {
          paid = true;
          break;
        }
      } catch (statusError) {
        console.log('Payment status note:', statusError.message);
      }

      if (attempt < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    if (paid) {
      try {
        await loadTemplates();
        setPaymentMessage('Payment confirmed. Your appeal package is unlocked.');
      } catch (templateError) {
        setPaymentMessage('Payment confirmed, but templates are not available yet. Try refreshing once.');
      }
    } else {
      setHasDownloadedPackage(false);
      if (paymentParam === 'cancelled') {
        setPaymentMessage('Checkout cancelled. You can return to payment whenever you are ready.');
      } else if (paymentParam === 'success') {
        setPaymentMessage('Payment was received. Waiting for Stripe confirmation. Refresh in a few seconds if it does not unlock.');
      }
    }

    setIsCheckingPayment(false);
    return latestStatus;
  }, [analysisId, loadTemplates, paymentParam]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`/api/eob/analysis/${analysisId}`);
        setAnalysis(response.data);
        
        // Track page view
        trackEvent('results_page_viewed', { 
          analysisId,
          price_variant: pricing.variant,
          price_amount_cents: pricing.amountCents,
          totalSavings: response.data.total_potential_savings,
          opportunitiesFound: response.data.savings_opportunities.length
        });
      } catch (err) {
        setError('Failed to load analysis results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
    refreshPaymentStatus({
      sessionId: sessionIdParam,
      poll: paymentParam === 'success',
    });
  }, [analysisId, paymentParam, pricing.amountCents, pricing.variant, refreshPaymentStatus, sessionIdParam]);

  useEffect(() => {
    if (paymentParam === 'cancelled') {
      setPaymentMessage('Checkout cancelled. You can return to payment whenever you are ready.');
    }
  }, [paymentParam]);

  if (error) {
    return (
      <div className="results-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/analyzer')}>Try Again</button>
      </div>
    );
  }

  if (!analysis && loading) {
    return (
      <div className="results-loading">
        <div className="spinner"></div>
        <p>Analyzing your EOB...</p>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const isPaid = paymentStatus === 'paid' || hasDownloadedPackage;

  const getSeverityBadge = (severity) => {
    const badgeClass = `severity-${severity}`;
    return <span className={`severity-badge ${badgeClass}`}>{severity.toUpperCase()}</span>;
  };

  const getConfidenceBadge = (opportunity) => {
    const level = (opportunity?.confidence_level || 'low').toLowerCase();
    const score = Number(opportunity?.confidence_score || 0);
    return (
      <span className={`confidence-badge confidence-${level}`}>
        {`Confidence ${level.toUpperCase()} (${Math.round(score * 100)}%)`}
      </span>
    );
  };

  const handleDownloadPDF = async () => {
    if (!analysis) return;

    let latestTemplates = templates;
    if (hasDownloadedPackage) {
      try {
        const response = await axios.get(`/api/eob/templates/${analysisId}`);
        latestTemplates = response.data;
        setTemplates(response.data);
      } catch (err) {
        console.log('Template refresh note:', err.message);
      }
    }

    const pdf = generatePDF(analysis, latestTemplates);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `appeal-package-${analysisId.substring(0, 8)}-${timestamp}.pdf`;
    pdf.save(filename);
    
    // Track download
    trackEvent('pdf_downloaded', {
      analysisId,
      hasTemplates: !!latestTemplates,
      opportunitiesCount: analysis.savings_opportunities.length
    });
  };

  const handleAffiliateClick = (affiliate, link) => {
    // Track affiliate link clicks
    trackEvent('affiliate_link_clicked', {
      affiliate,
      analysisId
    });
    // Redirect after tracking
    window.open(link, '_blank');
  };

  const handleEmailCapture = async (e) => {
    e.preventDefault();
    const email = emailCaptureValue.trim().toLowerCase();
    if (!email || !email.includes('@')) return;
    setEmailCaptureLoading(true);
    try {
      await axios.post('/api/email/subscribe', {
        email,
        analysis_id: analysisId,
        savings_amount: analysis?.total_potential_savings || 0,
      });
      trackEvent('email_subscribed', { analysisId, savings_amount: analysis?.total_potential_savings });
      setEmailCaptureSubmitted(true);
    } catch (err) {
      console.log('Email capture note:', err.message);
      // Still mark submitted so we don't annoy the user
      setEmailCaptureSubmitted(true);
    } finally {
      setEmailCaptureLoading(false);
    }
  };

  // Generate contextual recommendations based on analysis
  // LINK POLICY: Only use verified, stable government (.gov) or well-known institutional URLs.
  // DO NOT use affiliate placeholder IDs — sign up for each program's affiliate portal first:
  //   - HealthCare.gov: no affiliate program (government)
  //   - eHealth affiliate program: https://www.ehealth.com/affiliates
  //   - NerdWallet affiliate: via Impact/CJ network
  // Replace TODO_AFFILIATE_ID with your real ID before deploying.
  const getContextualRecommendations = () => {
    const recs = [];
    const plansLink = getAffiliateLink('plans', 'results-recommendations');
    const rightsLink = getAffiliateLink('rights', 'results-recommendations');
    const appealsGuideLink = getAffiliateLink('appealsGuide', 'results-recommendations');
    const coverageLink = getAffiliateLink('coverageOptions', 'results-recommendations');
    
    // Check for high patient responsibility — link to government marketplace (always safe)
    if (analysis.total_patient_responsibility > 500) {
      recs.push({
        title: 'Compare Your Health Plan Options',
        description: 'High out-of-pocket costs may mean your current plan isn\'t the right fit. Compare ACA marketplace plans.',
        cta: plansLink.isAffiliate ? 'Compare Plans (Partner)' : 'Compare Plans on HealthCare.gov',
        onClick: () => handleAffiliateClick('PlanOptions', plansLink.url),
        icon: '📊',
        type: plansLink.isAffiliate ? 'affiliate' : 'government'
      });
    }
    
    // Check for OON claims
    const hasOONClaims = analysis.claims.some(c => !c.in_network);
    if (hasOONClaims) {
      recs.push({
        title: 'Learn About Surprise Billing Protections',
        description: 'The No Surprises Act may protect you from out-of-network charges in certain situations.',
        cta: rightsLink.isAffiliate ? 'See Protection Options (Partner)' : 'Read Your Rights (CMS.gov)',
        onClick: () => handleAffiliateClick('BillingRights', rightsLink.url),
        icon: '🏥',
        type: rightsLink.isAffiliate ? 'affiliate' : 'government'
      });
    }
    
    // Appeal guidance — link to CMS appeals resource (stable .gov)
    if (analysis.appeal_recommendations.length > 0) {
      recs.push({
        title: 'File a Formal Appeal',
        description: 'You have the right to appeal denied claims. CMS provides official guidance on how to do it.',
        cta: appealsGuideLink.isAffiliate ? 'Appeal Support Guide (Partner)' : 'Appeal Guide (CMS.gov)',
        onClick: () => handleAffiliateClick('AppealsGuide', appealsGuideLink.url),
        icon: '🤝',
        type: appealsGuideLink.isAffiliate ? 'affiliate' : 'government'
      });
    }

    // Always show — general marketplace link
    recs.push({
      title: 'Explore All Coverage Options',
      description: 'Browse ACA marketplace, Medicaid, and Medicare options to find better coverage for your needs.',
      cta: coverageLink.isAffiliate ? 'Browse Coverage (Partner)' : 'Browse Options (HealthCare.gov)',
      onClick: () => handleAffiliateClick('CoverageOptions', coverageLink.url),
      icon: '🏛️',
      type: coverageLink.isAffiliate ? 'affiliate' : 'government'
    });
    
    return recs;
  };

  const actionAppealsGuideLink = getAffiliateLink('appealsGuide', 'results-actions');

  return (
    <div className="results">
      <div className="results-header">
        <h2>
          Your EOB Analysis Results{' '}
          <span className={`results-access-badge ${isPaid ? 'results-access-badge-paid' : 'results-access-badge-unpaid'}`}>
            {isPaid ? 'Paid' : 'Locked'}
          </span>
        </h2>
        <p className="file-name">File: {analysis.file_name}</p>
      </div>

      <div className={`unlock-banner ${isPaid ? 'unlock-banner-paid' : 'unlock-banner-unpaid'}`}>
        {isPaid
          ? 'Unlock confirmed: your appeal templates are ready below.'
          : 'Templates are locked until checkout is completed.'}
      </div>

      <div className="summary-cards">
        <div className="summary-card highlight">
          <div className="card-value">${analysis.total_potential_savings.toFixed(2)}</div>
          <div className="card-label">Potential Savings</div>
        </div>
        <div className="summary-card">
          <div className="card-value">${analysis.total_billed.toFixed(2)}</div>
          <div className="card-label">Total Billed</div>
        </div>
        <div className="summary-card">
          <div className="card-value">${analysis.total_paid_by_insurance.toFixed(2)}</div>
          <div className="card-label">Insurance Paid</div>
        </div>
        <div className="summary-card">
          <div className="card-value">${analysis.total_patient_responsibility.toFixed(2)}</div>
          <div className="card-label">Your Responsibility</div>
        </div>
      </div>

      {!hasDownloadedPackage && (
        <>
          {!emailCaptureSubmitted ? (
            <div className="email-capture-card">
              <p className="email-capture-label">
                💡 Not ready to pay yet? Get a free reminder before you lose your savings window.
              </p>
              <form className="email-capture-form" onSubmit={handleEmailCapture}>
                <input
                  className="email-capture-input"
                  type="email"
                  placeholder="you@example.com"
                  value={emailCaptureValue}
                  onChange={(e) => setEmailCaptureValue(e.target.value)}
                  required
                  disabled={emailCaptureLoading}
                  aria-label="Email address for reminder"
                />
                <button
                  className="email-capture-button"
                  type="submit"
                  disabled={emailCaptureLoading || !emailCaptureValue.trim()}
                >
                  {emailCaptureLoading ? 'Saving...' : 'Remind me'}
                </button>
              </form>
            </div>
          ) : (
            <div className="email-capture-card email-capture-card-success">
              ✓ Got it! We'll send a reminder so you don't miss your savings window.
            </div>
          )}

          <PaymentButton 
            analysisId={analysisId}
            disabled={isCheckingPayment}
            pricing={pricing}
          />
          {paymentMessage && (
            <p className={`payment-status-message payment-status-${paymentStatus}`}>
              {paymentMessage}
            </p>
          )}
        </>
      )}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          🎯 Savings Opportunities ({analysis.savings_opportunities.length})
        </button>
        <button 
          className={`tab ${activeTab === 'appeals' ? 'active' : ''}`}
          onClick={() => setActiveTab('appeals')}
        >
          📝 Appeal Recommendations ({analysis.appeal_recommendations.length})
        </button>
        <button 
          className={`tab ${activeTab === 'claims' ? 'active' : ''}`}
          onClick={() => setActiveTab('claims')}
        >
          📋 All Claims ({analysis.claims.length})
        </button>
      </div>

      {activeTab === 'opportunities' && (
        <div className="opportunities-section">
          {analysis.savings_opportunities.length === 0 ? (
            <div className="no-results">
              <p>No savings opportunities identified in this EOB.</p>
            </div>
          ) : (
            <div className="opportunities-list">
              {analysis.savings_opportunities.map((opp) => (
                <div key={opp.opportunity_id} className="opportunity-card">
                  <div className="opportunity-header" onClick={() => setExpandedOpportunity(expandedOpportunity === opp.opportunity_id ? null : opp.opportunity_id)}>
                    <div className="opportunity-title">
                      <span className="opportunity-type">{opp.type.replace('_', ' ').toUpperCase()}</span>
                      {getSeverityBadge(opp.severity)}
                      <h4>{opp.description}</h4>
                    </div>
                    <div className="opportunity-amount">
                      ${opp.estimated_savings.toFixed(2)}
                    </div>
                  </div>
                  
                  {expandedOpportunity === opp.opportunity_id && (
                    <div className="opportunity-details">
                      <div className="detail-row">
                        <span className="label">Difficulty:</span>
                        <span className="difficulty">{opp.difficulty_level}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Time Needed:</span>
                        <span>{opp.time_estimate_days} days</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Confidence:</span>
                        <span>{getConfidenceBadge(opp)}</span>
                      </div>
                      <div className="detail-section">
                        <h5>Why This Was Flagged:</h5>
                        <p>{opp.flag_reason || 'Rule trigger details are limited for this finding.'}</p>
                      </div>
                      <div className="detail-section">
                        <h5>What To Verify Before Acting:</h5>
                        <ul className="detail-checklist">
                          {(opp.verification_steps || []).length === 0 && (
                            <li>Confirm claim details directly with your insurer and provider billing office.</li>
                          )}
                          {(opp.verification_steps || []).map((step, idx) => (
                            <li key={`verify-${opp.opportunity_id}-${idx}`}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="detail-section">
                        <h5>Could Be Correct If:</h5>
                        <ul className="detail-checklist detail-checklist-caveat">
                          {(opp.could_be_correct_if || []).length === 0 && (
                            <li>Plan-specific coverage rules could explain this result.</li>
                          )}
                          {(opp.could_be_correct_if || []).map((line, idx) => (
                            <li key={`caveat-${opp.opportunity_id}-${idx}`}>{line}</li>
                          ))}
                        </ul>
                      </div>
                      {(opp.missing_data_points || []).length > 0 && (
                        <div className="detail-section">
                          <h5>Missing Data Lowering Confidence:</h5>
                          <ul className="detail-checklist detail-checklist-muted">
                            {opp.missing_data_points.map((point, idx) => (
                              <li key={`missing-${opp.opportunity_id}-${idx}`}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="detail-section">
                        <h5>Recommended Action:</h5>
                        <p>{opp.recommended_action}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'appeals' && (
        <div className="appeals-section">
          {analysis.appeal_recommendations.length === 0 ? (
            <div className="no-results">
              <p>No appeals recommended for this EOB.</p>
            </div>
          ) : (
            <div className="appeals-list">
              {analysis.appeal_recommendations.map((rec) => (
                <div key={rec.claim_id} className="appeal-card">
                  <div className="appeal-header">
                    <h4>{rec.reason}</h4>
                    <div className="success-prob">
                      <span className="label">Success Probability:</span>
                      <span className="probability">{(rec.success_probability * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="appeal-steps">
                    <h5>Steps to Appeal:</h5>
                    <ol>
                      {rec.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'claims' && (
        <div className="claims-section">
          <div className="claims-list">
            {analysis.claims.map((claim) => (
              <div key={claim.claim_id} className="claim-card">
                <div className="claim-header">
                  <div>
                    <h4>{claim.provider_name}</h4>
                    <p className="claim-date">Visit: {new Date(claim.visit_date).toLocaleDateString()}</p>
                  </div>
                  <div className="claim-status">
                    <span className={`network-badge ${claim.in_network ? 'in-network' : 'out-network'}`}>
                      {claim.in_network ? '✓ In-Network' : '✗ Out-of-Network'}
                    </span>
                  </div>
                </div>
                <div className="claim-details">
                  <div className="claim-value">
                    <span>Total Billed:</span>
                    <span>${claim.total_billed.toFixed(2)}</span>
                  </div>
                  <div className="claim-value">
                    <span>Insurance Paid:</span>
                    <span>${claim.total_paid_by_insurance.toFixed(2)}</span>
                  </div>
                  <div className="claim-value">
                    <span>Your Cost:</span>
                    <span>${claim.total_patient_responsibility.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasDownloadedPackage && templates && (
        <div className="templates-section">
          <h3>📄 Your Appeal Templates & Scripts</h3>
          <p className="templates-intro">Below are personalized templates created specifically for your situation. 
            Copy, and customize them with your personal details.</p>
          {paymentMessage && (
            <p className={`payment-status-message payment-status-${paymentStatus}`}>
              {paymentMessage}
            </p>
          )}
          <div className="templates-download-row">
            <button className="download-package-button" onClick={handleDownloadPDF}>
              Download Appeal Package (PDF)
            </button>
          </div>
          <div className="download-meta" aria-label="download metadata">
            <span className="download-meta-icon" aria-hidden="true">PDF</span>
            <span className="download-meta-text">PDF • typically 1-2 pages</span>
          </div>
          <p className="download-assurance">Downloads directly to your device. No external redirect.</p>
          
          <div className="templates-list">
            {Object.entries(templates.templates).map(([key, content]) => (
              <div key={key} className="template-card">
                <div 
                  className="template-header"
                  onClick={() => setExpandedTemplate(expandedTemplate === key ? null : key)}
                >
                  <h4>
                    {key === 'appeal_letter' && '📬 Appeal Letter'}
                    {key === 'phone_script_insurer' && '☎️ Phone Script - Insurance Co.'}
                    {key === 'phone_script_provider' && '☎️ Phone Script - Provider'}
                    {key === 'appeal_checklist' && '✅ Appeal Checklist'}
                    {key === 'negotiation_talking_points' && '💬 Negotiation Talking Points'}
                  </h4>
                  <span className="expand-icon">{expandedTemplate === key ? '−' : '+'}</span>
                </div>
                {expandedTemplate === key && (
                  <div className="template-content">
                    <pre>{content}</pre>
                    <button 
                      className="copy-button"
                      onClick={() => {
                        navigator.clipboard.writeText(content);
                        alert('Copied to clipboard!');
                      }}
                    >
                      📋 Copy to Clipboard
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="action-section">
        <h3>Next Steps</h3>
        <div className="action-list">
          <div className="action-item">
            <div className="action-top">
              <span className="action-icon">📥</span>
              <div>
                <h5>Download Your Report</h5>
                <p>Save a copy of this analysis for your records</p>
              </div>
            </div>
            <button 
              onClick={handleDownloadPDF}
              disabled={!hasDownloadedPackage} 
              className={hasDownloadedPackage ? '' : 'disabled'}
            >
              {hasDownloadedPackage ? 'Download PDF' : 'Get Package First'}
            </button>
          </div>
          <div className="action-item">
            <div className="action-top">
              <span className="action-icon">📞</span>
              <div>
                <h5>Get Expert Help</h5>
                <p>Medical billing advocates can help with appeals</p>
              </div>
            </div>
            <button onClick={() => window.open(actionAppealsGuideLink.url, '_blank')}>
              {actionAppealsGuideLink.isAffiliate ? 'Appeal Support' : 'Appeal Guide'}
            </button>
          </div>
          {isPaid && (
            <div className="action-item">
              <div className="action-top">
                <span className="action-icon">🗂️</span>
                <div>
                  <h5>Track My Appeal</h5>
                  <p>Save status updates and set a follow-up date so this does not stall.</p>
                </div>
              </div>
              <button onClick={() => navigate(`/appeal-tracker/${analysisId}`)}>Open Tracker</button>
            </div>
          )}
          <div className="action-item">
            <div className="action-top">
              <span className="action-icon">🔄</span>
              <div>
                <h5>Analyze Another EOB</h5>
                <p>Check another month's statement</p>
              </div>
            </div>
            <button onClick={() => navigate('/analyzer')}>Analyze Another</button>
          </div>
        </div>
      </div>

      <div className="contextual-recommendations">
        <h3>💡 You Might Also Need</h3>
        <div className="recommendations-grid">
          {getContextualRecommendations().map((rec, idx) => (
            <div key={idx} className="recommendation-card">
              <div className="rec-icon">{rec.icon}</div>
              <h4>{rec.title}</h4>
              <p>{rec.description}</p>
              <button 
                className="rec-button"
                onClick={rec.onClick}
              >
                {rec.cta} →
              </button>
              {rec.type === 'affiliate' && <span className="rec-label">[Partner]</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
