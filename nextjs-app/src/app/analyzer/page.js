"use client";

import { useState } from "react";
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
  const router = useRouter();

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
        <h1>Check My EOB and Prep My Appeal</h1>
        <p className="analyzer-subtitle">
          Upload your Explanation of Benefits to review potential billing issues and prepare your appeal plan.
        </p>

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
              {file ? `Selected: ${file.name}` : "Click to upload or drag and drop"}
            </span>
            <span className="file-drop-hint">PDF, Images (JPG/PNG), or Spreadsheets (CSV/XLSX)</span>
          </label>

          <button
            type="submit"
            className={`btn-primary analyzer-submit ${file && !loading ? "analyzer-submit-ready" : ""}`}
            disabled={!file || loading}
          >
            {loading ? "Uploading and analyzing..." : "Analyze My EOB"}
          </button>
        </form>
      </section>
    </main>
  );
}
