---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard Home: subscribe, update, and verify

Scope: an installed AdGuard Home 0.107.x instance with an accessible web interface, importing DNS blocklists. Official documentation, interface source, and published rules were checked on 2026-10-26. No router, NAS, Docker, or other deployment was tested. For installation, port conflicts, and container networking, start with the [official getting-started guide](https://adguard-dns.io/kb/adguard-home/getting-started/).

## Prepare and record the previous settings {#prepare}

Record the existing client DNS, router DHCP DNS, upstream resolvers, and allow rules. Try one device before changing the whole network. The web interface address is not the DNS service address: a management port such as `3000` is not the DNS query port.

In the [subscription generator](./Sub.md), choose **AdGuard** and your preferred profile, then copy the **selected URL**. It contains filter text and must not be entered as an upstream DNS server. Keep the same profile for updates, source changes, and troubleshooting; switching to the full list is unnecessary. The [published file example](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt) is the ads-only profile using `||domain^` rules, not Clash YAML, a Surge module, or sing-box JSON.

## Import DNS blocklists {#import}

1. Open **Filters → DNS blocklists**.
2. Choose **Add blocklist → Add a custom list**. Enter a recognizable name, such as “AWAvenue-Ads-Rule · selected profile”, paste the **selected URL**, save, and enable it.
3. Check for download errors and a nonzero rule count. Enable **Settings → General settings → Block domains using filters and hosts files**.
4. If per-client settings override global filtering, also check the test device's client configuration. DNS allowlists and custom exceptions affect results.

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

Blocked answers can be `0.0.0.0`, `::`, `NXDOMAIN`, or `REFUSED`, depending on the blocking mode. Neither the answer alone nor a failed page proves attribution. After updating or allowing a domain, clear AdGuard Home and client DNS caches, restart relevant apps, or wait for TTL expiry. See [DNS rule syntax](https://adguard-dns.io/kb/general/dns-filtering-syntax/) and [configuration](https://adguard-dns.io/kb/adguard-home/configuration/).

## False positives and rollback {#rollback}

Disable only the new list and repeat the broken action, then re-enable it to compare. For a confirmed false positive, unblock the domain in Query log and inspect the generated exception under **Custom filtering rules**. Alternatively, add a narrow DNS exception such as `@@||needed.example^`. This placeholder must be replaced with the confirmed necessary domain; it also allows subdomains, so do not blindly allow an entire service.

Inspect DNS allowlists, DNS rewrites, other lists, and upstream blocking. A local allow rule cannot override an upstream DNS block. To revert completely, remove the subscription and exceptions added for it, restore client / DHCP DNS, renew leases, and clear caches. Avoid disabling every protection feature to hide one false positive.

DNS filtering cannot hide empty page elements or reliably separate ads sharing content domains. Cached content and direct IP connections also limit its reach. For the Android app, see [product selection](./AdGuard.md).
