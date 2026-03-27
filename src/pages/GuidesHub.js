import React from 'react';
import { Link } from 'react-router-dom';
import { guides } from '../content/guides';
import AdSlot from '../components/AdSlot';
import './GuidesHub.css';

const HOME_SLOT = process.env.REACT_APP_ADSENSE_SLOT_GUIDES_HUB || '';

function GuidesHub() {
  return (
    <div className="guides-page">
      <section className="guides-hero">
        <p className="guides-kicker">Free Resource Library</p>
        <h2>Medical Billing & Appeal Guides</h2>
        <p>
          Practical walkthroughs for denied claims, confusing EOBs, and high medical bills.
          Each guide ends with concrete next steps.
        </p>
      </section>

      <AdSlot slot={HOME_SLOT} label="Sponsored" />

      <section className="guides-grid">
        {guides.map((guide) => (
          <article key={guide.slug} className="guide-card">
            <h3>
              <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
            </h3>
            <p>{guide.description}</p>
            <div className="guide-meta">
              <span>Updated {guide.updatedAt}</span>
              <Link to={`/guides/${guide.slug}`}>Read guide</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default GuidesHub;
