"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const MARKETING_ROUTES = new Set([
  "/",
  "/guides",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/affiliate-disclosure",
]);

function shouldLoadAds(pathname) {
  if (!pathname) {
    return false;
  }

  if (MARKETING_ROUTES.has(pathname)) {
    return true;
  }

  return pathname.startsWith("/guides/");
}

export default function RouteScripts({ adsenseClient, gaMeasurementId }) {
  const pathname = usePathname();
  const loadAdsense = Boolean(adsenseClient) && shouldLoadAds(pathname);

  useEffect(() => {
    if (!loadAdsense || !adsenseClient) {
      return;
    }

    if (document.getElementById("adsense-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "adsense-script";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`;
    document.head.appendChild(script);
  }, [loadAdsense, adsenseClient]);

  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script
            id="ga-loader"
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}