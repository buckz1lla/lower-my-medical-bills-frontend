import React, { useEffect } from 'react';
import './AdSlot.css';

const ADSENSE_CLIENT = (process.env.REACT_APP_ADSENSE_CLIENT || '').trim();

function ensureAdsenseScript() {
  if (!ADSENSE_CLIENT) {
    return;
  }

  const existing = document.querySelector('script[data-adsbygoogle-script="1"]');
  if (existing) {
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.dataset.adsbygoogleScript = '1';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export default function AdSlot({ slot, label = 'Sponsored' }) {
  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot) {
      return;
    }

    ensureAdsenseScript();
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      // Keep ad failures silent for user experience.
      console.log('Ad slot note:', err?.message || err);
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) {
    return null;
  }

  return (
    <div className="ad-slot-wrap" aria-label={label}>
      <div className="ad-slot-label">{label}</div>
      <ins
        className="adsbygoogle ad-slot"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
