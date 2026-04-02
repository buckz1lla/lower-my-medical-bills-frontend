"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const ENABLE_ANALYTICS_DASHBOARD = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD === "true";
const LOW_VOLUME_MIN_VIEWS = 20;

function MetricCard({ title, value, subtitle }) {
  return (
    <article className="metric-card-next">
      <p className="metric-title-next">{title}</p>
      <p className="metric-value-next">{value}</p>
      {subtitle ? <p className="metric-subtitle-next">{subtitle}</p> : null}
    </article>
  );
}

const toPercent = (value) => `${Number(value || 0)}%`;

export default function OwnerAnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsAuth, setNeedsAuth] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [today, setToday] = useState(null);
  const [sevenDay, setSevenDay] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [priceExperiment, setPriceExperiment] = useState(null);
  const [emailSignups, setEmailSignups] = useState(null);
  const [appealRetention, setAppealRetention] = useState(null);
  const [storageAlerts, setStorageAlerts] = useState(null);
  const [revenueDays, setRevenueDays] = useState(7);
  const [reminderStatus, setReminderStatus] = useState(null);
  const [autoWindowAdjusted, setAutoWindowAdjusted] = useState(false);
  const [autoWindowNote, setAutoWindowNote] = useState("");

  useEffect(() => {
    setApiKey(window.localStorage.getItem("analytics_api_key") || "");
  }, []);

  const requestConfig = useMemo(() => {
    if (apiKey) {
      return {
        headers: { "Content-Type": "application/json" },
        query: `?api_key=${encodeURIComponent(apiKey)}`,
      };
    }

    return {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      query: "",
    };
  }, [apiKey]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const cfg = requestConfig;
      const [todayRes, sevenDayRes, revenueRes, priceRes, emailRes, appealRes, alertsRes] = await Promise.all([
        fetch(`${API_BASE}/api/analytics/funnel${cfg.query}`, cfg),
        fetch(`${API_BASE}/api/analytics/funnel-7d${cfg.query}`, cfg),
        fetch(`${API_BASE}/api/analytics/revenue?days=${revenueDays}${cfg.query ? `&api_key=${encodeURIComponent(apiKey)}` : ""}`, cfg),
        fetch(`${API_BASE}/api/analytics/price-experiment?days=${revenueDays}${cfg.query ? `&api_key=${encodeURIComponent(apiKey)}` : ""}`, cfg),
        fetch(`${API_BASE}/api/analytics/email-signups?days=${revenueDays}${cfg.query ? `&api_key=${encodeURIComponent(apiKey)}` : ""}`, cfg),
        fetch(`${API_BASE}/api/analytics/appeal-retention?days=${revenueDays}${cfg.query ? `&api_key=${encodeURIComponent(apiKey)}` : ""}`, cfg),
        fetch(`${API_BASE}/api/analytics/storage-alerts?days=${revenueDays}&max_items=20${cfg.query ? `&api_key=${encodeURIComponent(apiKey)}` : ""}`, cfg),
      ]);

      const responses = [todayRes, sevenDayRes, revenueRes, priceRes, emailRes, appealRes, alertsRes];
      const unauthorized = responses.some((res) => res.status === 401);
      if (unauthorized) {
        throw new Error("401");
      }
      if (responses.some((res) => !res.ok)) {
        throw new Error("Unable to load analytics right now.");
      }

      const [todayData, sevenDayData, revenueData, priceData, emailData, appealData, alertsData] = await Promise.all(
        responses.map((res) => res.json()),
      );

      setToday(todayData);
      setSevenDay(sevenDayData);
      setRevenue(revenueData);
      setPriceExperiment(priceData);
      setEmailSignups(emailData);
      setAppealRetention(appealData);
      setStorageAlerts(alertsData);

      const sevenDayViews = Number(sevenDayData?.counts?.results_page_viewed || 0);
      if (!autoWindowAdjusted && revenueDays === 7 && sevenDayViews < LOW_VOLUME_MIN_VIEWS) {
        setRevenueDays(30);
        setAutoWindowAdjusted(true);
        setAutoWindowNote(`Auto-switched to 30d because 7d views are low (${sevenDayViews} < ${LOW_VOLUME_MIN_VIEWS}).`);
      }

      setNeedsAuth(false);
    } catch (fetchError) {
      if (fetchError.message === "401") {
        setNeedsAuth(true);
        setError("Analytics access requires an API key or owner login.");
      } else {
        setError(fetchError.message || "Unable to load analytics right now.");
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey, autoWindowAdjusted, requestConfig, revenueDays]);

  useEffect(() => {
    if (!ENABLE_ANALYTICS_DASHBOARD) {
      router.replace("/");
      return;
    }
    fetchAnalytics();
  }, [fetchAnalytics, router]);

  const saveApiKey = () => {
    window.localStorage.setItem("analytics_api_key", apiKey);
    fetchAnalytics();
  };

  const handleOwnerLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/owner/login");
    }
  };

  const handleSendReminders = async () => {
    if (!window.confirm("Send reminder emails to all subscribers now?")) {
      return;
    }

    setReminderStatus({ loading: true });
    try {
      const response = await fetch(
        `${API_BASE}/api/email/send-reminders${apiKey ? `?api_key=${encodeURIComponent(apiKey)}` : ""}`,
        {
          method: "POST",
          credentials: apiKey ? "same-origin" : "include",
        },
      );

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.detail || "Failed to send reminders.");
      }

      const payload = await response.json();
      setReminderStatus({ result: payload });
    } catch (sendError) {
      setReminderStatus({ error: sendError.message || "Failed to send reminders." });
    }
  };

  if (!ENABLE_ANALYTICS_DASHBOARD) {
    return null;
  }

  if (loading) {
    return (
      <main className="content-page">
        <section className="content-card">
          <h1>Analytics Dashboard</h1>
          <p>Loading metrics...</p>
        </section>
      </main>
    );
  }

  const hasStorageFallbackAlerts = Number(storageAlerts?.count || 0) > 0;

  return (
    <main className="home-page analytics-page-next">
      <section className="analytics-header-next">
        <h1>Analytics Dashboard</h1>
        <p>Track conversion from Results view to Payment to Download.</p>
        <div className="analytics-toolbar-next">
          <button className="action-button-next" onClick={() => fetchAnalytics()} type="button">
            Refresh
          </button>
          <button className="action-button-next" onClick={handleOwnerLogout} type="button">
            Log out
          </button>
        </div>
      </section>

      {hasStorageFallbackAlerts ? (
        <section className="analytics-alert-banner-next" role="alert" aria-live="polite">
          <p>
            Storage fallback detected in the selected window. Review the "Storage Fallback Alerts" section before shipping changes.
          </p>
        </section>
      ) : (
        <section className="analytics-ok-banner-next" aria-live="polite">
          <p>No storage fallback alerts detected in the selected window.</p>
        </section>
      )}

      {error ? <p className="analytics-error-next">{error}</p> : null}

      {needsAuth ? (
        <section className="content-card api-key-box-next">
          <label htmlFor="analytics-key">Analytics API Key</label>
          <input
            id="analytics-key"
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Enter API key"
          />
          <button className="action-button-next" onClick={saveApiKey} type="button">
            Save and Retry
          </button>
        </section>
      ) : null}

      <section className="analytics-section-next">
        <h2>Today</h2>
        <div className="metrics-grid-next">
          <MetricCard title="Results Views" value={today?.counts?.results_page_viewed ?? 0} />
          <MetricCard title="Payments" value={today?.counts?.payment_completed ?? 0} subtitle={`${toPercent(today?.funnel?.views_to_payment_percent)} of views`} />
          <MetricCard title="PDF Downloads" value={today?.counts?.pdf_downloaded ?? 0} subtitle={`${toPercent(today?.funnel?.payment_to_download_percent)} of payments`} />
          <MetricCard title="Affiliate CTR" value={toPercent(today?.funnel?.affiliate_ctr_percent)} />
        </div>
      </section>

      <section className="analytics-section-next">
        <h2>Last 7 Days</h2>
        <div className="metrics-grid-next">
          <MetricCard title="Results Views" value={sevenDay?.counts?.results_page_viewed ?? 0} />
          <MetricCard title="Payments" value={sevenDay?.counts?.payment_completed ?? 0} subtitle={`${toPercent(sevenDay?.funnel?.views_to_payment_percent)} of views`} />
          <MetricCard title="PDF Downloads" value={sevenDay?.counts?.pdf_downloaded ?? 0} subtitle={`${toPercent(sevenDay?.funnel?.payment_to_download_percent)} of payments`} />
          <MetricCard title="Affiliate CTR" value={toPercent(sevenDay?.funnel?.affiliate_ctr_percent)} />
        </div>
      </section>

      <section className="analytics-section-next">
        <h2>Revenue and Experiment</h2>
        <div className="window-toggle-next" role="group" aria-label="Revenue window selector">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              type="button"
              className={`window-toggle-button-next ${revenueDays === days ? "window-toggle-button-next-active" : ""}`}
              onClick={() => {
                setRevenueDays(days);
                if (days !== 30) {
                  setAutoWindowNote("");
                }
              }}
            >
              {days}d
            </button>
          ))}
        </div>
        {autoWindowNote && revenueDays === 30 ? <p className="analytics-info-next">{autoWindowNote}</p> : null}
        <div className="metrics-grid-next">
          <MetricCard title="Revenue" value={`$${Number(revenue?.total_revenue || 0).toFixed(2)}`} />
          <MetricCard title="Paid Orders" value={revenue?.payment_count ?? 0} />
          <MetricCard title="AOV" value={`$${Number(revenue?.average_order_value || 0).toFixed(2)}`} />
          <MetricCard title="Variants" value={priceExperiment?.variants?.length ?? 0} />
        </div>
      </section>

      <section className="analytics-section-next">
        <h2>Email and Appeal Retention</h2>
        <div className="metrics-grid-next">
          <MetricCard title="Subscribers" value={emailSignups?.total_subscribers ?? 0} />
          <MetricCard title={`Signups (${revenueDays}d)`} value={emailSignups?.period_signups ?? 0} />
          <MetricCard title="Tracked Appeals" value={appealRetention?.total_trackers ?? 0} />
          <MetricCard title="Follow-ups Due" value={appealRetention?.follow_up_due ?? 0} />
        </div>
        <div className="analytics-toolbar-next" style={{ marginTop: 12 }}>
          <button className="action-button-next" onClick={handleSendReminders} type="button" disabled={reminderStatus?.loading}>
            {reminderStatus?.loading ? "Sending..." : "Send Reminder Emails"}
          </button>
        </div>
        {reminderStatus?.result ? (
          <p className="analytics-info-next">
            Sent {reminderStatus.result.sent} email(s).
            {reminderStatus.result.failed > 0 ? ` ${reminderStatus.result.failed} failed.` : ""}
          </p>
        ) : null}
        {reminderStatus?.error ? <p className="analytics-error-next">{reminderStatus.error}</p> : null}
      </section>

      <section className="analytics-section-next">
        <h2>Storage Fallback Alerts</h2>
        <div className="metrics-grid-next">
          <MetricCard title="Alert Count" value={storageAlerts?.count ?? 0} subtitle={`Last ${revenueDays} days`} />
          <MetricCard title="Most Recent Reason" value={storageAlerts?.alerts?.[0]?.reason || "none"} />
          <MetricCard title="Most Recent Event" value={storageAlerts?.alerts?.[0]?.event || "none"} />
          <MetricCard title="Most Recent Time" value={storageAlerts?.alerts?.[0]?.timestamp ? new Date(storageAlerts.alerts[0].timestamp).toLocaleString() : "n/a"} />
        </div>
        {storageAlerts?.alerts?.length ? (
          <div className="alerts-list-next">
            {storageAlerts.alerts.slice(0, 10).map((alert, idx) => (
              <div className="alert-item-next" key={`${alert.timestamp || "t"}-${idx}`}>
                <p><strong>{alert.reason || "unknown"}</strong></p>
                <p>event: {alert.event || "n/a"}</p>
                <p>time: {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : "n/a"}</p>
                <p>analysisId: {alert.analysisId || "n/a"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="analytics-info-next">No fallback alerts in this window.</p>
        )}
      </section>
    </main>
  );
}
