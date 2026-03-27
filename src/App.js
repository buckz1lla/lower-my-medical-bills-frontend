import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import EOBAnalyzer from './pages/EOBAnalyzer';
import Results from './pages/Results';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import OwnerLogin from './pages/OwnerLogin';
import GuidesHub from './pages/GuidesHub';
import GuideArticle from './pages/GuideArticle';
import AppealTracker from './pages/AppealTracker';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Disclaimer from './pages/Disclaimer';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import './App.css';

function OwnerAnalyticsRoute({ children }) {
  const [status, setStatus] = React.useState('loading');
  const location = useLocation();

  React.useEffect(() => {
    let mounted = true;

    const verify = async () => {
      try {
        const response = await axios.get('/api/admin/me', { withCredentials: true });
        if (!mounted) {
          return;
        }
        setStatus(response.data?.authenticated ? 'allowed' : 'denied');
      } catch (error) {
        if (!mounted) {
          return;
        }
        setStatus('denied');
      }
    };

    verify();
    return () => {
      mounted = false;
    };
  }, []);

  if (status === 'loading') {
    return <p>Checking owner access...</p>;
  }

  if (status === 'denied') {
    const returnTo = encodeURIComponent(location.pathname);
    return <Navigate to={`/owner/login?returnTo=${returnTo}`} replace />;
  }

  return children;
}

function App() {
  const enableAnalyticsDashboard = process.env.REACT_APP_ENABLE_ANALYTICS_DASHBOARD === 'true';

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guides" element={<GuidesHub />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/analyzer" element={<EOBAnalyzer />} />
            <Route path="/results/:analysisId" element={<Results />} />
            <Route path="/appeal-tracker/:analysisId" element={<AppealTracker />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
            {enableAnalyticsDashboard && <Route path="/owner/login" element={<OwnerLogin />} />}
            {enableAnalyticsDashboard && (
              <Route
                path="/owner/analytics"
                element={
                  <OwnerAnalyticsRoute>
                    <AnalyticsDashboard />
                  </OwnerAnalyticsRoute>
                }
              />
            )}
            {enableAnalyticsDashboard && <Route path="/analytics" element={<Navigate to="/owner/analytics" replace />} />}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
