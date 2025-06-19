# Usage Guide

\::: danger
Due to the large variety of ad-blocking and proxy tools available, it is difficult for us to cover everything. If you can't find the tutorial you're looking for, please understand. If you have the time and energy, you're welcome to contribute to improving the documentation and enhancing the experience. Many tools have similar underlying principles, and we hope you can apply that knowledge, make good use of online resources, and solve problems independently.
\:::

### AdGuard Home

* (**Recommended**) Copy the available [subscription link](./Sub.md) and import it into the AdGuard Home DNS blacklist. This will take effect immediately.
* This rule has been added to AdGuard Home's official rule list. You just need to click "Choose Blacklist", find "AWAvenue Ads Rule", and check it to confirm.

> Tips: Subscription links obtained from AdGuard HostlistsRegistry may remove some "potentially detrimental" domains. Unless necessary, we still recommend you get the subscription link from our official repository to achieve the best filtering effect.

### AdGuard DNS

Simply find "AWAvenue Ads Rule" in the rule list and subscribe to it.

### AdGuard and Proxy Software Coexistence Tutorial

Copy the available subscription link and import it into AdGuard's custom filter list to take effect.

[Detailed Tutorial (including video and coexistence tutorial)](./AdGuard.md)

### Mihomo Meta

Here’s a simple example for self-configuration; inquiries of this type will not be addressed in the feedback group.

A lazy configuration maintained by baka is provided here, which is based on the principle of the configuration below but simpler and more ready to use.

[Click to View](https://gist.github.com/liuran001/5ca84f7def53c70b554d3f765ff86a33)

```yaml
rule-providers:  
  AWAvenue Ads Rule:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    # Refer to "/rule_providers" for path configuration
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main//Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,AWAvenue Ads Rule,REJECT
  # "REJECT" is just a sample group, please configure based on actual needs
```

### Sing-Box

Here’s a simple example for self-configuration; inquiries of this type will not be addressed in the feedback group, especially for the Pure version.

<details>
  <summary>Example</summary>

```json
{
  "dns": {
    "servers": [
      {
        "tag": "dns_block",
        "address": "rcode://success"
      }
    ],
    "rules": [
      {
        "rule_set": "AWAvenue-Ads-Rule",
        "server": "dns_block"
      }
    ]
  },
  "route": {
    "rule_set": [
      {
        "type": "remote",
        "tag": "AWAvenue-Ads-Rule",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main//Filters/AWAvenue-Ads-Rule-Singbox.srs"
      }
    ]
  }
}
```

</details>

<details>
  <summary>1.11.0-alpha.7+</summary>

```json
{
  "dns": {
    "rules": [
      {
        "rule_set": "geosite-dnsblock",
        "action": "reject"
      }
    ]
  },
  "route": {
    "rule_set": [
      {
        "type": "remote",
        "tag": "geosite-dnsblock",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main//Filters/AWAvenue-Ads-Rule-Singbox.srs"
      }
    ]
  }
}
```

</details>

### QuantumultX

[Refer to the documentation](./QuantumultX.md)

### ShadowRocket

[Refer to the documentation](./ShadowRocket.md)

### Loon

[Refer to the documentation](./Loon.md)

### Surge

Just a moment (coming soon)

### mosdns

There is currently no tutorial, but you can set AdGuard Home as the upstream server for mosdns to achieve ad-blocking.

---

## Frequently Asked Questions (and Answers)

1. **Why can't I block ads in some apps (e.g., banner ads)?**

A: If you understand the working principle of this rule, you shouldn’t face this issue. We can only block ads or tracking links that have independent domains. Some vendors mix normal content with ad content in the same link, and in such cases, we can't block the ads unless we decrypt your traffic data (by installing a root certificate) for analysis.

<br />

2. **I'm a Xiaomi phone user. After subscribing to this rule, why can't my Xiaomi Cloud Backup upload the app list?**

A: Please read this issue:
[Xiaomi Cloud Backup Issue #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38), and unblock the following domain:

```DOMAIN
a0.app.xiaomi.com
```

<br />

3. **I'm a Sogou Input Method user. After subscribing to this rule, why are many online features of Sogou Input Method not working?**

A: Please read this issue:
[Sogou Input Method cross-screen input webpage blocked #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45), and unblock the following domain:

```DOMAIN
shouji.sougou.com
```

<br />

4. **I can use Cemiuiler/HyperCeiler to block the "Upload App List" function! Please remove this domain!**

A: Not everyone uses Cemiuiler/HyperCeiler, nor do all Xiaomi phone users have root privileges or install LSPosed. We need to accommodate the majority of users.

<br />

5. **Why can't I receive updates or use some online features on my CHANGHONG TV after subscribing to this rule?**

A: This reason has already been explained in detail when we added these domains to the blocklist.

*“After long consideration, we believe that CHANGHONG is a rogue company masquerading as a military enterprise, so we have blocked most of the domains related to CHANGHONG SmartTV, including but not limited to: all advertising domains, the update checking API for HuanShih Store, homepage push API, global popup banner API (mostly ad messages), update checking API, HuanFu API, and unspecified upload APIs. After blocking, the basic functionality of CHANGHONG SmartTV as a smart TV will not be affected and can still be used normally.”*

If you need any of the above functions, please unblock the following domains:

```DOMAIN
pay.sboot.cn
scs.openspeech.cn
sdkauth.hpplay.cn
itv2-up.openspeech.cn
gslb.hpplay.cn
rp.hpplay.cn
tvapp.hpplay.cn
t002.ottcn.com
smart-tv.cn
huantv.cn
```

<br />

6. **Why does AdGuard for Magisk lose internet connection after updating?**

A: This is a top-version module script issue. It is recommended to replace it with the [twoone version of AdGuard Home for Magisk](https://github.com/twoone-3/AdGuardHomeForMagisk). Additionally, we strongly recommend you use ready-made tools for ad filtering, such as the Mihomo proxy module for your Android device, rather than flashing a separate AdGuard for Magisk.
