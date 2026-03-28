"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const SHOW_PARSER_DEBUG = process.env.NEXT_PUBLIC_SHOW_PARSER_DEBUG === "true";

const formatMoney = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

export default function ResultsPage({ params }) {
  const { analysisId } = params;
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("opportunities");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/eob/analysis/${analysisId}`);
        if (!response.ok) {
          throw new Error("Failed to load analysis results. Please try again.");
        }

        const payload = await response.json();
        if (mounted) {
          setAnalysis(payload);
        }
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

    return () => {
      mounted = false;
    };
  }, [analysisId]);

  const opportunities = useMemo(() => analysis?.savings_opportunities || [], [analysis]);
  const appeals = useMemo(() => analysis?.appeal_recommendations || [], [analysis]);
  const claims = useMemo(() => analysis?.claims || [], [analysis]);

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

  const parserSource = analysis?.key_metrics?.parser_source || "unknown";
  const parserWarning = analysis?.key_metrics?.parser_warning || "";
  const analysisMode = analysis?.key_metrics?.analysis_mode || "live";

  return (
    <main className="home-page">
      <section className="results-header-next">
        <h1>Your EOB Analysis Results</h1>
        <p>File: {analysis.file_name}</p>
      </section>

      <section className="summary-cards-next">
        <article className="summary-card-next summary-card-next-highlight">
          <p className="summary-card-next-value">{formatMoney(analysis.total_potential_savings)}</p>
          <p className="summary-card-next-label">Potential Savings</p>
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

      <section className="results-tabs-next" aria-label="Results tabs">
        <button
          className={`results-tab-next ${activeTab === "opportunities" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("opportunities")}
          type="button"
        >
          Opportunities ({opportunities.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "appeals" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("appeals")}
          type="button"
        >
          Appeals ({appeals.length})
        </button>
        <button
          className={`results-tab-next ${activeTab === "claims" ? "results-tab-next-active" : ""}`}
          onClick={() => setActiveTab("claims")}
          type="button"
        >
          Claims ({claims.length})
        </button>
      </section>

      {activeTab === "opportunities" ? (
        <section className="results-list-next">
          {opportunities.length === 0 ? (
            <p className="empty-state-next">No savings opportunities detected for this upload.</p>
          ) : (
            opportunities.map((opportunity) => (
              <article className="result-card-next" key={opportunity.opportunity_id}>
                <div className="result-card-next-top">
                  <p className="result-pill-next">{opportunity.type.replaceAll("_", " ")}</p>
                  <p className="result-money-next">{formatMoney(opportunity.estimated_savings)}</p>
                </div>
                <h3>{opportunity.description}</h3>
                <p>{opportunity.recommended_action}</p>
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
                  {appeal.steps.map((step, stepIndex) => (
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
                <p>Network: {claim.in_network ? "In network" : "Out of network"}</p>
              </article>
            ))
          )}
        </section>
      ) : null}

      <section className="content-card results-next-note">
        <p>
          Template unlock checkout and PDF export are being migrated in the next Phase 2 commit.
          Core upload and analysis rendering are now functional in Next.js.
        </p>
      </section>
    </main>
  );
}
