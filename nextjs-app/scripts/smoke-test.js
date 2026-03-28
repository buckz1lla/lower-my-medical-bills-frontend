#!/usr/bin/env node
/**
 * Smoke test — verifies the production API is reachable and key endpoints
 * respond with expected status codes.
 *
 * Usage:
 *   node scripts/smoke-test.js                          # uses NEXT_PUBLIC_API_URL env var
 *   node scripts/smoke-test.js https://api.example.com  # explicit base URL
 */

const API_BASE =
  process.argv[2] ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8001";

const TIMEOUT_MS = 10_000;

const tests = [
  // API health
  { label: "API health", url: `${API_BASE}/health`, expect: [200] },

  // EOB upload endpoint exists (POST without a file → 422 Unprocessable Entity)
  { label: "EOB upload reachable", url: `${API_BASE}/api/eob/upload`, method: "POST", expect: [422] },

  // Analytics track (POST with empty body → 422)
  { label: "Analytics track reachable", url: `${API_BASE}/api/analytics/track`, method: "POST", expect: [422] },

  // Admin login (POST with no body → 422)
  { label: "Admin login reachable", url: `${API_BASE}/api/admin/login`, method: "POST", expect: [422] },

  // Admin me (no session → 401/403)
  { label: "Admin me auth guard", url: `${API_BASE}/api/admin/me`, expect: [401, 403] },

  // Analytics dashboard (no auth → 401/403)
  { label: "Analytics today auth guard", url: `${API_BASE}/api/analytics/today`, expect: [401, 403] },
];

let passed = 0;
let failed = 0;

async function runTest({ label, url, method = "GET", expect }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: method === "POST" ? { "Content-Type": "application/json" } : {},
      body: method === "POST" ? JSON.stringify({}) : undefined,
    });
    clearTimeout(timer);

    if (expect.includes(res.status)) {
      console.log(`  ✓  ${label} → ${res.status}`);
      passed++;
    } else {
      console.error(`  ✗  ${label} → ${res.status} (expected ${expect.join(" or ")})`);
      failed++;
    }
  } catch (err) {
    clearTimeout(timer);
    const reason = err.name === "AbortError" ? "timeout" : err.message;
    console.error(`  ✗  ${label} → ERROR: ${reason}`);
    failed++;
  }
}

(async () => {
  console.log(`\nSmoke tests → ${API_BASE}\n`);

  for (const test of tests) {
    await runTest(test);
  }

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
})();
