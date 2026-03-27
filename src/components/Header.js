import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const showAnalyticsLink = process.env.REACT_APP_SHOW_ANALYTICS_LINK === 'true';

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h1>💰 Lower My Medical Bills</h1>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/guides">Guides</Link>
            {showAnalyticsLink && <Link to="/owner/analytics">Analytics</Link>}
            <Link to="/analyzer" className="nav-link-primary">Check My EOB</Link>
          </nav>
        </div>
      </header>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <p>&copy; 2026 Lower My Medical Bills. All rights reserved.</p>
            <nav className="footer-nav">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Use</Link>
              <span className="separator">•</span>
              <Link to="/disclaimer">Disclaimer</Link>
              <span className="separator">•</span>
              <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Header;
