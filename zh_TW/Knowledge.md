# 如何使用

### AdGuard Home

複製可用的訂閱鏈接，將其導入 AdGuard Home 的 DNS 黑名單中，即可生效。

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
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 60480
rules:
  - RULE-SET,AWAvenue Ads Rule,REJECT
  # 這裡的「REJECT」組僅為示例。根據實際需要配置具體的組。
    ```

### Surge

Just a moment（咕咕咕）。

### mosdns

Just a moment（咕咕咕）。