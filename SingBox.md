# sing-box 使用教程

适用版本：sing-box **1.14.x**；文档核验日期：**2026-10-26**。以下使用当前 HTTP 客户端和 DNS 规则动作格式，不适用于原样粘贴到旧版本。图形客户端请先查看内置核心版本。

## 取得与你的方案一致的规则

在[订阅生成器](./Sub.html?tool=singbox)选择 sing-box 与拦截偏好，复制 `.json` 链接。它是 **source 格式的规则集**，不是完整的 sing-box 配置；不要把它作为整个代理配置导入。

## 合并配置

下面是完整防护方案的示例片段。选择了其他方案时，将 `url` 换成刚复制的链接。把各数组中的条目合并到现有配置，不要覆盖原有 DNS、入站和代理设置；同名标签只定义一次。

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

- 将这条拦截规则放在可能提前处理同一请求的宽泛 DNS 规则之前；有意设置的放行例外可以放在它前面。
- 将 `awa-bootstrap` 追加到原有 DNS 服务器列表。它使用系统解析器为规则下载解析域名；正常 DNS 上游仍沿用你的现有设置。系统 DNS 不应回指同一个尚未启动的 sing-box，以免下载时循环依赖。
- 此片段只处理**进入 sing-box DNS 模块的查询**。入站的 DNS 接管沿用现有配置；应用自己的 DoH、缓存或直接 IP 连接不一定经过这里。需要连接层过滤时，可在现有 `route.rules` 中另加 `{"rule_set":"awa-ads","action":"reject"}`，但请求仍需有可匹配的域名信息。
- `.json` 对应 `format: "source"`。若自行换成 `.srs`，必须同时改为 `binary`。使用可访问的下载源；不要恢复旧的 `download_detour` 或 `rcode://success` 写法。

## 检查配置并确认生效

1. 对**合并后的完整配置**执行 `sing-box check -c config.json`，排除语法、重复标签和缺失引用。
2. 启动后查看日志，确认远程规则集成功下载并加载。语法检查通过并不代表下载成功；首次下载失败时先检查网络或换来源。若已有 `experimental.cache_file`，可启用其 `enabled` 保存远程规则缓存，保留原有其他选项。
3. 从所选规则文件中挑选一个确实存在的域名，将 DNS 查询发给自己的 sing-box DNS 入口。此示例命中后返回 **REFUSED**；同时检查调试日志中的规则匹配，再用一个不在列表中的正常域名对照。不要只凭浏览器打不开判断生效。
4. 若仍能解析，检查查询是否经过 sing-box、前置放行规则与客户端缓存；更新规则后重新测试。

旧的 DNS server `address` 格式已在 1.14.0 移除。依据：[迁移与弃用说明](https://sing-box.sagernet.org/deprecated/#legacy-dns-server-formats)、[DNS 规则动作](https://sing-box.sagernet.org/configuration/dns/rule_action/)、[远程规则集](https://sing-box.sagernet.org/configuration/rule-set/)、[HTTP 客户端](https://sing-box.sagernet.org/configuration/shared/http-client/)。
