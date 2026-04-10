"use client";

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

  return (
    <>
      {loadAdsense ? (
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
        />
      ) : null}

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