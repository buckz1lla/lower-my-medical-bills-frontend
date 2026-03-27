import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const showAnalyticsLink = process.env.REACT_APP_SHOW_ANALYTICS_LINK === 'true';

  return (
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
  );
}

export default Header;
