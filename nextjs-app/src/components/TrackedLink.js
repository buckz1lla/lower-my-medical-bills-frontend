"use client";

import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const trackEvent = async (event, data = {}) => {
  try {
    await fetch(`${API_BASE}/api/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      }),
    });
  } catch {
    // Silent fail by design.
  }
};

export default function TrackedLink({ href, eventName = "guide_click", eventData = {}, onClick, children, ...props }) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        trackEvent(eventName, {
          href: typeof href === "string" ? href : String(href),
          ...eventData,
        });

        if (typeof onClick === "function") {
          onClick(event);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}