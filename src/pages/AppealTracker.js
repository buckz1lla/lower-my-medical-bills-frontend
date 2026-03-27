import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './AppealTracker.css';

const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not started' },
  { value: 'drafting', label: 'Drafting appeal' },
  { value: 'filed', label: 'Filed with insurer' },
  { value: 'insurer_review', label: 'Insurer reviewing' },
  { value: 'needs_documents', label: 'Needs more documents' },
  { value: 'approved', label: 'Approved' },
  { value: 'denied', label: 'Denied' },
];

function AppealTracker() {
  const { analysisId } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('not_started');
  const [note, setNote] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [message, setMessage] = useState('');

  const loadTracker = useCallback(async () => {
    setLoading(true);
    try {
      const [trackerRes] = await Promise.all([
        axios.get(`/api/appeals/tracker/${analysisId}`),
        axios.post('/api/analytics/track', {
          event: 'appeal_tracker_viewed',
          data: { analysisId },
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      ]);

      const tracker = trackerRes.data || {};
      setStatus(tracker.status || 'not_started');
      setNote(tracker.note || '');
      setNextFollowUpDate(tracker.next_follow_up_date || '');
      setUpdatedAt(tracker.updated_at || '');
    } catch (err) {
      setMessage('Could not load your tracker yet. You can still save a new status below.');
    } finally {
      setLoading(false);
    }
  }, [analysisId]);

  useEffect(() => {
    loadTracker();
  }, [loadTracker]);

  const onSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        analysis_id: analysisId,
        status,
        note,
        next_follow_up_date: nextFollowUpDate || null,
      };
      const res = await axios.post('/api/appeals/tracker/update', payload);
      const tracker = res.data?.tracker || {};
      setUpdatedAt(tracker.updated_at || '');
      setNextFollowUpDate(tracker.next_follow_up_date || nextFollowUpDate || '');

      await axios.post('/api/analytics/track', {
        event: 'appeal_tracker_updated',
        data: { analysisId, status },
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      setMessage('Saved. Nice progress. Keep the momentum this week.');
    } catch (err) {
      const detail = err.response?.data?.detail || 'Save failed. Please try again.';
      setMessage(detail);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="appeal-tracker-page">
      <div className="appeal-tracker-header">
        <p className="appeal-kicker">Return Visit Loop</p>
        <h2>Track My Appeal</h2>
        <p>Keep your dispute moving. Update status, set your next follow-up date, and return with one click.</p>
      </div>

      <div className="appeal-tracker-card">
        <div className="appeal-row">
          <label htmlFor="appeal-status">Appeal status</label>
          <select
            id="appeal-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={loading || saving}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="appeal-row">
          <label htmlFor="appeal-note">Latest note</label>
          <textarea
            id="appeal-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={loading || saving}
            placeholder="Who you called, what they said, and what to do next..."
            rows={4}
          />
        </div>

        <div className="appeal-row">
          <label htmlFor="appeal-followup">Next follow-up date</label>
          <input
            id="appeal-followup"
            type="date"
            value={nextFollowUpDate}
            onChange={(e) => setNextFollowUpDate(e.target.value)}
            disabled={loading || saving}
          />
        </div>

        <div className="appeal-actions">
          <button onClick={onSave} disabled={loading || saving}>
            {saving ? 'Saving...' : 'Save Progress'}
          </button>
          <Link to={`/results/${analysisId}`} className="appeal-back-link">Back to results</Link>
        </div>

        {updatedAt && <p className="appeal-meta">Last saved: {new Date(updatedAt).toLocaleString()}</p>}
        {message && <p className="appeal-message">{message}</p>}
      </div>
    </div>
  );
}

export default AppealTracker;
