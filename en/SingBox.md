# sing-box guide

Applies to **sing-box 1.14.x**. Documentation checked: **2026-10-26**. This example uses the current HTTP client and DNS action formats; check the core version bundled with your graphical client before using it.

## Get your chosen profile

Select sing-box and your blocking preferences in the [generator](./Sub.html?tool=singbox). Copy the `.json` URL. This file is a **source-format rule set**, not a complete proxy configuration.

## Merge the configuration

This fragment uses the full profile. Replace `url` with your generated URL for another profile. Merge the array entries into your existing configuration, preserve its DNS/upstream/inbound/proxy settings, and define each tag only once.

```json
{
  "http_clients": [
    {
      "tag": "awa-download",
      "domain_resolver": "awa-bootstrap"
    }
  ],
  "dns": {
    "servers": [
      {
        "type": "local",
        "tag": "awa-bootstrap"
      }
    ],
    "rules": [
      {
        "rule_set": "awa-ads",
        "action": "reject",
        "no_drop": true
      }
    ]
  },
  "route": {
    "rule_set": [
      {
        "type": "remote",
        "tag": "awa-ads",
        "format": "source",
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.json",
        "http_client": "awa-download",
        "update_interval": "1d"
      }
    ]
  }
}
```

- Place the rejection rule before broad DNS rules that would otherwise handle the query. Intentional allow exceptions may precede it.
- Append `awa-bootstrap` to your existing DNS servers. It uses the system resolver for rule downloads; retain your normal DNS upstream. Avoid pointing system DNS back to the same sing-box instance before it has started.
- Only queries reaching **sing-box's DNS module** are filtered here. Keep your existing DNS capture setup. Application DoH, cached answers, or direct IP connections can bypass this path. For connection-level filtering, an optional `{"rule_set":"awa-ads","action":"reject"}` entry in your existing `route.rules` also needs a domain available for matching.
- Keep `format: "source"` for `.json`. If you switch to `.srs`, also switch to `binary`. Use a reachable download source.

## Verify

1. Run `sing-box check -c config.json` against the **complete merged configuration**.
2. Start it and check that the rule set downloads and loads. A successful syntax check does not prove a successful download. If needed, try another source. You may enable `experimental.cache_file.enabled` to retain downloaded rule sets, preserving other cache options.
3. Pick a domain present in your selected file and query it through your sing-box DNS listener. This example returns **REFUSED** on a match. Confirm the match in debug logs and compare with a normal domain absent from the list.
4. If it resolves unexpectedly, check the DNS path, earlier allow rules, and client caches. A failed browser request alone does not establish a rule match.

Do not reuse the old `rcode://success` DNS server or `download_detour` examples. References: [DNS server migration](https://sing-box.sagernet.org/deprecated/#legacy-dns-server-formats), [DNS actions](https://sing-box.sagernet.org/configuration/dns/rule_action/), [rule sets](https://sing-box.sagernet.org/configuration/rule-set/), and [HTTP clients](https://sing-box.sagernet.org/configuration/shared/http-client/).
