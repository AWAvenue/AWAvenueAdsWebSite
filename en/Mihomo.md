---
lastVerified: 2026-10-26
verificationScope: docs
---

# Mihomo guide

For clients using the Mihomo core with custom `rule-providers` support. The reference version is **Mihomo 1.19.33**. Check your client's actual core and version; older Clash cores and other engines may support different formats.

## Choose a format and plan

In the [subscription generator](./Sub.html?tool=clash), choose a tool format first, answer the plan preferences, and copy the resulting URL. Use one format only. These files are rule sets, not complete proxy subscriptions.

| Generator format | behavior | format | Instructions |
| --- | --- | --- | --- |
| [Clash / Mihomo YAML](./Sub.html?tool=clash) | `domain` | `yaml` | [Domain YAML](#yaml) |
| [Clash / Mihomo MRS](./Sub.html?tool=clashMrs) | `domain` | `mrs` | [MRS](#mrs) |
| [Clash / Mihomo Classical](./Sub.html?tool=clashClassical) | `classical` | `yaml` | [Classical YAML](#classical) |

All examples below are **configuration fragments** with **full protection** URLs. Replace `url` with the generator URL for your chosen plan and source. Keep the file content, `behavior`, and `format` consistent; changing a filename extension does not convert its format.

The full-profile snapshots checked on this date contain 972 rules in domain YAML / MRS and 976 in Classical YAML. Classical additionally includes four `DOMAIN-KEYWORD` entries. The published formats do not have identical coverage; choose Classical if you need these keyword rules. Counts may change with later releases.

## Domain YAML {#yaml}

The published file contains `payload:` with domain expressions, such as exact domains and `+.example.com`. Use `behavior: domain`.

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## MRS binary rule set {#mrs}

MRS is binary and cannot be edited as text. This project's MRS contains domain rules: use `behavior: domain` and `format: mrs`, never `behavior: classical`. Update an unsupported core or use domain YAML above.

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: mrs
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.mrs
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.mrs"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## Classical YAML {#classical}

The file contains `payload:` with typed entries such as `DOMAIN,` and `DOMAIN-SUFFIX,`. Use `behavior: classical` with `format: yaml`.

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: classical
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash-Classical.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash-Classical.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## Merge into a persistent configuration

1. Back up a working configuration. Use your client's persistent override, merge, extension, or script feature and consult its documentation. Editing a generated subscription file directly may lose changes on its next update.
2. Merge `awa_ads` into the existing `rule-providers` mapping, and insert `RULE-SET,awa_ads,REJECT` into existing `rules`. Avoid duplicate top-level keys and preserve your proxies, groups, and other rules.
3. Rules match from top to bottom. Put the entry before `MATCH` and broad `DIRECT` rules that could match first. Necessary, narrowly scoped exceptions can precede it. `REJECT` is built in; no group with that name is needed.
4. Use Rule mode, save, and reload. `path` is a unique cache path inside the core's configuration directory, which must be writable. Do not share one path across different formats.

If a command-line core is available, check the **complete merged configuration** using a separate configuration directory:

```sh
mihomo -t -d ./mihomo-check -f ./merged.yaml
```

On Windows use the actual `mihomo.exe` path. A successful syntax check does not prove the rule set downloaded or traffic matched.

## Verify downloads and matches

Find `awa_ads` in your client's or dashboard's rule-provider list. Check for a nonzero rule count, a reasonable update time, and no download or parsing errors. For YAML, inspect `payload` and version comments. For MRS, check that the core loaded it successfully; unreadable text in a browser is expected for a binary file.

Choose a domain actually present in your selected list and make a request through Mihomo's proxy entry point. Check connection records or logs for `awa_ads` and `REJECT`, and visit a normal site as a control. Missing ads or a failed page alone do not establish a match: caches, other rules, and routing through the core matter.

If it does not match, check Rule mode, the active merged configuration, rule order, application routing, and whether a domain is available for matching. These routing rules do not automatically capture DNS or traffic that bypasses Mihomo.

## Updates and rollback

`interval: 86400` requests a daily HTTP provider update while the core is running. You can also update `awa_ads` manually in the client or dashboard. Updating the main proxy subscription does not necessarily refresh rule providers immediately. Keep a working cache when downloads fail; check the URL, network, and format before deleting caches.

For a false positive, inspect the matched domain and add a narrow exception before `RULE-SET`, using an appropriate policy from your existing configuration. Avoid allowing a whole parent domain unnecessarily. To disable the set, remove or comment out `RULE-SET,awa_ads,REJECT` and reload; restore the backup if needed. Reports should include the core version, plan, domain, and relevant logs with credentials and personal data removed.

## Verification scope and sources

Official documentation and the three published file formats were checked on 2026-10-26. Core validation is described below. Client override interfaces, traffic capture on real devices, and every mirror were not individually tested.

Using the official Mihomo 1.19.33 Windows core after checking the release asset SHA-256, all three complete configurations passed `-t` in isolated directories. The published domain YAML and MRS each loaded 972 entries; Classical YAML loaded 976. For each format, a request through a temporary local proxy matched `awa_ads` → `REJECT` for one listed domain, while a normal local HTTP control passed. Separate caches and loopback listeners were used without changing system proxy or DNS settings. This does not establish testing of client merge interfaces or device traffic capture.

- [Mihomo rule-provider fields](https://wiki.metacubex.one/config/rule-providers/)
- [Rule-provider content formats](https://wiki.metacubex.one/config/rule-providers/content/)
- [Routing rules and priority](https://wiki.metacubex.one/config/rules/)
- [Official Mihomo release](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.33)
- [秋风广告规则（AWAvenue-Ads-Rule） published files](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters)
