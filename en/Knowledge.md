---
lastVerified: 2026-10-26
verificationScope: docs
---

# Tutorial overview

Choose your tool and plan in the [subscription generator](./Sub.md), then follow the matching guide. 秋风广告规则（AWAvenue-Ads-Rule） filters domains; it cannot precisely separate ads from normal content on the same domain. Rule sets, modules, scripts, and complete configurations require different import interfaces.

Each guide states its coverage; documentation checks do not establish testing of every client, version, or mirror.

## Choose a client

- [AdGuard](./AdGuard.md): product selection, Android import steps, and DNS filtering references for other platforms.

- [AdGuard Home](./AdGuardHome.md): DNS filtering on a router or server; blocklists, query logs, updates, and rollback.

- [Android coexistence](./Coexist.md): local VPN conflicts and connection options when filtering and a proxy run together.

- [Mihomo](./Mihomo.md): Mihomo-based clients using [domain YAML](./Mihomo.md#yaml), [MRS](./Mihomo.md#mrs), or [Classical YAML](./Mihomo.md#classical).

- [sing-box](./SingBox.md): 1.14.x source JSON rule sets and DNS rejection.

- [Quantumult X](./QuantumultX.md): remote `.list` filtering rules.

- [Shadowrocket](./ShadowRocket.md): `.module` import and a RULE-SET alternative.

- [Loon](./Loon.md): `.module` plugin and a rule-set alternative.

- [Surge](./Surge.md): RULE-SET, DOMAIN-SET, and modules; check Surfboard compatibility separately.

- [MosDNS v5](./MosDNS.md): `domain_set`, updates, and DNS checks.

Hosted AdGuard DNS and self-hosted AdGuard Home are separate products. Consult the [AdGuard DNS documentation](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/) for its list selection and plan capabilities instead of applying self-hosted instructions directly.

## Other generator formats

These formats have published files. The notes below identify their purpose and official references; **complete installation, update, and device-testing guides are not yet available here**. Back up settings and check tool versions before changing DNS, router configuration, or modules. These files should not overwrite a complete configuration or be imported as proxy subscriptions.

### hosts / AdAway {#hosts}

`AWAvenue-Ads-Rule-hosts*.txt` contains `IP domain` hosts mappings for tools that accept hosts sources. It does not express subdomain wildcards. See the [official AdAway project](https://github.com/AdAway/AdAway). Direct replacement of system hosts is outside this guide.

### Dnsmasq {#dnsmasq}

`AWAvenue-Ads-Rule-Dnsmasq*.conf` contains `address=/domain/#` directives: configuration fragments to merge or include, not plain domain lists. Loading, syntax checks, and restart procedures depend on your distribution or router plugin. See the [Dnsmasq manual](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html).

### SmartDNS {#smartdns}

`AWAvenue-Ads-Rule-SmartDNS*.conf` contains `address /…/#` directives. It is not the plain domain-per-line input required by `domain-set`. See the [SmartDNS configuration documentation](https://pymumu.github.io/smartdns/config/). Specific versions and loading procedures have not been tested here.

### RouterOS AdList {#routeros-adlist}

`AWAvenue-Ads-Rule-RouterOS-Adlist*.txt` is a hosts-style DNS Adlist source. Check that your RouterOS version supports Adlist and review memory, updating, and DNS service configuration in the [MikroTik DNS documentation](https://help.mikrotik.com/docs/spaces/ROS/pages/37748767/DNS). This is different from the script below.

### RouterOS Script {#routeros-script}

`AWAvenue-Ads-Rule-RouterOS*.txt` contains `ip dns static add` commands that add static DNS entries. It is script text, not Adlist input. Repeated imports, removal of old entries, transactional updates, and rollback have not been verified here, so no one-step execution procedure is provided. See the [official RouterOS documentation](https://manual.mikrotik.com/docs/).

### AdClose {#adclose}

`AWAvenue-Ads-Rule-AdClose*.rule` contains AdClose-specific entries such as `domain, …`. Use it only with the corresponding tool. Module versions, permissions, and import steps are not covered; see the [AdClose release page](https://github.com/Xposed-Modules-Repo/com.close.hook.ads).

### Geosite source text {#geosite}

`AWAvenue-Ads-Rule-Geosite*.txt` contains bare domains and source entries such as `full:`. It is **not a compiled `geosite.dat`** or sing-box JSON. A compatible build process must process it. Compilation, category naming, and client loading are not covered here; see [v2fly/domain-list-community](https://github.com/v2fly/domain-list-community).

### AdGuard Replenish {#adguard-replenish}

`AWAvenue-Ads-Rule-Replenish.txt` is a separate supplementary AdGuard filter without four-plan variants. Check whether you need its additional filtering and use the appropriate [AdGuard custom filter interface](./AdGuard.md#android-custom). It is not the full DNS list; entries containing URL paths or other non-DNS syntax cannot work fully as an AdGuard Home DNS blocklist. Its current filtering behavior has not been tested here.

### Plain domain lists {#dns}

Plain domain lists generally have one domain per line, but exact, suffix, and subdomain matching depend on the loading tool. MosDNS, Geosite, hosts, and `.conf` files use distinct syntax; similar extensions do not make them interchangeable.

These format notes were checked against the [published project files](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters). Full guides still require separate version, download, matching, and rollback verification.

## Common questions

### Why do some ads remain?

Domain filtering cannot always separate ads sharing a domain with normal content. App-specific encrypted DNS, caches, and bypassed filtering paths can also affect results. Check query or connection logs to establish whether the request passed through your tool and which rule matched. Installing a root certificate is not a general activation step for this list and does not add page-element filtering to domain rules.

### What if a normal feature appears to be blocked?

Temporarily disable this list, repeat the same action, and inspect logs. If the relationship is confirmed, allow only the required domain and retest. Historical reports include `a0.app.xiaomi.com` in [Xiaomi Cloud Backup #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38) and `shouji.sougou.com` in [Sogou cross-screen input #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45). These are historical examples, not universal allowlist recommendations.

Earlier documentation also listed domains related to CHANGHONG TV updates, stores, casting, and payments. Device, firmware, and plan differences mean basic functionality cannot be guaranteed unaffected. Investigate current logs individually instead of allowing an entire historical list.

### Should I replace a third-party module after an update breaks networking?

A network failure alone cannot identify a module script, port conflict, DNS, upstream, or rule as the cause. Undo the recent change and restore a working configuration, then consult that tool's logs and maintenance notes. This site does not continuously validate third-party Magisk modules and offers no default replacement recommendation. See [Android coexistence](./Coexist.md) for related conflicts.
