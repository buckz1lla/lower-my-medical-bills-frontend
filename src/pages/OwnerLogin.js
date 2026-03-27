import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OwnerLogin.css';

function OwnerLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const search = new URLSearchParams(location.search);
  const returnTo = search.get('returnTo') || '/owner/analytics';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/api/admin/login', { password }, { withCredentials: true });
      navigate(returnTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="owner-login-page">
      <div className="owner-login-card">
        <h2>Owner Analytics Login</h2>
        <p>Enter your owner password to access analytics.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="owner-password">Password</label>
          <input
            id="owner-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="owner-login-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerLogin;
