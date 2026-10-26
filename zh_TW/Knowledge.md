---
lastVerified: 2026-10-26
verificationScope: docs
---

# 使用教學總覽

先在[訂閱產生器](./Sub.md)選擇工具與方案，再依下方教學匯入。秋風廣告規則依網域過濾，無法精確區分同一網域下的廣告與正常內容。規則集、模組、指令碼和完整設定各有用途，請使用與用戶端入口一致的格式。

各教學的涵蓋範圍以頁面說明為準；文件核驗不代表所有用戶端、版本和鏡像均已實測。

## 依用戶端選擇

- [AdGuard](./AdGuard.md)：說明產品選擇、Android 匯入步驟與其他平台的 DNS 過濾入口。

- [AdGuard Home](./AdGuardHome.md)：適用於路由器或伺服器的 DNS 過濾，涵蓋封鎖清單、查詢記錄、更新與還原。

- [Android 共存說明](./Coexist.md)：說明過濾與代理同時使用時的本機 VPN 衝突及可選連線方式。

- [Mihomo](./Mihomo.md)：適用於 Mihomo 核心，分別使用 [domain YAML](./Mihomo.md#yaml)、[MRS](./Mihomo.md#mrs) 或 [Classical YAML](./Mihomo.md#classical)。

- [sing-box](./SingBox.md)：適用於 1.14.x，使用 source JSON 規則集與 DNS 拒絕。

- [Quantumult X](./QuantumultX.md)：匯入遠端分流 `.list`。

- [Shadowrocket](./ShadowRocket.md)：匯入 `.module` 模組，另有 RULE-SET 替代方式。

- [Loon](./Loon.md)：匯入 `.module` 外掛，另有規則集替代方式。

- [Surge](./Surge.md)：區分 RULE-SET、DOMAIN-SET 與模組；Surfboard 相容範圍請另查用戶端說明。

- [MosDNS v5](./MosDNS.md)：使用 `domain_set`，包含更新與 DNS 驗證。

託管版 AdGuard DNS 與自行架設的 AdGuard Home 是不同產品；託管服務的清單選擇與方案功能請查看 [AdGuard DNS 官方說明](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/)，不要直接套用自行架設的教學。

## 其他產生器格式

下列格式已有發布檔案；此處僅說明檔案用途與官方入口，**尚未提供完整的安裝、更新及實體裝置驗證教學**。維護 DNS、路由器設定或模組前，請先備份並核對工具版本；不要把這些檔案當作代理訂閱，或直接覆蓋完整設定。

### hosts / AdAway {#hosts}

`AWAvenue-Ads-Rule-hosts*.txt` 是 `IP 網域` 格式的 hosts 對應表。請使用支援 hosts 來源的工具；此格式不含子網域萬用字元能力。參閱 [AdAway 官方專案](https://github.com/AdAway/AdAway)。本頁不提供直接取代系統 hosts 的步驟。

### Dnsmasq {#dnsmasq}

`AWAvenue-Ads-Rule-Dnsmasq*.conf` 含 `address=/網域/#` 指令，是待合併或載入的設定片段，不是純網域清單。載入、語法檢查與重新啟動方法依發行版或路由器外掛而異，參閱 [Dnsmasq 官方手冊](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)。

### SmartDNS {#smartdns}

`AWAvenue-Ads-Rule-SmartDNS*.conf` 含 `address /…/#` 指令。它不是 `domain-set` 所需的每行一個網域檔案，不能直接換進該入口；參閱 [SmartDNS 官方設定說明](https://pymumu.github.io/smartdns/config/)。特定版本及載入流程尚未實測。

### RouterOS AdList {#routeros-adlist}

`AWAvenue-Ads-Rule-RouterOS-Adlist*.txt` 是供 DNS Adlist 讀取的 hosts 風格清單。需確認 RouterOS 版本具備 Adlist 功能，以及記憶體、更新和 DNS 服務設定；參閱 [MikroTik DNS 文件](https://help.mikrotik.com/docs/spaces/ROS/pages/37748767/DNS)。與下方指令碼格式不可混用。

### RouterOS Script {#routeros-script}

`AWAvenue-Ads-Rule-RouterOS*.txt` 包含 `ip dns static add` 命令，會新增靜態 DNS 項目。它是指令碼文字而不是 Adlist；本教學未核驗重複匯入、刪除舊項目、更新交易與還原流程，暫不提供一鍵執行步驟。參閱 [RouterOS 官方文件](https://manual.mikrotik.com/docs/)。

### AdClose {#adclose}

`AWAvenue-Ads-Rule-AdClose*.rule` 包含 `domain, …` 等 AdClose 專用規則。僅用於對應工具；模組版本、權限及匯入步驟尚未涵蓋，參閱 [AdClose 發布入口](https://github.com/Xposed-Modules-Repo/com.close.hook.ads)。

### Geosite 原始文字 {#geosite}

`AWAvenue-Ads-Rule-Geosite*.txt` 含裸網域與 `full:` 等原始文字項目，**不是編譯後的 `geosite.dat`**，也不是 sing-box JSON。需由支援該來源格式的建置流程處理；編譯、標籤命名與用戶端載入尚未涵蓋。參閱 [v2fly/domain-list-community 格式說明](https://github.com/v2fly/domain-list-community)。

### AdGuard Replenish 補充規則 {#adguard-replenish}

`AWAvenue-Ads-Rule-Replenish.txt` 是獨立的 AdGuard 補充過濾器，不提供四種方案。請先確認需要的補充過濾用途，再依 [AdGuard 自訂過濾器教學](./AdGuard.md#android-custom)選擇正確入口；它不等同完整版 DNS 規則，含 URL 路徑等非 DNS 語法，當作 AdGuard Home DNS 封鎖清單無法完整生效。此補充清單目前的攔截效果尚未實測。

### 純網域清單 {#dns}

純網域清單通常每行一個網域，但精確比對、後綴比對及子網域語意由載入工具決定。產生器中的 MosDNS、Geosite、hosts 與各類 `.conf` 有各自語法，不能因副檔名相似就當作純網域清單互換。

格式說明核對了[專案實際發布檔案](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters)；新增完整教學前，仍需各別驗證工具版本、下載、命中與還原。

## 常見問題

### 為什麼部分廣告仍會顯示？

廣告若與正常內容共用網域，網域過濾可能無法單獨處理；應用程式自帶的加密 DNS、快取或繞過過濾的路徑也會影響結果。先在查詢記錄或連線紀錄確認請求是否經過工具、命中哪條規則。安裝根憑證不是本規則的一般生效步驟，也不會讓網域規則自動取得網頁元素過濾能力。

### 正常功能疑似被誤擋，如何處理？

先暫時停用本清單，重試相同操作並查看記錄；確認關聯後，只放行需要的網域並重新測試。歷史回報包含[小米雲端備份 #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38) 的 `a0.app.xiaomi.com`，以及[搜狗跨螢幕輸入 #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45) 的 `shouji.sougou.com`。這些是歷史案例，不是適用所有裝置的固定放行建議。

舊版文件也曾列出 CHANGHONG（長虹）電視更新、商店、投放或付款功能相關網域。目前裝置、韌體與所選方案可能不同，無法保證攔截不影響基本功能。排查時請依當次記錄逐一確認，不建議直接放行歷史整份清單。

### 模組更新後斷網，是否應更換某個第三方模組？

僅憑斷網現象無法判定是模組指令碼、連接埠衝突、DNS、上游或規則造成。先停用最近的變更並還原可用設定，再查看對應工具的記錄與維護說明。本站未持續驗證第三方 Magisk 模組，不提供預設替換建議；Android 共存問題可先看[共存說明](./Coexist.md)。
