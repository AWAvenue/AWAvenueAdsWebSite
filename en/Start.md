---
pageClass: start-page
---

# 🧭 Quick Start

Welcome to AWAvenue Ads Rule. This page helps you decide whether it fits your setup and builds the right subscription through three choices.

<div class="start-hero-actions">
  <a class="start-primary-action" href="/en/Sub.html">Build my subscription</a>
  <a class="start-secondary-action" href="#choose-your-tool">Choose a tool</a>
</div>

::: tip Finish in three steps

1. Choose the tool or format that will import the rules.
2. Decide whether to block privacy telemetry and unwanted network behavior.
3. Copy a subscription from a mainland mirror, the official source, or a fallback route.

:::

## Choose your tool

Already know what you use? Open its subscription questionnaire directly. Your choice carries over to the next page.

<div class="start-tool-grid">
  <a href="/en/Sub.html?tool=adguard"><strong>AdGuard</strong><span>AdGuard, AdGuard Home, and AdGuard DNS</span></a>
  <a href="/en/Sub.html?tool=clashClassical"><strong>Clash / Mihomo</strong><span>Start with the recommended Classical format</span></a>
  <a href="/en/Sub.html?tool=quantumultX"><strong>Quantumult X</strong><span>A rule list made for Quantumult X</span></a>
  <a href="/en/Sub.html?tool=shadowrocket"><strong>Shadowrocket</strong><span>The module format for Shadowrocket</span></a>
  <a href="/en/Sub.html?tool=loon"><strong>Loon</strong><span>The module format for Loon</span></a>
  <a href="/en/Sub.html"><strong>Other tools and formats</strong><span>hosts, MosDNS, RouterOS, Surge, sing-box, and more</span></a>
</div>

::: details Have not chosen a tool yet?

- For direct use on a phone or computer, start by learning about AdGuard.
- If you already use a proxy client, choose a format supported by that client.
- For network-wide filtering, look at AdGuard Home, MosDNS, Dnsmasq, or RouterOS.
- To modify the system hosts file, choose the hosts / AdAway format.

AWAvenue Ads Rule is not designed for accessibility auto-click tools or browser extensions such as AdGuard for Chrome.

:::

## Current release and visit counter

<StartStatus />

## What can AWAvenue Ads Rule do?

AWAvenue Ads Rule blocks advertising and related requests at the network layer. It does not require click rules for every app, and it balances hit rate, list size, and hardware overhead across many filtering tools.

| It can help with | It cannot guarantee |
|---|---|
| Ad delivery, bidding, creative, and attribution requests | Ads served from the same domain as normal content |
| Analytics, telemetry, crash reporting, and device fingerprinting | Removing empty spaces left in an app interface |
| Forced updates, P2P/PCDN, push, and remote configuration | Rewards that require watching an advertisement |
| Network-wide filtering across devices and routers | Every advertisement in every app and region |

## Four subscription profiles

The builder asks two plain-language questions instead of making you memorize technical filenames:

| Display name | Included content | Best for |
|---|---|---|
| Full protection | Ads + privacy + unwanted | The complete default experience |
| Ads only | Advertising only | Compatibility and minimal intervention |
| Ads + unwanted | No privacy category | Keeping analytics and telemetry |
| Ads + privacy | No unwanted category | Keeping updates, push, and related connections |

## Before you subscribe

1. AWAvenue Ads Rule does not account for rewards that require watching ads.
2. Network filtering cannot remove interface elements, so some apps may leave empty spaces.
3. Privacy or unwanted categories may affect a few analytics, update, or push features; the builder lets you choose.
4. No filter list covers every advertising domain. False positives are especially important to report quickly.

::: warning Before subscribing

Read the [User Protocol](./Protocol.md) and [Usage Guide](./Knowledge.md). Results for AdGuard, Quantumult X, Shadowrocket, and Loon also link to their specific guides.

:::

## Why network-layer filtering?

| Feature | Network filtering | Accessibility clicking | Xposed Hook |
|---|---|---|---|
| Cross-platform and router use | Supported | Mainly Android | Mainly Android |
| Whether ad assets still download | Usually no | Usually yes | Depends on implementation |
| Setup difficulty | Lower | Lowest | Higher, usually requires root |
| Ongoing app adaptation | Lower | Must follow interface changes | Must follow code changes |

These methods solve different problems and can be combined, but a filter subscription cannot be imported directly into an accessibility auto-click tool.

## Need help?

- Missed ads, false positives, or rule requests: open a [GitHub Issue](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues).
- Subscription links, tool usage, or community discussion: visit [Support](./Support.md).
- Ready to begin: open the [interactive subscription builder](./Sub.md).
