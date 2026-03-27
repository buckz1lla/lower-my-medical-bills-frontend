# lower-my-medical-bills-frontend

React frontend for Lower My Medical Bills.

## Local development

1. Copy [.env.example](.env.example) to `.env.local`.
2. Set `REACT_APP_API_URL` to your API URL (local example: `http://localhost:8001`).
3. Install and start:

```bash
npm install
npm start
```

## Production environment variables

Set these in your frontend host (for example, Vercel):

- `REACT_APP_API_URL=https://api.lowermymedicalbills.com`
- `REACT_APP_ENABLE_ANALYTICS_DASHBOARD=false`
- `REACT_APP_SHOW_ANALYTICS_LINK=false`
- `REACT_APP_ENABLE_PRICE_EXPERIMENT=false`
- `REACT_APP_PRICE_CONTROL_CENTS=299`
- `REACT_APP_PRICE_TEST_CENTS=499`
- `REACT_APP_AFFILIATE_PLANS_URL=`
- `REACT_APP_AFFILIATE_RIGHTS_URL=`
- `REACT_APP_AFFILIATE_APPEALS_GUIDE_URL=`
- `REACT_APP_AFFILIATE_COVERAGE_URL=`
- `REACT_APP_ADSENSE_CLIENT=`
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
