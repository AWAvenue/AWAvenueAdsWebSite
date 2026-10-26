---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard: choose the product and import the list

Scope: in-app subscriptions in AdGuard for Android 4.x. Other platforms have official documentation links below. Official documentation and published files were checked on 2026-10-26; no phone or desktop client was tested. Labels and feature availability depend on the version, language, and license.

## Which AdGuard product do you use? {#choose-product}

| Product | Where to add 秋风广告规则（AWAvenue-Ads-Rule） |
| --- | --- |
| AdGuard for Android | Start with either DNS filters or custom content filters below |
| AdGuard Home (router, NAS, server) | DNS blocklists in the [separate guide](./AdGuardHome.md) |
| AdGuard for Windows / Mac | [Other platforms](#other-platforms) below; Android menus do not apply |
| AdGuard for iOS | DNS protection below; separate from Safari content blocking |
| Public AdGuard DNS | Uses service presets; selecting it as system DNS does not subscribe to this project |

Private AdGuard DNS is a separate cloud service. Your server dashboard supports user rules and custom blocklists within your plan limits. It differs from public DNS and a self-hosted AdGuard Home instance. See the [official blocklist documentation](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/).

## Keep the URL for your selected profile {#subscription}

Open the [subscription generator](./Sub.md), select AdGuard and your preferred profile, then copy the resulting URL. Every reference to the **selected URL** below means that exact link. Keep the profile when updating or changing download sources; a full-list example elsewhere must not replace it.

AdGuard files use text rules such as `||domain^`. This project blocks domains: it contains no cosmetic hiding rules and is neither a DNS server address nor a complete client configuration. Do not import Clash YAML, sing-box JSON, or a Surge module into this field. Compare the [published ads-only file](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt) with the [DNS rule syntax](https://adguard-dns.io/kb/general/dns-filtering-syntax/).

## Android: DNS filters {#android-dns}

Use this option to block domains during DNS resolution. Importing this list does not require enabling HTTPS decryption.

1. Start AdGuard protection and grant the Android VPN permission requested by the app. If another VPN is involved, read [coexistence](./Coexist.md) first.
2. Open **Protection → DNS protection** and enable DNS protection.
3. Open **DNS filters**, add a custom DNS filter, and paste the **selected URL**. Check its name, rule count, and download result; save and enable it.
4. Keep or choose your intended upstream DNS server separately. **The subscription URL belongs in the filter field, never the DNS server field.** Local filtering and upstream blocking are separate layers.

The official [DNS protection guide](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/) distinguishes servers, filters, and user rules. DNS blocking cannot remove empty page elements or reliably separate ads served from the same domain as content.

## Android: custom content filters {#android-custom}

If you already use content filtering, open **Settings → Filtering → Filters → Custom filters → Add custom filter**, paste the same **selected URL**, and enable it. This applies rules to requests processed by AdGuard content filtering, which has a different scope from DNS filtering. The imported list still contains domain rules only. See the official [settings guide](https://adguard.com/kb/adguard-for-android/features/settings/).

Start with one import location. Adding the same list to both usually adds no domain coverage and makes attribution harder. Adding this subscription alone does not require installing a certificate or enabling every protection option.

**AdGuard Replenish** in the generator is a separate supplementary list, without the four profiles; it does not replace your selected subscription. It includes non-DNS rules such as URL paths and belongs in custom content filtering. Do not expect complete operation as an AdGuard Home or DNS filter. Read the impact notes in the [current supplementary file](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Replenish.txt) before enabling it.

## Update and verify {#verify}

Run the app's filter update action. Check automatic updates under **General → App and filter updates**. Confirm that the selected list remains enabled and its update time and rule count look reasonable. A successful download does not prove that traffic uses it.

1. Open **Statistics → Recent activity**. For DNS filtering, also inspect DNS statistics or DNS request entries.
2. Visit a normal website and confirm that its requests pass through AdGuard and the site works. With no entries, check routing, app exclusions, background restrictions, and independent encrypted DNS in the browser first.
3. Pick a domain from the **currently downloaded selected list**, and issue a DNS query or request to it. There is no need to click an ad. A failed request alone proves nothing.
4. Inspect the entry: it should be blocked and attributed to this list or its matching rule. A different filter or an upstream resolver blocking it does not demonstrate a hit from this subscription.

See the official [statistics guide](https://adguard.com/kb/adguard-for-android/features/statistics/) for activity details. DNS caches, established connections, and an app's own resolver can affect repetition. Close the app, clear caches you control, or wait for TTL expiry before retrying.

## False positives and rollback {#rollback}

If login, images, or playback break, disable only the newly added list and repeat the same action; re-enable it to compare. Change one setting at a time. Once a false positive is established, create a narrowly scoped allow rule from the request details and record the domain, matching list, and broken action. DNS and content-filter exceptions are separate. Avoid allowing every domain used by the service. To undo the setup, remove the subscription, restore the previous DNS settings, and clear relevant caches.

## Windows, macOS, and iOS {#other-platforms}

These are documentation pointers, with no client testing on these systems. Add the **selected URL** to that product's DNS filters and verify using its logs; Android menus are not universal.

- **Windows**: the current [DNS protection guide](https://adguard.com/kb/adguard-for-windows/protection/dns-protection/) covers imported DNS filters and user rules. Old and new versions have different layouts.
- **macOS**: use [DNS → Filters](https://adguard.com/kb/adguard-for-mac/features/dns/), separate from Safari extension filters.
- **iOS / iPadOS**: [DNS protection](https://adguard.com/kb/adguard-for-ios/features/dns-protection/) has DNS filtering / DNS filters, subject to version and license. Safari protection has a different scope and only blocks content in Safari.

Original guide: [天命 (Tianming)](https://t.me/tmbyml). Revised by the 秋风广告规则 website maintainers on 2026-10-26. Completing this guide no longer depends on the old videos.
