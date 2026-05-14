"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const VERDICT_CONFIG = {
  typical: {
    label: "Typical",
    color: "#166534",
    bg: "#dcfce7",
    border: "#86efac",
    icon: "✓",
  },
  moderate: {
    label: "Above Average",
    color: "#854d0e",
    bg: "#fef9c3",
    border: "#fde047",
    icon: "⚠",
  },
  high: {
    label: "High",
    color: "#9a3412",
    bg: "#ffedd5",
    border: "#fb923c",
    icon: "↑",
  },
  very_high: {
    label: "Very High",
    color: "#7f1d1d",
    bg: "#fee2e2",
    border: "#f87171",
    icon: "↑↑",
  },
};

export default function FairPricePage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState(null); // {cpt, description, category}
  const [billedAmount, setBilledAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const debounceRef = useRef(null);

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (selectedProcedure) return; // Don't re-search once selected
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/fair-price/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results || []);
          setShowSuggestions(true);
        }
      } catch {
        // Silent fail — suggestions are a convenience, not required
      }
    }, 280);
  }, [query, selectedProcedure]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelectSuggestion(proc) {
    setSelectedProcedure(proc);
    setQuery(proc.description);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
    setSelectedProcedure(null);
    setResult(null);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);

    const amount = parseFloat(billedAmount.replace(/[$,]/g, ""));
    if (!query.trim()) {
      setError("Please enter a procedure name or CPT code.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid billed amount.");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ billed_amount: amount });
      // If the query looks like a CPT code (all digits), use cpt_code param
      if (/^\d{4,5}$/.test(query.trim())) {
        params.set("cpt_code", query.trim());
      } else if (selectedProcedure) {
        params.set("cpt_code", selectedProcedure.cpt);
      } else {
        params.set("procedure_query", query.trim());
      }

      const res = await fetch(`${API_BASE}/api/fair-price/check?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || "Could not find a matching procedure. Try rephrasing or entering a CPT code.");
        return;
      }
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const verdict = result ? VERDICT_CONFIG[result.verdict] : null;
  const ratioPercent = result ? Math.min((result.ratio / 5) * 100, 100) : 0;

  return (
    <div className="fair-price-page">
      <section className="fair-price-hero">
        <div className="fair-price-hero-inner">
          <span className="fair-price-kicker">Free Tool · No Sign-Up Required</span>
          <h1>Is My Medical Bill Fair?</h1>
          <p>
            Enter a procedure and what you were billed. We compare it against the{" "}
            <strong>CMS Medicare benchmark rate</strong> — the federal standard used
            as a reference by insurers, hospitals, and regulators.
          </p>
        </div>
      </section>

      <section className="fair-price-form-section">
        <form className="fair-price-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="fair-price-field" ref={suggestionsRef}>
            <label htmlFor="fp-procedure" className="fair-price-label">
              Procedure name or CPT code
            </label>
            <input
              id="fp-procedure"
              type="text"
              className="fair-price-input"
              placeholder="e.g. office visit, MRI lumbar spine, 99213"
              value={query}
              onChange={handleQueryChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="fair-price-suggestions">
                {suggestions.map((s) => (
                  <li key={s.cpt}>
                    <button
                      type="button"
                      className="fair-price-suggestion-btn"
                      onClick={() => handleSelectSuggestion(s)}
                    >
                      <span className="fp-suggestion-desc">{s.description}</span>
                      <span className="fp-suggestion-meta">CPT {s.cpt} · {s.category}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="fair-price-field">
            <label htmlFor="fp-amount" className="fair-price-label">
              Amount billed to you ($)
            </label>
            <input
              id="fp-amount"
              type="text"
              className="fair-price-input"
              placeholder="e.g. 350.00"
              value={billedAmount}
              onChange={(e) => { setBilledAmount(e.target.value); setResult(null); setError(""); }}
            />
          </div>

          {error && <p className="fair-price-error">{error}</p>}

          <button
            type="submit"
            className="btn-primary fair-price-submit"
            disabled={loading}
          >
            {loading ? "Checking…" : "Check My Bill"}
          </button>
        </form>

        {result && verdict && (
          <div
            className="fair-price-result"
            style={{ borderColor: verdict.border, background: verdict.bg }}
          >
            <div className="fp-result-header">
              <div>
                <p className="fp-result-procedure">{result.procedure_name}</p>
                <p className="fp-result-cpt">CPT {result.cpt_code} · {result.category}</p>
              </div>
              <span
                className="fp-verdict-badge"
                style={{ color: verdict.color, background: "white", border: `1.5px solid ${verdict.border}` }}
              >
                {verdict.icon} {verdict.label}
              </span>
            </div>

            <div className="fp-result-amounts">
              <div className="fp-amount-block">
                <span className="fp-amount-label">You were billed</span>
                <span className="fp-amount-value">${result.billed_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="fp-amount-divider">vs.</div>
              <div className="fp-amount-block">
                <span className="fp-amount-label">Medicare benchmark</span>
                <span className="fp-amount-value fp-amount-medicare">${result.medicare_rate.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="fp-ratio-bar-wrap">
              <div className="fp-ratio-bar-track">
                <div
                  className="fp-ratio-bar-fill"
                  style={{ width: `${ratioPercent}%`, background: verdict.color }}
                />
                <div className="fp-ratio-bar-marker" style={{ left: "20%" }} title="1x Medicare" />
              </div>
              <p className="fp-ratio-label">
                Your bill is <strong>{result.ratio}×</strong> the Medicare rate
              </p>
            </div>

            <p className="fp-verdict-note">{result.verdict_note}</p>

            <p className="fp-commercial-range">
              Typical commercial insurer payment range:{" "}
              <strong>${result.typical_commercial_low.toLocaleString("en-US", { minimumFractionDigits: 2 })} – ${result.typical_commercial_high.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
            </p>

            <div className="fp-cta-block">
              <p className="fp-cta-text">
                Have an Explanation of Benefits (EOB)? Get a full claim-by-claim breakdown,
                appeal recommendations, and a ready-to-send letter.
              </p>
              <Link href="/analyzer" className="btn-primary fp-cta-btn">
                Analyze My Full EOB →
              </Link>
            </div>

            <p className="fp-disclaimer">{result.disclaimer}</p>
          </div>
        )}
      </section>

      <section className="fair-price-faq">
        <div className="fair-price-faq-inner">
          <h2>How does this work?</h2>
          <div className="fp-faq-grid">
            <div className="fp-faq-item">
              <h3>What is the Medicare rate?</h3>
              <p>
                CMS (Centers for Medicare &amp; Medicaid Services) publishes national average
                payment rates for every medical procedure. These are widely used as a baseline
                benchmark — commercial insurers typically negotiate rates of 1.2–2.0× Medicare.
              </p>
            </div>
            <div className="fp-faq-item">
              <h3>Why does my bill look so high?</h3>
              <p>
                Hospitals and providers bill at &ldquo;chargemaster&rdquo; rates — internal list prices
                that can be 3–10× Medicare. Insurers negotiate these down. If you&rsquo;re uninsured
                or out-of-network, you may be billed chargemaster rates directly.
              </p>
            </div>
            <div className="fp-faq-item">
              <h3>Can I negotiate my bill?</h3>
              <p>
                Yes. Most providers will accept lower payment — especially if you ask for
                the &ldquo;Medicare rate&rdquo; or &ldquo;self-pay discount.&rdquo; Hospitals are often required
                to offer charity care if your income qualifies.
              </p>
            </div>
            <div className="fp-faq-item">
              <h3>What if I have insurance?</h3>
              <p>
                Upload your Explanation of Benefits (EOB) for a full analysis. We flag
                billing errors, denied claims worth appealing, and out-of-network
                overcharges — then help you prepare an appeal letter.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
