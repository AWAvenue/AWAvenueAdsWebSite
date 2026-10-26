---
lastVerified: 2026-10-26
verificationScope: docs
---

# sing-box 使用教學

適用版本：**sing-box 1.14.x**；文件核對日期：**2026-10-26**。範例採用目前的 HTTP 用戶端與 DNS 規則動作格式，不能直接套用於舊版核心。使用圖形介面應用程式時，請先確認其內建核心版本。

## 取得所選方案

在[訂閱產生器](./Sub.html?tool=singbox)選擇 sing-box 與攔截偏好，複製 `.json` 連結。這是 **source 格式的規則集**，並非完整的代理設定檔，請勿將它當成整份設定匯入。

## 合併設定

以下片段使用完整防護方案。若選擇其他方案，請將 `url` 換成產生器提供的連結。把各陣列內的項目合併到現有設定，保留原本的 DNS、連入與代理設定；同名標籤只需定義一次。

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

- 將攔截規則放在可能先處理相同查詢的一般 DNS 規則之前；刻意設定的允許清單例外可放在它前面。
- 將 `awa-bootstrap` 加到原本的 DNS 伺服器清單最後。它使用系統解析器解析規則下載網址；一般查詢仍沿用你原本的 DNS 上游。請勿讓系統 DNS 指向同一個尚未啟動的 sing-box，以免啟動時互相依賴。
- 此片段只處理**進入 sing-box DNS 模組的查詢**，DNS 接管方式沿用現有設定。應用程式自行使用 DoH、快取或直接連線到 IP 時，不一定經過這裡。若需要在連線層攔截，可在既有 `route.rules` 另加 `{"rule_set":"awa-ads","action":"reject"}`，但連線仍須帶有可比對的網域資訊。
- `.json` 請搭配 `format: "source"`；若自行改用 `.srs`，必須一併改成 `binary`。請選擇能正常連線的下載來源。

## 檢查設定並確認生效

1. 對**合併後的完整設定檔**執行 `sing-box check -c config.json`，檢查語法、重複標籤與缺少的參照。
2. 啟動後查看紀錄，確認遠端規則集已成功下載並載入。語法檢查通過，不代表下載一定成功；若下載失敗，先檢查網路或更換來源。需要保留下載的規則快取時，可啟用 `experimental.cache_file.enabled`，並保留原本的其他選項。
3. 從所選方案挑選一個確實存在的網域，透過自己的 sing-box DNS 服務查詢。範例命中後會回傳 **REFUSED**；請一併查看偵錯紀錄中的規則比對，再查詢一個不在清單中的正常網域作為對照。
4. 若仍然能解析，請檢查查詢路徑、前面的放行規則及用戶端快取。單看瀏覽器無法開啟頁面，還不足以證明規則生效。

舊版 DNS server 的 `address` 格式已於 1.14.0 移除，請勿再使用 `rcode://success` 或舊版 `download_detour` 範例。依據：[DNS 格式遷移](https://sing-box.sagernet.org/deprecated/#legacy-dns-server-formats)、[DNS 規則動作](https://sing-box.sagernet.org/configuration/dns/rule_action/)、[遠端規則集](https://sing-box.sagernet.org/configuration/rule-set/)、[HTTP 用戶端](https://sing-box.sagernet.org/configuration/shared/http-client/)。

## 更新與還原

先從紀錄確認命中的網域。暫時排查時，可移除本教學新增的 `dns.rules` 拒絕項目，以及另外加入的 `route.rules` 拒絕項目，檢查完整設定後重新啟動。若也要刪除 `route.rule_set` 的 `awa-ads`，須先移除所有參照它的規則；仍被其他設定使用的下載用戶端和 DNS 伺服器請保留。需要完整還原時使用原設定備份。
