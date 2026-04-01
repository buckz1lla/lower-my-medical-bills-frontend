# lower-my-medical-bills-frontend

Next.js frontend for Lower My Medical Bills. Deployed on Vercel with Root Directory set to `nextjs-app/`.

## Local development

```bash
cd nextjs-app
cp ../.env.example .env.local   # then fill in values
npm install
npm run dev                     # http://localhost:3000
```

## Production environment variables (Vercel)

Set these under **Settings → Environment Variables**:

| Variable | Example value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.lowermymedicalbills.com` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS_DASHBOARD` | `false` |
| `NEXT_PUBLIC_SHOW_PARSER_DEBUG` | `false` |
| `NEXT_PUBLIC_ENABLE_PRICE_EXPERIMENT` | `false` |
| `NEXT_PUBLIC_PRICE_CONTROL_CENTS` | `299` |
| `NEXT_PUBLIC_PRICE_TEST_CENTS` | `499` |
| `NEXT_PUBLIC_AFFILIATE_PLANS_URL` | *(your link)* |
| `NEXT_PUBLIC_AFFILIATE_RIGHTS_URL` | *(your link)* |
| `NEXT_PUBLIC_AFFILIATE_APPEALS_GUIDE_URL` | *(your link)* |
| `NEXT_PUBLIC_AFFILIATE_COVERAGE_URL` | *(your link)* |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | *(your AdSense ID)* |

## Smoke test

After deploying, validate the API from the `nextjs-app/` directory:

```bash
node scripts/smoke-test.js https://api.lowermymedicalbills.com
```

Keep affiliate and AdSense values empty until accounts are approved.

## Custom domain (Vercel)

**Vercel dashboard → your project → Settings → Domains → Add domain**

Add both `lowermymedicalbills.com` and `www.lowermymedicalbills.com`. Vercel will show you the exact records to create.

Typical DNS records at your registrar:

| Type | Name | Value | Purpose |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | Apex → Vercel |
| `CNAME` | `www` | `cname.vercel-dns.com` | www → Vercel |
| `CNAME` | `api` | *(your API host)* | API subdomain |

After DNS propagates (up to 48h, usually <1h):

1. Confirm `https://lowermymedicalbills.com` loads the site.
2. Confirm `https://api.lowermymedicalbills.com/health` returns `{"status":"ok"}`.
3. Run the smoke test above.
4. Do a full upload → results → checkout flow end-to-end.

## Analytics event dictionary

Frontend events are sent to `POST /api/analytics/track`.

### Core funnel events

| Event | Trigger | Key fields in `data` | Source file |
|---|---|---|---|
| `upload_started` | User submits file on analyzer page | `file_name`, `file_type`, `file_size` | `nextjs-app/src/app/analyzer/page.js` |
| `upload_completed` | Upload API returns `analysis_id` | `analysisId`, `file_name`, `file_type` | `nextjs-app/src/app/analyzer/page.js` |
| `results_viewed` | Results page loads successfully | `analysisId`, `price_variant`, `price_amount_cents`, `total_savings`, `opportunities_found` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `checkout_started` | User clicks paid toolkit checkout | `analysisId`, `price_variant`, `amount_cents` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `toolkit_unlocked` | Paid/unlocked state is reached on results page | `analysisId`, `payment_status`, `price_variant`, `amount_cents` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `appeal_tracker_opened` | Appeal tracker page is loaded | `analysisId` | `nextjs-app/src/app/appeal-tracker/[analysisId]/page.js` |

### Engagement and quality events

| Event | Trigger | Key fields in `data` | Source file |
|---|---|---|---|
| `guide_click` | User clicks tracked guide links | `href`, `source`, optional `slug` | `nextjs-app/src/components/TrackedLink.js` |
| `verification_details_viewed` | User expands opportunity details | `analysisId`, `opportunity_id`, `opportunity_type`, `confidence_level` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `pdf_downloaded` | User downloads generated PDF package | `analysisId`, `hasTemplates`, `opportunitiesCount` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `email_subscribed` | User submits reminder email | `analysisId`, `savings_amount` | `nextjs-app/src/app/results/[analysisId]/page.js` |
| `affiliate_link_clicked` | User clicks contextual affiliate/resource link | `affiliate`, `analysisId` | `nextjs-app/src/app/results/[analysisId]/page.js` |

### Legacy aliases still emitted

These remain in place for dashboard continuity while queries migrate to canonical names above:

- `results_page_viewed` (alias of `results_viewed`)
- `appeal_tracker_viewed` (alias of `appeal_tracker_opened`)

### Instrumentation notes

- Keep event names stable once used in dashboards.
- If a new event is added, update this section in the same PR.
- Include `analysisId` whenever the event is tied to a specific uploaded case.
