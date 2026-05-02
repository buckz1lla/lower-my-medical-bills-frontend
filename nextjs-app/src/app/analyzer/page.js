"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const trackEvent = async (event, data = {}) => {
  try {
    await fetch(`${API_BASE}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
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

export default function AnalyzerPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const stepTimerRef = useRef(null);
  const router = useRouter();

  const PROCESSING_STEPS = [
    { label: "Uploading your file", detail: "Securely transmitting your EOB" },
    { label: "Reading claim data", detail: "Parsing line items and service codes" },
    { label: "Checking for billing errors", detail: "Running CCI edit and modifier checks" },
    { label: "Analyzing denial codes", detail: "Cross-referencing CARC reason codes" },
    { label: "Evaluating appeal options", detail: "Scoring each opportunity by confidence" },
    { label: "Building your action brief", detail: "Finalizing savings opportunities" },
  ];

  useEffect(() => {
    if (loading) {
      setStepIndex(0);
      stepTimerRef.current = setInterval(() => {
        setStepIndex((prev) => Math.min(prev + 1, PROCESSING_STEPS.length - 1));
      }, 1800);
    } else {
      clearInterval(stepTimerRef.current);
    }
    return () => clearInterval(stepTimerRef.current);
  }, [loading]);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    if (!ALLOWED_TYPES.has(selectedFile.type)) {
      setError("Please upload a PDF, image (JPG/PNG), or spreadsheet (CSV/XLSX)");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await trackEvent("upload_started", {
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
      });

      const formData = new FormData();
      formData.append("file", file);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60_000);

      const response = await fetch(`${API_BASE}/api/eob/upload`, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.detail || "Error uploading file. Please try again.");
      }

      const payload = await response.json();

      await trackEvent("upload_completed", {
        analysisId: payload.analysis_id,
        file_name: file.name,
        file_type: file.type,
      });

      setFile(null);
      router.push(`/results/${payload.analysis_id}`);
    } catch (submitError) {
      if (submitError.name === "AbortError") {
        setError("Upload timed out while analyzing this file. Try a smaller PDF or CSV export.");
      } else {
        setError(submitError.message || "Error uploading file. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="content-page">
      <section className="content-card analyzer-card">
        <h1>Run an Appeal-First EOB Review</h1>
        <p className="analyzer-subtitle">
          Upload your EOB to get a focused risk review and a practical action brief for your next steps.
        </p>

        <section className="brief-preview" aria-label="Action brief preview">
          <h2>What Your Action Brief Includes</h2>
          <div className="brief-preview-grid">
            <article className="brief-preview-item">
              <h3>Claim Signal Queue</h3>
              <p>Ranked issues by leverage, urgency, and confidence level.</p>
            </article>
            <article className="brief-preview-item">
              <h3>Verification Checklist</h3>
              <p>What to confirm before calling your insurer or provider.</p>
            </article>
            <article className="brief-preview-item">
              <h3>Appeal Prep Path</h3>
              <p>A clean sequence for documentation, escalation, and follow-up.</p>
            </article>
          </div>
        </section>

        <div className="trust-strip" aria-label="Pre-upload trust information">
          <div className="trust-strip-item">
            <span className="trust-strip-icon">📎</span>
            <div>
              <strong>What files work?</strong>
              <span>PDF, JPG, PNG, CSV, or XLSX — up to ~10 MB</span>
            </div>
          </div>
          <div className="trust-strip-item">
            <span className="trust-strip-icon">📋</span>
            <div>
              <strong>What will I get back?</strong>
              <span>A ranked claim signal list, verification checklist, and appeal prep sequence</span>
            </div>
          </div>
          <div className="trust-strip-item">
            <span className="trust-strip-icon">🔒</span>
            <div>
              <strong>Is my data safe?</strong>
              <span>Your file is processed for this review only and not retained</span>
            </div>
          </div>
        </div>

        {error ? <div className="analyzer-alert analyzer-alert-error">{error}</div> : null}

        <form onSubmit={handleSubmit} className="analyzer-form-next">
          <label
            htmlFor="eob-file"
            className={`file-drop-zone ${isDragOver ? "file-drop-zone-active" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setIsDragOver(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragOver(false);
              validateAndSetFile(event.dataTransfer.files?.[0]);
            }}
          >
            <input
              id="eob-file"
              type="file"
              className="hidden-file-input"
              accept=".pdf,.jpg,.jpeg,.png,.csv,.xlsx"
              onChange={(event) => validateAndSetFile(event.target.files?.[0])}
            />
            <span className="file-drop-icon">📄</span>
            <span className="file-drop-title">
              {file ? `Selected: ${file.name}` : "Drop your file here or click to upload"}
            </span>
            <span className="file-drop-hint">PDF, Images (JPG/PNG), or Spreadsheets (CSV/XLSX)</span>
          </label>

          <button
            type="submit"
            className={`btn-primary analyzer-submit ${file && !loading ? "analyzer-submit-ready" : ""}`}
            disabled={!file || loading}
          >
            {loading ? (
              <span className="analyzer-loading-inner">
                <span className="analyzer-spinner" aria-hidden="true" />
                <span className="analyzer-loading-text">
                  <span className="analyzer-loading-label">{PROCESSING_STEPS[stepIndex].label}</span>
                  <span className="analyzer-loading-detail">{PROCESSING_STEPS[stepIndex].detail}</span>
                </span>
              </span>
            ) : "Generate My Action Brief"}
          </button>
          {loading ? (
            <div className="analyzer-step-track" role="status" aria-live="polite">
              {PROCESSING_STEPS.map((step, idx) => (
                <div
                  key={step.label}
                  className={`analyzer-step-dot${idx < stepIndex ? " analyzer-step-dot-done" : idx === stepIndex ? " analyzer-step-dot-active" : ""}`}
                />
              ))}
            </div>
          ) : null}
        </form>
      </section>
    </main>
  );
}
