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
| `NEXT_PUBLIC_SHOW_ANALYTICS_LINK` | `false` |
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
- `REACT_APP_ADSENSE_SLOT_HOME_TOP=`
- `REACT_APP_ADSENSE_SLOT_GUIDES_HUB=`
- `REACT_APP_ADSENSE_SLOT_GUIDE_INLINE=`

Keep affiliate and AdSense values empty until accounts are approved.

## Domain and DNS checklist

Recommended domain layout:

- Frontend: `lowermymedicalbills.com`
- API: `api.lowermymedicalbills.com`

Typical records (exact values come from your host dashboards):

| Type | Name | Value | Purpose |
| --- | --- | --- | --- |
| CNAME | `www` | `cname.vercel-dns.com` | Frontend on Vercel |
| A or CNAME (flattened) | `@` | Vercel-provided value | Apex/root domain |
| CNAME | `api` | your API host target | API subdomain |

After DNS propagates:

1. Verify `https://lowermymedicalbills.com` loads.
2. Verify `https://api.lowermymedicalbills.com/health` returns healthy.
3. Verify upload -> results flow works end to end.
