import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AnalyticsDashboard.css';

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      {subtitle && <div className="metric-subtitle">{subtitle}</div>}
    </div>
  );
}

function SimpleLineChart({ series }) {
  const width = 900;
  const height = 260;
  const padX = 42;
  const padY = 28;
  const chartWidth = width - padX * 2;
  const chartHeight = height - padY * 2;

  const views = series.map((d) => d.counts.results_page_viewed || 0);
  const payments = series.map((d) => d.counts.payment_completed || 0);
  const downloads = series.map((d) => d.counts.pdf_downloaded || 0);
  const maxValue = Math.max(1, ...views, ...payments, ...downloads);

  const toPoints = (arr) =>
    arr
      .map((value, idx) => {
        const x = padX + (idx * chartWidth) / Math.max(1, arr.length - 1);
        const y = padY + chartHeight - (value / maxValue) * chartHeight;
        return `${x},${y}`;
      })
      .join(' ');

  const viewPoints = toPoints(views);
  const paymentPoints = toPoints(payments);
  const downloadPoints = toPoints(downloads);

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" role="img" aria-label="Views, payments, and downloads over time">
        <line x1={padX} y1={padY} x2={padX} y2={height - padY} className="chart-axis" />
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} className="chart-axis" />

        <polyline points={viewPoints} className="line line-views" />
        <polyline points={paymentPoints} className="line line-payments" />
        <polyline points={downloadPoints} className="line line-downloads" />
      </svg>

      <div className="chart-legend">
        <span><i className="legend-dot dot-views" />Views</span>
        <span><i className="legend-dot dot-payments" />Payments</span>
        <span><i className="legend-dot dot-downloads" />Downloads</span>
      </div>
    </div>
  );
}

function RevenueLineChart({ series }) {
  const width = 900;
  const height = 220;
  const padX = 42;
  const padY = 28;
  const chartWidth = width - padX * 2;
  const chartHeight = height - padY * 2;

  const values = series.map((d) => d.revenue || 0);
  const maxValue = Math.max(1, ...values);

  const points = values
    .map((value, idx) => {
      const x = padX + (idx * chartWidth) / Math.max(1, values.length - 1);
      const y = padY + chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="chart-svg" role="img" aria-label="Revenue over time">
        <line x1={padX} y1={padY} x2={padX} y2={height - padY} className="chart-axis" />
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} className="chart-axis" />
        <polyline points={points} className="line line-revenue" />
      </svg>

      <div className="chart-legend">
        <span><i className="legend-dot dot-revenue" />Revenue</span>
      </div>
    </div>
  );
}

function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('analytics_api_key') || '');
  const [needsAuth, setNeedsAuth] = useState(false);
  const [today, setToday] = useState(null);
  const [sevenDay, setSevenDay] = useState(null);
  const [series, setSeries] = useState([]);
  const [revenue, setRevenue] = useState(null);
  const [priceExperiment, setPriceExperiment] = useState(null);
  const [emailSignups, setEmailSignups] = useState(null);
  const [appealRetention, setAppealRetention] = useState(null);
  const [reminderStatus, setReminderStatus] = useState(null);
  const [revenueDays, setRevenueDays] = useState(7);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cfg = apiKey ? { params: { api_key: apiKey } } : { withCredentials: true };
      const [todayRes, sevenDayRes, seriesRes, revenueRes, priceExperimentRes, emailRes, appealRes] = await Promise.all([
        axios.get('/api/analytics/funnel', cfg),
        axios.get('/api/analytics/funnel-7d', cfg),
        axios.get('/api/analytics/timeseries?days=7', cfg),
        axios.get(`/api/analytics/revenue?days=${revenueDays}`, cfg),
        axios.get(`/api/analytics/price-experiment?days=${revenueDays}`, cfg),
        axios.get(`/api/analytics/email-signups?days=${revenueDays}`, cfg),
        axios.get(`/api/analytics/appeal-retention?days=${revenueDays}`, cfg),
      ]);

      setToday(todayRes.data);
      setSevenDay(sevenDayRes.data);
      setSeries(seriesRes.data.series || []);
      setRevenue(revenueRes.data);
      setPriceExperiment(priceExperimentRes.data);
      setEmailSignups(emailRes.data);
      setAppealRetention(appealRes.data);
      setNeedsAuth(false);
    } catch (err) {
      if (err?.response?.status === 401) {
        setNeedsAuth(true);
        setError('Analytics access requires an API key.');
      } else {
        setError('Unable to load analytics right now.');
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey, revenueDays]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const saveApiKey = () => {
    localStorage.setItem('analytics_api_key', apiKey);
    fetchAnalytics();
  };

  const exportCsv = () => {
    const header = ['date', 'views', 'payments', 'downloads', 'affiliate_clicks', 'views_to_payment_percent', 'payment_to_download_percent', 'views_to_download_percent', 'affiliate_ctr_percent'];
    const rows = series.map((day) => [
      day.date,
      day.counts.results_page_viewed,
      day.counts.payment_completed,
      day.counts.pdf_downloaded,
      day.counts.affiliate_link_clicked,
      day.funnel.views_to_payment_percent,
      day.funnel.payment_to_download_percent,
      day.funnel.views_to_download_percent,
      day.funnel.affiliate_ctr_percent,
    ]);

    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-timeseries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportRevenueCsv = () => {
    const header = ['timestamp', 'analysis_id', 'amount_usd', 'customer_email_masked'];
    const rows = (revenue?.recent_payments || []).map((row) => [
      row.timestamp || '',
      row.analysis_id || '',
      row.amount ?? 0,
      row.customer_email || '',
    ]);

    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revenue-${revenueDays}d-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const revenueWindowOptions = [7, 14, 30];

  const handleOwnerLogout = async () => {
    try {
      await axios.post('/api/admin/logout', {}, { withCredentials: true });
    } finally {
      navigate('/owner/login', { replace: true });
    }
  };

  const handleSendReminders = async () => {
    if (!window.confirm('Send reminder emails to all subscribers now?')) return;
    setReminderStatus({ loading: true });
    try {
      const cfg = apiKey ? { params: { api_key: apiKey } } : { withCredentials: true };
      const res = await axios.post('/api/email/send-reminders', {}, cfg);
      setReminderStatus({ result: res.data });
    } catch (err) {
      const msg = err.response?.data?.detail || 'Failed to send reminders. Check SMTP config.';
      setReminderStatus({ error: msg });
    }
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-container">
          <h2>Analytics Dashboard</h2>
          <p>Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="analytics-container">
          <h2>Analytics Dashboard</h2>
          <p className="analytics-error">{error}</p>
          {needsAuth && (
            <div className="api-key-box">
              <label htmlFor="analytics-key">Analytics API Key</label>
              <input
                id="analytics-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key"
              />
              <button onClick={saveApiKey}>Save and Retry</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="analytics-header">
          <h2>Analytics Dashboard</h2>
          <p>Track conversion from Results view to Payment to Download.</p>
          <div className="analytics-toolbar">
            <button className="toolbar-button" onClick={exportCsv}>Export CSV</button>
            <button className="toolbar-button toolbar-button-secondary" onClick={handleOwnerLogout}>Log out</button>
          </div>
        </div>

        <section className="analytics-section">
          <h3>Today</h3>
          <div className="metrics-grid">
            <MetricCard title="Results Views" value={today?.counts?.results_page_viewed ?? 0} />
            <MetricCard title="Payments" value={today?.counts?.payment_completed ?? 0} subtitle={`${today?.funnel?.views_to_payment_percent ?? 0}% of views`} />
            <MetricCard title="PDF Downloads" value={today?.counts?.pdf_downloaded ?? 0} subtitle={`${today?.funnel?.payment_to_download_percent ?? 0}% of payments`} />
            <MetricCard title="Affiliate Clicks" value={today?.counts?.affiliate_link_clicked ?? 0} subtitle={`${today?.funnel?.affiliate_ctr_percent ?? 0}% CTR`} />
          </div>
        </section>

        <section className="analytics-section">
          <h3>Last 7 Days</h3>
          <div className="metrics-grid">
            <MetricCard title="Results Views" value={sevenDay?.counts?.results_page_viewed ?? 0} />
            <MetricCard title="Payments" value={sevenDay?.counts?.payment_completed ?? 0} subtitle={`${sevenDay?.funnel?.views_to_payment_percent ?? 0}% of views`} />
            <MetricCard title="PDF Downloads" value={sevenDay?.counts?.pdf_downloaded ?? 0} subtitle={`${sevenDay?.funnel?.payment_to_download_percent ?? 0}% of payments`} />
            <MetricCard title="Affiliate CTR" value={`${sevenDay?.funnel?.affiliate_ctr_percent ?? 0}%`} />
          </div>
        </section>

        <section className="analytics-section">
          <h3>Revenue (Last {revenueDays} Days)</h3>
          <div className="window-toggle" role="group" aria-label="Revenue window selector">
            {revenueWindowOptions.map((days) => (
              <button
                key={days}
                type="button"
                className={`window-toggle-button ${revenueDays === days ? 'window-toggle-button-active' : ''}`}
                onClick={() => setRevenueDays(days)}
              >
                {days}d
              </button>
            ))}
          </div>
          <div className="metrics-grid revenue-grid">
            <MetricCard title="Revenue" value={`$${(revenue?.total_revenue ?? 0).toFixed(2)}`} />
            <MetricCard title="Paid Orders" value={revenue?.payment_count ?? 0} />
            <MetricCard title="Avg Order Value" value={`$${(revenue?.average_order_value ?? 0).toFixed(2)}`} />
            <MetricCard title="Currency" value={revenue?.currency || 'USD'} />
          </div>
          <div className="analytics-toolbar analytics-toolbar-inline">
            <button className="toolbar-button" onClick={exportRevenueCsv}>Export Revenue CSV</button>
          </div>
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Analysis ID</th>
                  <th>Amount</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {(revenue?.recent_payments || []).map((payment, idx) => (
                  <tr key={`${payment.timestamp || 'row'}-${idx}`}>
                    <td>{payment.timestamp || '-'}</td>
                    <td>{payment.analysis_id || '-'}</td>
                    <td>${(payment.amount ?? 0).toFixed(2)}</td>
                    <td>{payment.customer_email || 'N/A'}</td>
                  </tr>
                ))}
                {(revenue?.recent_payments || []).length === 0 && (
                  <tr>
                    <td colSpan={4}>No payments recorded in selected window.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="analytics-section">
          <h3>Pricing Experiment ({revenueDays} Days)</h3>
          <div className="metrics-grid revenue-grid">
            <MetricCard title="Total Views" value={priceExperiment?.totals?.results_views ?? 0} />
            <MetricCard title="Total Payments" value={priceExperiment?.totals?.payments ?? 0} subtitle={`${priceExperiment?.totals?.views_to_payment_percent ?? 0}% view-to-pay`} />
            <MetricCard title="Total Revenue" value={`$${(priceExperiment?.totals?.revenue ?? 0).toFixed(2)}`} />
            <MetricCard title="Variants" value={priceExperiment?.variants?.length ?? 0} />
          </div>
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Views</th>
                  <th>Checkouts</th>
                  <th>Payments</th>
                  <th>Revenue</th>
                  <th>View → Checkout</th>
                  <th>Checkout → Payment</th>
                  <th>View → Payment</th>
                  <th>AOV</th>
                </tr>
              </thead>
              <tbody>
                {(priceExperiment?.variants || []).map((row) => (
                  <tr key={row.variant}>
                    <td>{row.variant}</td>
                    <td>{row.results_views}</td>
                    <td>{row.checkout_started}</td>
                    <td>{row.payments}</td>
                    <td>${(row.revenue ?? 0).toFixed(2)}</td>
                    <td>{row.views_to_checkout_percent}%</td>
                    <td>{row.checkout_to_payment_percent}%</td>
                    <td>{row.views_to_payment_percent}%</td>
                    <td>${(row.avg_order_value ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
                {(priceExperiment?.variants || []).length === 0 && (
                  <tr>
                    <td colSpan={9}>No variant data yet. Start sending traffic to results pages.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="analytics-section">
          <h3>Email Signups ({revenueDays} Days)</h3>
          <div className="metrics-grid revenue-grid">
            <MetricCard title="Total Subscribers" value={emailSignups?.total_subscribers ?? 0} />
            <MetricCard
              title={`Signups (${revenueDays}d)`}
              value={emailSignups?.period_signups ?? 0}
            />
          </div>
          <div className="analytics-toolbar analytics-toolbar-inline">
            <button
              className="toolbar-button"
              onClick={handleSendReminders}
              disabled={reminderStatus?.loading}
            >
              {reminderStatus?.loading ? 'Sending...' : 'Send Reminder Emails'}
            </button>
          </div>
          {reminderStatus?.result && (
            <p className="analytics-info-msg">
              Sent {reminderStatus.result.sent} email(s).
              {reminderStatus.result.failed > 0 && ` ${reminderStatus.result.failed} failed.`}
            </p>
          )}
          {reminderStatus?.error && (
            <p className="analytics-error">{reminderStatus.error}</p>
          )}
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Signups</th>
                </tr>
              </thead>
              <tbody>
                {(emailSignups?.daily || []).map((row) => (
                  <tr key={row.date}>
                    <td>{row.date}</td>
                    <td>{row.signups}</td>
                  </tr>
                ))}
                {(emailSignups?.daily || []).length === 0 && (
                  <tr>
                    <td colSpan={2}>No signups in selected window.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="analytics-section">
          <h3>Appeal Tracker Retention ({revenueDays} Days)</h3>
          <div className="metrics-grid revenue-grid">
            <MetricCard title="Tracked Appeals" value={appealRetention?.total_trackers ?? 0} />
            <MetricCard title="Recent Updates" value={appealRetention?.recent_updates ?? 0} />
            <MetricCard title="Follow-ups Due" value={appealRetention?.follow_up_due ?? 0} />
          </div>
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(appealRetention?.statuses || {}).map(([status, count]) => (
                  <tr key={status}>
                    <td>{status}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="analytics-section">
          <h3>Revenue Trend ({revenueDays} Days)</h3>
          <RevenueLineChart series={revenue?.daily_revenue || []} />
        </section>

        <section className="analytics-section">
          <h3>Trend (7 Days)</h3>
          <SimpleLineChart series={series} />
        </section>

        <section className="analytics-section">
          <h3>Daily Breakdown (7 Days)</h3>
          <div className="analytics-table-wrap">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Views</th>
                  <th>Payments</th>
                  <th>Downloads</th>
                  <th>Views → Payment</th>
                  <th>Payment → Download</th>
                </tr>
              </thead>
              <tbody>
                {series.map((day) => (
                  <tr key={day.date}>
                    <td>{day.date}</td>
                    <td>{day.counts.results_page_viewed}</td>
                    <td>{day.counts.payment_completed}</td>
                    <td>{day.counts.pdf_downloaded}</td>
                    <td>{day.funnel.views_to_payment_percent}%</td>
                    <td>{day.funnel.payment_to_download_percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
