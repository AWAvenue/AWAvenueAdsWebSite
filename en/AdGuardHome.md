---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard Home: subscribe, update, and verify

Scope: an installed AdGuard Home 0.107.x instance with an accessible web interface, importing DNS blocklists. Official documentation, interface source, and published rules were checked on 2026-10-26. No router, NAS, Docker, or other deployment was tested. For installation, port conflicts, and container networking, start with the [official getting-started guide](https://adguard-dns.io/kb/adguard-home/getting-started/).

## Prepare and record the previous settings {#prepare}

Record the existing client DNS, router DHCP DNS, upstream resolvers, and allow rules. Try one device before changing the whole network. The web interface address is not the DNS service address: a management port such as `3000` is not the DNS query port.

Prefer a subscription from this project’s repository: select a profile in the generator and copy the official GitHub Raw URL. The built-in catalog offers an alternative that needs no pasted URL.

## Import DNS blocklists {#import}

**Prefer subscribing from this project’s repository.** It offers four profiles and follows releases in the rule repository without the additional synchronization of AdGuard’s distributed copy. The built-in catalog below is a convenient alternative; choose one method.

### Option 1: subscribe from the project repository (recommended) {#custom-list}

1. In the [subscription generator](./Sub.md), choose **AdGuard** and your preferred profile.
2. Prefer the **official GitHub Raw** URL. If access is restricted, use an alternative source while keeping the same profile. Update freshness and download speed are different; the official source is not guaranteed to download fastest on every network.
3. Open **Filters → DNS blocklists**, then choose **Add blocklist → Add a custom list**.
4. Enter a recognizable name, paste the **selected URL**, save, and wait for the download. It contains filter text and must not be entered as an upstream DNS server or replaced with Clash YAML, a Surge module, or sing-box JSON.

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/en-custom.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/en-custom.png" width="561" height="444" loading="lazy" alt="The AdGuard Home custom list form contains the AWAvenue-Ads-Rule ads-only name and subscription URL.">
  </a>
  <figcaption>This example subscribes to the ads-only profile through the official GitHub Raw source. The input only displays part of the URL; copy your actual selection from the generator. Open the image to view the original size.</figcaption>
</figure>

If you already use the built-in subscription, disable or remove it before switching to a repository URL to avoid duplicates. In particular, leaving the full list enabled retains its filtering coverage even after you add an ads-only list. Keep the same selected profile for updates, source changes, and troubleshooting; switching back to the full list is unnecessary.

### Option 2: choose the built-in list {#built-in}

1. Open **Filters → DNS blocklists**.
2. Choose **Add blocklist → Choose from the list**.
3. Under **General**, select **AWAvenue Ads Rule**, save, and wait for the download. **This is the AWAvenue-Ads-Rule project**; no URL needs to be pasted.

<details>
<summary>Show the built-in list screenshot</summary>

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/en-catalog.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/en-catalog.png" width="561" height="153" loading="lazy" alt="AWAvenue Ads Rule is checked in the AdGuard Home built-in list catalog.">
  </a>
  <figcaption>The catalog name is AWAvenue Ads Rule. Select it and save to subscribe. Open the image to view the original size.</figcaption>
</figure>

</details>

The built-in entry uses a copy of the project’s full list compiled and distributed by [AdGuard HostlistsRegistry](https://github.com/AdguardTeam/HostlistsRegistry/blob/main/assets/filters.json); see [this version’s built-in catalog](https://github.com/AdguardTeam/AdGuardHome/blob/v0.107.79/client/src/helpers/filters/filters.ts). It does not switch between the four profiles, and processing, synchronization, and counts may differ. Use the recommended method above to choose another profile or prioritize files published by the project repository.

### Check either method

After downloading, confirm that the entry is enabled, has no errors, and has a nonzero rule count. Enable **Settings → General settings → Block domains using filters and hosts files**. If per-client settings override global filtering, also check the test device's client configuration. DNS allowlists and custom exceptions affect results.

These features and labels follow the [AdGuard Home FAQ](https://adguard-dns.io/kb/adguard-home/faq/) and [official interface source](https://github.com/AdguardTeam/AdGuardHome/blob/master/client/src/__locales/en.json). Parsing, deduplication, and versions can affect counts; one exact number is not a reliable success criterion.

## Update the list {#update}

Use **Check for updates** on the DNS blocklists page. Inspect update times, rule counts, and errors, and check the filter update interval in General settings. This updates lists, not the AdGuard Home application. See the [configuration documentation](https://adguard-dns.io/kb/adguard-home/configuration/) for list settings and automatic intervals.

If downloading fails, check access to the **selected URL** from the machine running AdGuard Home and confirm that it returns rule text rather than an error page. To change sources, generate another URL for the same profile and edit the existing entry instead of adding duplicates. HTTP 200 or equal version numbers alone do not prove current content.

## Confirm that the client uses AdGuard Home {#client-dns}

Follow the official [device configuration instructions](https://adguard-dns.io/kb/adguard-home/getting-started/) to set the test device's DNS to your instance's LAN address; router DHCP can distribute it later. Check both IPv4 and IPv6. An unfiltered public “secondary DNS” may be used even when the primary server is available.

On a test computer with `nslookup`, run these commands. **Replace the example `192.168.1.2` with your AdGuard Home address.**

```sh
nslookup example.org 192.168.1.2
nslookup example.org
```

The first tests the explicit server; the second tests the default resolver path. Find both requests by time, domain, and client in **Query log**. A router shown as the default server may forward requests to AdGuard Home; use the logs to confirm. An explicit query succeeding does not prove the browser uses the same DNS. Make a normal browser request and inspect its log entries too.

If entries are missing, check that query logging is enabled and the domain is not excluded. Then inspect client DNS, DHCP leases, firewall, listen interfaces, and container port mappings. Browser Secure DNS, Android Private DNS, VPNs, or proxy-internal DoH/DoT may bypass LAN DNS. Record these settings and temporarily use system DNS on the test device to investigate, then configure them as needed. This guide does not automatically capture all encrypted DNS.

## Check a blocked request and a normal control {#verify}

Choose a domain rule present in the **currently downloaded selected list**. Querying it is sufficient; there is no need to open an advertising page:

```sh
nslookup ad.doubleclick.net 192.168.1.2
nslookup example.org 192.168.1.2
```

The ads-only list contained `ad.doubleclick.net` on the verification date; if it is removed later, use a current entry. Query log should show the first request blocked, with the matching rule and this list in its details. The second is a normal-resolution control. If another local rule blocks the control, choose a known working domain. A hit from another list or an upstream resolver does not verify this subscription; isolate other filtering layers for the test client when needed.

In the pictured desktop version, hover over the question mark in the entry's **Response** column to open **Response details**. Check the status, matching rule, and filter list. A custom subscription displays the name you entered.

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/en-hit.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/en-hit.png" width="539" height="408" loading="lazy" alt="AdGuard Home response details show Blocked, rule ||ad.doubleclick.net^, the custom AWAvenue-Ads-Rule ads-only list, and answer 0.0.0.0.">
  </a>
  <figcaption>A real hit from the repository subscription: check Blocked, the matching rule, and the custom list name “秋风广告规则 · 仅广告” together. Neither 0.0.0.0 nor NOERROR alone proves attribution. Open the image to view the original size.</figcaption>
</figure>

Screenshots were captured on 2026-10-27 using **AdGuard Home v0.107.79** in English, with mobile viewports for the forms and a desktop viewport for the hit details. An isolated local instance verified downloads through both repository and built-in subscriptions, with an attributed blocked domain and a normal-resolution control for each. Queries targeted only its loopback listener; system default DNS, routers, NAS, Docker, and other devices' DNS paths were not tested. Software interface and trademark rights belong to their respective holders.

Blocked answers can be `0.0.0.0`, `::`, `NXDOMAIN`, or `REFUSED`, depending on the blocking mode. Neither the answer alone nor a failed page proves attribution. After updating or allowing a domain, clear AdGuard Home and client DNS caches, restart relevant apps, or wait for TTL expiry. See [DNS rule syntax](https://adguard-dns.io/kb/general/dns-filtering-syntax/) and [configuration](https://adguard-dns.io/kb/adguard-home/configuration/).

## False positives and rollback {#rollback}

Disable only the new list and repeat the broken action, then re-enable it to compare. For a confirmed false positive, unblock the domain in Query log and inspect the generated exception under **Custom filtering rules**. Alternatively, add a narrow DNS exception such as `@@||needed.example^`. This placeholder must be replaced with the confirmed necessary domain; it also allows subdomains, so do not blindly allow an entire service.

Inspect DNS allowlists, DNS rewrites, other lists, and upstream blocking. A local allow rule cannot override an upstream DNS block. To revert completely, remove the subscription and exceptions added for it, restore client / DHCP DNS, renew leases, and clear caches. Avoid disabling every protection feature to hide one false positive.

DNS filtering cannot hide empty page elements or reliably separate ads sharing content domains. Cached content and direct IP connections also limit its reach. For the Android app, see [product selection](./AdGuard.md).
