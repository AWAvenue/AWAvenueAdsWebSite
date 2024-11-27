# How to Use

### AdGuard Home
- (recommended) Copy the available [subscription link](./Sub.md) and import it into AdGuard Home's DNS blacklist to take effect.
- This rule has been added to the official rule list of AdGuard Home. You only need to click "Choose Blacklist" and find "AWAvenue Ads Rule" to check and confirm.

### AdGuard DNS

In the rule list, directly find "AWAvenue Ads Rule" and check the subscription.

### AdGuard

Copy the available subscription link and import it into AdGuard's custom filtering list to take effect.

[Detailed Tutorial (including instructional videos)](./AdGuard.md)

### Clash Meta

Simply configure it yourself. Note that feedback groups do not accept this type of inquiry.

```yaml
rule-providers:
  AWAvenue Ads Rule:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    # Adjust this path as needed
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,AWAvenue Ads Rule,REJECT
  # The "REJECT" group here is just an example. Configure specific groups based on your needs.
```

### Sing-Box

Simply configure it yourself. Note that feedback groups do not accept this type of inquiry.

```json
  "route": {
    "rules": [
      {
        "rule_set": "AWAvenue-Ads-Rule",
        "outbound": "block"
        //Just an example.
      }
    ],
    "rule_set": [
      {
        "type": "remote",
        "tag": "AWAvenue-Ads-Rule",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.srs",
        "download_detour": "proxy"
        //Just an example.
      }
    ]
  }
```

### Surge

Just a moment (to be added).

### mosdns

Just a moment (to be added).