---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard Home：訂閱、更新與驗證

適用範圍：已安裝且可開啟管理介面的 AdGuard Home 0.107.x，使用 Web 管理介面訂閱 DNS blocklists。2026-10-26 核對官方文件、介面原始碼與公開規則，未實測路由器、NAS、Docker 或其他部署。安裝、連接埠衝突與容器網路請先依[官方入門文件](https://adguard-dns.io/kb/adguard-home/getting-started/)處理。

## 準備與備份 {#prepare}

記錄原本的用戶端 DNS、路由器 DHCP DNS、上游 DNS 與既有允許規則；先在一台裝置試用，再決定是否擴及整個網路。管理介面位址不等於 DNS 服務位址，例如管理頁的 `3000` 連接埠不是 DNS 查詢連接埠。

在[訂閱產生器](./Sub.md)選擇 **AdGuard** 與需要的方案，複製**所選 URL**。該 URL 是過濾規則文字，不能填入「上游 DNS 伺服器」。後續更新、切換來源與疑難排解都保留所選方案；不需要改成完整版。[發布檔案範例](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt)是僅廣告版，使用 `||網域^` 語法，不能改用 Clash YAML、Surge 模組或 sing-box JSON。

## 匯入 DNS blocklists {#import}

1. 開啟「過濾器 / Filters → DNS 封鎖清單 / DNS blocklists」。
2. 選擇「新增封鎖清單 / Add blocklist → 新增自訂清單 / Add a custom list」。填寫可辨識的名稱（如「秋風廣告規則 · 所選方案」），貼上**所選 URL**，儲存並啟用。
3. 檢查下載沒有錯誤，規則數不為零；確認「設定 / Settings → 一般設定 / General settings」中的「使用過濾器與 hosts 檔案阻擋網域 / Block domains using filters and hosts files」已啟用。
4. 如果用戶端設定覆寫全域過濾選項，也檢查測試裝置對應的用戶端設定。DNS allowlists 與自訂例外會影響結果。

功能與選單依據 [AdGuard Home FAQ](https://adguard-dns.io/kb/adguard-home/faq/)及[官方介面原始碼](https://github.com/AdguardTeam/AdGuardHome/blob/master/client/src/__locales/en.json)。顯示筆數受清單去重、解析與版本影響，不以某個固定數字作為唯一成功標準。

## 更新清單 {#update}

在 DNS blocklists 頁使用「檢查更新 / Check for updates」，查看清單的更新時間、規則數與錯誤提示；在一般設定確認過濾器更新間隔。此操作更新規則清單，不是升級 AdGuard Home 程式。自動更新間隔與清單設定見[官方設定文件](https://adguard-dns.io/kb/adguard-home/configuration/)。

若下載失敗，先確認執行 AdGuard Home 的主機能存取**所選 URL**，且回傳規則文字而非錯誤頁。需要切換來源時，從產生器重新複製相同方案的另一來源，編輯原本項目，避免加入多份重複清單。不要只憑 HTTP 200 或版本號相同就認定內容最新。

## 確認用戶端確實使用 AdGuard Home {#client-dns}

依[官方裝置設定說明](https://adguard-dns.io/kb/adguard-home/getting-started/)把測試裝置的 DNS 指向 AdGuard Home 的區域網路位址；整個網路使用時可透過路由器 DHCP 派發。IPv4 與 IPv6 都需檢查；不要額外填入未經過濾的公共「備用 DNS」，用戶端不一定只在主要 DNS 故障時才使用它。

在有 `nslookup` 的測試電腦上執行下列指令。`192.168.1.2` **只是範例**，須替換為你的 AdGuard Home 位址：

```sh
nslookup example.org 192.168.1.2
nslookup example.org
```

第一條測試指定伺服器是否可用；第二條測試目前的預設解析路徑。兩次都到「查詢紀錄 / Query log」尋找時間、網域與用戶端紀錄。若預設伺服器顯示路由器，可能由它轉送，須靠紀錄進一步確認，不能只看位址就判定失敗。指定查詢成功不能證明瀏覽器也使用相同 DNS；再用瀏覽器發出正常存取並觀察紀錄。

沒有新紀錄時，先確認查詢紀錄已啟用且未排除該網域；接著檢查用戶端 DNS、DHCP 租約、防火牆、DNS 監聽介面與容器連接埠。瀏覽器安全 DNS、Android 私人 DNS、VPN 或代理內建 DoH/DoT 可能繞過區域網路 DNS。先記錄這些設定，在測試裝置上暫時改為使用系統 DNS，驗證後再依實際需求設定；本教學不宣稱自動接管所有加密 DNS。

## 檢查命中與正常對照 {#verify}

從**目前下載的所選清單**選擇一條確實存在的網域規則。僅查詢該網域，無須開啟廣告頁面：

```sh
nslookup ad.doubleclick.net 192.168.1.2
nslookup example.org 192.168.1.2
```

`ad.doubleclick.net` 是核驗日僅廣告版包含的範例；未來若移除，以目前清單為準。查詢紀錄應顯示第一條已阻擋，詳細資料列出命中規則與秋風廣告規則清單；第二條用於正常解析對照。若對照網域被你自己的其他規則阻擋，換一個已知正常網域。被其他清單或上游先阻擋不能證明本訂閱命中，必要時僅在測試用戶端隔離其他過濾層再比較。

阻擋回覆可能是 `0.0.0.0`、`::`、`NXDOMAIN` 或 `REFUSED` 等，取決於阻擋模式；只看回覆或網站打不開並不夠。更新、放行後仍異常時，清除 AdGuard Home 與測試用戶端的 DNS 快取、重新啟動相關應用程式或等待 TTL，避免舊快取與連線影響判斷。原理見 [DNS 規則語法](https://adguard-dns.io/kb/general/dns-filtering-syntax/)與[設定文件](https://adguard-dns.io/kb/adguard-home/configuration/)。

## 誤擋與還原 {#rollback}

先停用本次新增的清單，重現相同操作；重新啟用後再比較。確認誤擋時，可在查詢紀錄詳細資料中解除對應網域阻擋，接著到「自訂過濾規則 / Custom filtering rules」檢查產生的例外。也可加入最小範圍的 DNS 例外，例如 `@@||needed.example^`；這是佔位範例，須換成已確認的必要網域，會允許其子網域，不應盲目放行整個服務。

檢查 DNS allowlists、DNS rewrites、其他清單與上游是否仍阻擋。AdGuard Home 的允許規則無法撤銷上游 DNS 的阻擋。若需完全還原，移除新增訂閱與為此加入的例外，還原用戶端 / DHCP DNS，更新租約並清除快取；不要透過關閉所有安全功能來掩蓋單條誤擋。

DNS 層過濾無法隱藏網頁空白，不能保證阻擋與內文共用網域的廣告；對已快取內容或應用程式直接使用 IP 的連線也有限制。Android 本機 AdGuard 請看[產品選擇教學](./AdGuard.md)。
