import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdSlot from '../components/AdSlot';
import { findGuideBySlug } from '../content/guides';
import { getAffiliateLink } from '../utils/affiliateLinks';
import './GuideArticle.css';

const INLINE_SLOT = process.env.REACT_APP_ADSENSE_SLOT_GUIDE_INLINE || '';

function GuideArticle() {
  const { slug } = useParams();
  const guide = useMemo(() => findGuideBySlug(slug), [slug]);

  const appealsLink = useMemo(() => getAffiliateLink('appealsGuide', 'guide-article'), []);
  const plansLink = useMemo(() => getAffiliateLink('plans', 'guide-article'), []);

  if (!guide) {
    return (
      <div className="guide-article-page">
        <h2>Guide not found</h2>
        <p>This article may have moved. Browse all current guides below.</p>
        <Link to="/guides" className="guide-back-link">Browse all guides</Link>
      </div>
    );
  }

  return (
    <article className="guide-article-page">
      <Link to="/guides" className="guide-back-link">← Back to all guides</Link>
      <header className="guide-header">
        <h2>{guide.title}</h2>
        <p>{guide.description}</p>
        <span>Updated {guide.updatedAt}</span>
      </header>

      {guide.sections.map((section, idx) => (
        <section className="guide-section" key={`${guide.slug}-${idx}`}>
          <h3>{section.heading}</h3>
          <p>{section.body}</p>
          {idx === 1 && <AdSlot slot={INLINE_SLOT} label="Sponsored" />}
        </section>
      ))}

      <section className="guide-cta-box">
        <h3>Ready to apply this to your own bill?</h3>
        <p>Upload your EOB and get claim-by-claim savings opportunities with an appeal plan.</p>
        <Link to="/analyzer" className="guide-primary-cta">Analyze My EOB</Link>
      </section>

      <section className="guide-cta-box guide-cta-box-secondary">
        <h3>Need outside help?</h3>
        <p>Use official resources and vetted marketplaces to compare options and escalate appeals.</p>
        <div className="guide-link-row">
          <a href={appealsLink.url} target="_blank" rel="noreferrer">Appeals Guide</a>
          <a href={plansLink.url} target="_blank" rel="noreferrer">Compare Plan Options</a>
        </div>
      </section>

      <section className="guide-faq">
        <h3>FAQ</h3>
        {guide.faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
    </article>
  );
}

export default GuideArticle;
