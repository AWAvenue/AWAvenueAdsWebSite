# 如何使用

### AdGuard Home

复制可用的订阅链接，将其导入到 AdGuard Home 的 DNS黑名单 中，即可生效。

### AdGuard DNS

规则列表中直接找到“AWAvenue Ads Rule”勾选订阅即可。

### AdGuard

复制可用的订阅链接，将其导入到 AdGuard 的 自定义过滤名单中，即可生效。

[详细教程（含操作视频）](./AdGuard.md)

### 蓝猫

简单地举个例子，自行配置，反馈交流群不接受此类型的询问。

```yaml
rule-providers:  
  秋风广告规则:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    #此处“/rule_providers”自行参考
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 60480
rules:
  - RULE-SET,秋风广告规则,REJECT
  #此处“REJECT”分组仅为示例参考，具体分组请根据实际情况自行配置
```

### Surge

Just a moment(咕咕咕)

### mosdns

Just a moment(咕咕咕)