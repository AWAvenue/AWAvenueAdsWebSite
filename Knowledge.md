# 使用教程

### AdGuard Home

- (**推荐使用**) 复制可用的[订阅链接](./Sub.md)，将其导入到 AdGuard Home 的 DNS黑名单 中，即可生效。
- 本规则已经加入了 AdGuard Home 的官方规则列表，您只需要点击“选择黑名单”然后找到“AWAvenue Ads Rule”勾选确认即可。
> Tips：从 AdGuard HostlistsRegistry 获取的订阅链接会删除一些“可能会影响利益”的域名，若非必须，我们仍旧建议您从我们的官方仓库获取订阅链接以获得最佳的过滤效果。

### AdGuard DNS

规则列表中直接找到“AWAvenue Ads Rule”勾选订阅即可。

### AdGuard 及 与代理软件共存教程

复制可用的订阅链接，将其导入到 AdGuard 的 自定义过滤名单中，即可生效。

[详细教程（含操作视频和共存教程）](./AdGuard.md)

### Mihomo Meta

简单地举个例子，自行配置，反馈交流群不接受此类型的询问。

这里提供一份由baka维护的懒人配置，原理与下方配置一致，更加简单开箱即用。

[点击查看](https://gist.github.com/liuran001/5ca84f7def53c70b554d3f765ff86a33)

```yaml
rule-providers:  
  秋风广告规则:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    #此处“/rule_providers”自行参考
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main//Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,秋风广告规则,REJECT
  #此处“REJECT”分组仅为示例参考，具体分组请根据实际情况自行配置
```
### Sing-Box

简单地举个例子，自行配置，反馈交流群不接受此类型的询问。

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

### 1.11.0-alpha.7+

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

### QuantumultX

[自行查看文档](./QuantumultX.md)

### ShadowRocket

[自行查看文档](./ShadowRocket.md)

### Surge

Just a moment(咕咕咕)

### mosdns

目前还没有教程，但是你完全可以把AdGuard Home设置为mosdns的上游来达到去广告的目的。

---

## 常见问题（与答疑）

::: danger 本模块内容旨在为本广告规则用户解决大部常见问题和答疑解惑，不负责处理回答一些低质量的问题。

:::

1、为什么有些APP内的广告拦截不了？（例如banner广告）

A：如果您知道本规则的工作原理您就应该不会有这个问题，我们仅可以拦截拥有独立域名的广告/追踪链接，部分厂商会将正常内容与广告内容混在相同的链接中下发，面对这种情况，除非我们解密您的流量数据（得安装根证书）再作分析，否则几乎无法拦截。

<br />

2、我是小米手机用户，订阅了本规则后，为什么我的 小米云备份 无法上传应用列表完成备份？

A：请阅读这个issue：
[小米云备份异常 #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38)，然后自行放行

```DOMAIN
a0.app.xiaomi.com
```

<br />

3、我是搜狗输入法用户，订阅了本规则后，为什么我的 搜狗输入法 许多在线功能失效了？

A：请阅读这个issue：
[搜狗输入法跨屏输入的网页被拦截 #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45)，然后自行放行

```DOMAIN
shouji.sougou.com
```

<br />

4、我可以用 Cemiuiler/HyperCeiler 中“阻止上传应用列表功能”啊，你们把这个域名移除吧！

A：不是所有人都用 Cemiuiler/HyperCeiler ，亦不是所有人的小米手机都获取了root权限并刷入了LSPosed，我们需要照顾大多数。

<br />
5、订阅了本规则后，为什么我的 CHANGHONG TV 收不到更新/一些在线功能无法使用了？

A：这个原因我们在添加这些域名的时候就已经公开在多出说明过了。

*“经过长时间的考察与慎重考虑，我们认为 CHANGHONG 是一家打着军工企业胡作非为的流氓公司，故对 CHANGHONG SmartTV 的绝大部分域名进行了封锁拦截，包括但不限于：所有经由域名请求的广告域、欢视商店的检测更新api、主页推送api、全局弹出式banner api（基本都是广告消息推送）、更新检测api、欢付api、不明意义的上传api 等。在拦截后， CHANGHONG SmartTV 作为一台智能电视的基本功能不会受到影响，可以正常使用。”*

如果您需要上述的任何功能，请放行以下域名：

```DOMAIN
pay.sboot.cn
scs.openspeech.cn
sdkauth.hpplay.cn
itv2-up.openspeech.cn
mdp-appconf-in.heytapdl.com
gslb.hpplay.cn
rp.hpplay.cn
tvapp.hpplay.cn
t002.ottcn.com
smart-tv.cn
huantv.cn
```

<br />
6、为什么 AdGuard for Magisk 模块更新版本后会断网？

A：top版模块脚本问题，建议更换为[twoone版AdGuard Home for Magisk](https://github.com/twoone-3/AdGuardHomeForMagisk)。同时，我们强烈建议您“就近”使用现成的工具进行广告过滤，例如您已经为您的 Android 设备刷入了 mihomo 系列代理模块，那么您完全可以使用我们为 mihomo 准备的广告规则而不是再刷写一份 AdGuard for Magisk。
