# 如何使用

### AdGuard Home

- (**推薦使用**) 複製可用的[訂閱鏈接](./Sub.md)，將其導入到 AdGuard Home 的 DNS黑名單 中，即可生效。
- 本規則已經加入了 AdGuard Home 的官方規則列表，您只需要點擊「選擇黑名單」然後找到「AWAvenue Ads Rule」勾選確認即可。


### AdGuard DNS

在規則列表中直接找到「AWAvenue Ads Rule」，勾選訂閱即可。

### AdGuard

複製可用的訂閱鏈接，將其導入 AdGuard 的自定義過濾列表中，即可生效。

[詳細教學（附操作影片）](./AdGuard.md)

### 藍貓

簡單地舉個例子，自行配置。請注意，反饋群不接受此類詢問。

```yaml
rule-providers:
  AWAvenue Ads Rule:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    # 需要時請調整此路徑
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,AWAvenue Ads Rule,REJECT
  # 這裡的「REJECT」組僅為示例。根據實際需要配置具體的組。
```

### Sing-Box

簡單地舉個例子，自行配置。請注意，反饋群不接受此類詢問。

```json
  "route": {
    "rules": [
      {
        "rule_set": "AWAvenue-Ads-Rule",
        "outbound": "block"
        //僅供參考，具體出站標簽請根據實際情況自行配置
      }
    ],
    "rule_set": [
      {
        "type": "remote",
        "tag": "AWAvenue-Ads-Rule",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.srs",
        "download_detour": "proxy"
        //僅供參考，具體出站標簽請根據實際情況自行配置
      }
    ]
  }
```

### Surge

Just a moment（咕咕咕）。

### mosdns

Just a moment（咕咕咕）。