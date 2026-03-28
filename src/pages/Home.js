import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import AdSlot from '../components/AdSlot';

const HOME_AD_SLOT = process.env.REACT_APP_ADSENSE_SLOT_HOME_TOP || '';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Take Control of Your Medical Bills</h1>
        <p>Understand what you're paying for and discover potential savings opportunities</p>
        <Link to="/analyzer" className="cta-button">Start Analyzing Your EOB</Link>
      </section>

      <AdSlot slot={HOME_AD_SLOT} label="Sponsored" />

      <section className="features">
        <h3>What We Help You With</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h4>Check My EOB</h4>
            <p>Upload your Explanation of Benefits and get instant insights into potential billing errors and savings opportunities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h4>Understand Your Coverage</h4>
            <p>Learn about in-network vs out-of-network claims, deductibles, and how your plan works for you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h4>Appeal Support</h4>
            <p>Get guidance on appealing denied claims with step-by-step instructions and success probability estimates.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h4>Identify Savings</h4>
            <p>Discover billing errors, duplicate charges, and other issues where you might save money.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h3>How It Works</h3>
        <ol className="steps">
          <li>
            <span className="step-number">1</span>
            <div className="step-content">
              <h4>Upload Your EOB</h4>
              <p>Simply upload your Explanation of Benefits (PDF, image, or spreadsheet)</p>
            </div>
          </li>
          <li>
            <span className="step-number">2</span>
            <div className="step-content">
              <h4>We Analyze</h4>
              <p>Our system examines every claim for errors, billing issues, and savings opportunities</p>
            </div>
          </li>
          <li>
            <span className="step-number">3</span>
            <div className="step-content">
              <h4>Get Results</h4>
              <p>Receive a detailed report with prioritized actions you can take</p>
            </div>
          </li>
          <li>
            <span className="step-number">4</span>
            <div className="step-content">
              <h4>Take Action</h4>
              <p>Follow our recommendations to appeal claims and recover money</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="resource-section">
        <div className="resource-header">
          <h3>Learn Before You Call Billing</h3>
          <Link to="/guides" className="resource-link">See all guides</Link>
        </div>
        <div className="resource-grid">
          <Link to="/guides/how-to-appeal-a-denied-insurance-claim" className="resource-card">
            <h4>How to Appeal a Denied Insurance Claim</h4>
            <p>Use a 7-step framework to file a stronger appeal and avoid common denial traps.</p>
          </Link>
          <Link to="/guides/what-is-an-eob-and-how-to-read-it" className="resource-card">
            <h4>What Is an EOB and How to Read It</h4>
            <p>Decode claim lines fast so you can spot errors and avoid paying the wrong amount.</p>
          </Link>
          <Link to="/guides/medical-bill-too-high-what-to-do" className="resource-card">
            <h4>Medical Bill Too High? What to Do First</h4>
            <p>Follow a first-48-hours checklist that protects leverage and keeps appeals viable.</p>
          </Link>
        </div>
      </section>

      <section className="trust-section">
        <h2>Your Privacy &amp; Security</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h3>Secure Uploads</h3>
            <p>Files are transmitted over encrypted HTTPS and are not stored after analysis is complete.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">🚫</div>
            <h3>No Account Required</h3>
            <p>Analyze your EOB without creating an account or sharing personal health information.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">📋</div>
            <h3>Plain-English Results</h3>
            <p>We translate insurance jargon into clear action steps you can use today.</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>What is an Explanation of Benefits (EOB)?</summary>
            <p>An EOB is a statement from your insurance company showing what was billed, what the plan paid, and what you owe. It is not a bill itself, but it tells you how your claim was processed.</p>
          </details>
          <details className="faq-item">
            <summary>What types of billing errors are most common?</summary>
            <p>Common errors include duplicate charges, upcoding (billing for a more expensive service than was provided), unbundling (splitting one procedure into multiple charges), and out-of-network billing for in-network providers.</p>
          </details>
          <details className="faq-item">
            <summary>Does this work for hospital bills, not just insurance EOBs?</summary>
            <p>Our tool is optimized for EOB documents from your insurer. Itemized hospital bills in CSV format also work. We are adding direct hospital bill support soon.</p>
          </details>
          <details className="faq-item">
            <summary>Is my medical information safe when I upload?</summary>
            <p>Yes. Files are sent over encrypted HTTPS, analyzed in memory, and not retained on our servers after processing. We do not sell or share your data.</p>
          </details>
          <details className="faq-item">
            <summary>What if my claim was denied — can I appeal?</summary>
            <p>Yes. If we detect a denied claim on your EOB, we highlight it and can generate a customized appeal letter template you can submit to your insurer.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

export default Home;
