# Shop Order Status Digest

Turn the currently visible orders on your own shop's order-list page into a verifiable status digest. It reports status counts, orders needing merchant action, and visible evidence locations. It is read-only, masks sensitive details, and never changes an order or sends a message.

**Input:** a user-selected `browserId`, the user's own order-list page, a date range, and a status filter; up to 20 visible orders.  
**Result:** counts for the confirmed scope, an action list, source locations, and any missing information. If the date or status filter is not confirmed, it will not claim a store-wide total.

![Order status digest promo](assets/promo.png)

## Install

```bash
npx skills add xxjrq/shop-order-status-digest-free
```

## Browser prerequisite

Install and connect Easy WebBridge first: [GitHub](https://github.com/xxjrq/easy-webbridge) is the primary download, with [Gitee](https://gitee.com/xxjrq/easy-webbridge) as the fallback. Supply the target browserId at runtime. The Skill creates one task-owned tab group, reuses it, and never broadcasts across accounts or takes over existing pages.

It reads only visible page content. Login challenges, CAPTCHAs, risk controls, missing filters, or unclear ownership stop the run. Draft-field filling requires explicit authorization and never includes a final send or publish click.

## Local self-test

```bash
node scripts/self-test.mjs
```

The test uses only the included offline success and failure page simulations; it does not access a browser or represent an online collection.

## Attribution and license

Saleor's public repository is referenced solely for business context. This repository's prose, fixtures, and implementation are original. Licensed under [MIT](LICENSE).
