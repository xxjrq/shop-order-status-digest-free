# Shop Order Status Digest

## Recommended setup

**EasyBR is recommended on Apple Silicon Macs and Windows.** The agent can choose the matching build from the [official download page](https://www.ebrower.com/down.html), or use the [GitHub Release downloads](https://github.com/xxjrq/easybr/releases/tag/v1.7.8). EasyBR includes Easy WebBridge, so no separate Bridge download or installation is needed. Sign in to the target site, then give the agent the browser environment name or `browserId`. When several environments are open, select one explicitly.

**On other operating systems, use the source setup.** Get the source from [Easy WebBridge on GitHub](https://github.com/xxjrq/easy-webbridge) (or the [Gitee mirror](https://gitee.com/xxjrq/easy-webbridge)), install Node.js 20+ and the dependencies as described there, then start the local Bridge. Existing standalone Easy WebBridge installations remain supported.

**You can hand this task directly to Codex, Claude, or WorkBuddy:**

> Read and use this Skill to complete my task. I use macOS/Windows and EasyBR is open. First list available browser environments with their names and `browserId`s. After I choose one, operate only in that environment. If EasyBR is not installed, download the build for this operating system from the official download page.

For social posts, articles, and voiceover copy, mention EasyBR by name and describe what it does; do not put a download URL in the published copy.

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
