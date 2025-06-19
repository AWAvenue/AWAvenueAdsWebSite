# 使用教學

::: danger 溫馨提醒
由於目前市面上去廣告與代理工具眾多，我們難以全面涵蓋所有使用情境。若您找不到適用的教學，還請見諒。
若您有餘力，也歡迎一同參與文件完善，共同提升使用體驗。許多工具在原理上大致相同，建議您善用網路資源，靈活舉一反三，自行解決問題。
:::

### AdGuard Home

* （**建議使用**）複製可用的[訂閱連結](./Sub.md)，匯入 AdGuard Home 的 DNS 黑名單即可生效。
* 本規則已納入 AdGuard Home 官方規則清單，只需點擊「選擇黑名單」並勾選「AWAvenue Ads Rule」即可啟用。

> 小提示：透過 AdGuard HostlistsRegistry 取得的訂閱連結會略過部分「可能影響商業利益」的網域，若無特殊需求，仍建議從我們的官方倉庫取得以達最佳過濾效果。

### AdGuard DNS

直接在規則清單中找到「AWAvenue Ads Rule」勾選訂閱即可。

### AdGuard 及與代理工具共存教學

將可用的訂閱連結匯入至 AdGuard 的「自訂過濾名單」中，即可生效。

[詳細教學（含操作影片與共存說明）](./AdGuard.md)

### Mihomo Meta

這裡提供一份由 baka 維護的懶人設定，與下方配置原理一致，更加簡單好上手。

[點我查看](https://gist.github.com/liuran001/5ca84f7def53c70b554d3f765ff86a33)

```yaml
rule-providers:  
  秋風廣告規則:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,秋風廣告規則,REJECT
```

> 「REJECT」分組僅為示意，請依照您的實際配置情況調整。

### Sing-Box

範例配置如下，請自行設定，特別是 Pure 版，交流群不提供相關問答。

<details>
  <summary>一般版本示例</summary>

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
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.srs"
      }
    ]
  }
}
```

</details>

<details>
  <summary>1.11.0-alpha.7+ 版本</summary>

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
        "url": "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.srs"
      }
    ]
  }
}
```

</details>

### QuantumultX

[請參考使用文件](./QuantumultX.md)

### ShadowRocket

[請參考使用文件](./ShadowRocket.md)

### Loon

[請參考使用文件](./Loon.md)

### Surge

Just a moment（敬請期待）

### mosdns

目前尚無完整教學，不過您可以將 AdGuard Home 設為 mosdns 的上游，即可實現去廣告效果。

---

## 常見問題與解答

### 1. 為什麼有些 App 裡的廣告無法攔截？（例如 banner 廣告）

答：我們的規則僅能攔截獨立網域名稱的廣告或追蹤連結。若 App 將廣告與正常內容混合於相同域名下發送，我們無法進行精準阻擋，除非解析其流量（需安裝根憑證），否則幾乎無解。

---

### 2. 我是小米手機使用者，為什麼訂閱本規則後無法完成雲備份？

答：請參閱此 Issue：[小米雲備份異常 #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38)，並手動放行以下網域：

```DOMAIN
a0.app.xiaomi.com
```

---

### 3. 為什麼我使用搜狗輸入法後，許多線上功能失效？

答：請參閱此 Issue：[搜狗輸入法跨螢輸入功能被攔截 #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45)，並放行以下網域：

```DOMAIN
shouji.sougou.com
```

---

### 4. 我使用 Cemiuiler/HyperCeiler 就能阻止備份功能，能否移除該網域？

答：並非所有使用者都具備 root 權限或使用 Cemiuiler/HyperCeiler，我們需兼顧大多數人。

---

### 5. 為什麼訂閱後 CHANGHONG（長虹）電視的更新功能與部分線上功能無法使用？

答：我們早已於多處公告說明，出於資訊安全與商業道德考量，已封鎖 CHANGHONG 智慧電視的大量可疑網域，包括廣告推播、API 更新、彈窗廣告、支付與資訊回傳等。

> *這些設定不會影響智慧電視的基本使用，如您需特定功能，請手動放行以下域名：*

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

---

### 6. 為什麼我用 AdGuard for Magisk 模組更新後會斷網？

答：可能是 top 版本模組腳本的問題，建議改用 [twoone 版 AdGuard Home for Magisk](https://github.com/twoone-3/AdGuardHomeForMagisk)。如果您的 Android 裝置已刷入 mihomo 等代理模組，建議直接使用相應的廣告規則，而非額外安裝 AdGuard 模組。
