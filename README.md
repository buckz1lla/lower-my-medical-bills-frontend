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
