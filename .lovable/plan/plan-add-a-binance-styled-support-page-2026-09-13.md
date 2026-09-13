# Plan: Add a Binance-styled support page

## Goal
Give Binance support sites the same polished, dedicated layout that already exists for PayPal, WSE and Coinbase, so visiting a Binance support link renders a full branded page instead of the generic fallback.

## What will be built
1. A new `src/components/BinanceSupportLayout.tsx` component styled in Binance's yellow/black visual language: sticky nav, hero search, topic cards, popular articles, FAQ accordions, trust band, footer, and a floating bottom-right contact button.
2. The contact CTA buttons will use the site's configured contact method/value, just like the existing layouts.
3. Wire the layout into `src/routes/site.$siteId.tsx` so `platformId === "binance"` renders `BinanceSupportLayout`.

## Out of scope
- No changes to data models, auth, or admin dashboard.
- No new platforms or contact methods.
- No changes to the generic fallback for other platforms.

## Verification
- Typecheck/build passes.
- Visit a saved Binance support link and confirm the branded page loads with the floating contact button.
