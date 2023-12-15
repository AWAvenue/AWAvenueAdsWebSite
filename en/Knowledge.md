# How to Use

### AdGuard Home

Copy the available subscription link and import it into AdGuard Home's DNS blacklist to take effect.

### AdGuard DNS

In the rule list, directly find "AWAvenue Ads Rule" and check the subscription.

### AdGuard

Copy the available subscription link and import it into AdGuard's custom filtering list to take effect.

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
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 60480
rules:
  - RULE-SET,AWAvenue Ads Rule,REJECT
  # The "REJECT" group here is just an example. Configure specific groups based on your needs.
  ```

### Surge

Just a moment (to be added).

### mosdns

Just a moment (to be added).