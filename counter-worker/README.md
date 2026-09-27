# Sahil Portfolio Visitor Counter

This Worker increments the portfolio counter by exactly 1 for every GET request to /api/count.

## Setup

1. Create a Cloudflare D1 database named `sahil-portfolio-counter`.
2. Copy its database ID into `wrangler.jsonc`.
3. From this folder run:
   npx wrangler d1 execute sahil-portfolio-counter --remote --file=./schema.sql
4. Deploy:
   npx wrangler deploy
5. The Worker URL will look like:
   https://sahil-portfolio-counter.<your-subdomain>.workers.dev
6. Set that URL in the portfolio JavaScript as:
   COUNTER_API_URL + "/api/count"

The database starts at 240. Each request increments it.
