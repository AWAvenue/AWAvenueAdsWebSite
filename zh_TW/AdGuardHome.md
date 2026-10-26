---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard Home：訂閱、更新與驗證

適用範圍：已安裝且可開啟管理介面的 AdGuard Home 0.107.x，使用 Web 管理介面訂閱 DNS blocklists。2026-10-26 核對官方文件、介面原始碼與公開規則，未實測路由器、NAS、Docker 或其他部署。安裝、連接埠衝突與容器網路請先依[官方入門文件](https://adguard-dns.io/kb/adguard-home/getting-started/)處理。

## 準備與備份 {#prepare}

記錄原本的用戶端 DNS、路由器 DHCP DNS、上游 DNS 與既有允許規則；先在一台裝置試用，再決定是否擴及整個網路。管理介面位址不等於 DNS 服務位址，例如管理頁的 `3000` 連接埠不是 DNS 查詢連接埠。

優先使用專案倉庫的訂閱來源：在產生器選擇所需方案，複製官方來源（GitHub Raw）連結；內建目錄則提供不必貼上 URL 的備用方式。

## 匯入 DNS blocklists {#import}

**優先從專案倉庫訂閱**，可選擇四種方案，並直接隨規則倉庫發布更新，不經過 AdGuard 散布副本的額外同步流程。也可以使用下方內建目錄的便利入口；兩種方式擇一即可。

### 方式一：訂閱專案倉庫（建議） {#custom-list}

1. 在[訂閱產生器](./Sub.md)選擇 **AdGuard** 與需要的方案。
2. 優先複製**官方來源（GitHub Raw）**連結；若存取受限，再更換備用來源，並保留相同方案。更新是否即時與下載速度是兩回事，官方來源不保證在所有網路中下載最快。
3. 開啟「過濾器 / Filters → DNS 封鎖清單 / DNS blocklists」，選擇「新增封鎖清單 → 新增一個自訂的清單 / Add a custom list」。
4. 填入容易辨識的名稱，貼上**所選 URL**，儲存並等待下載。這是過濾規則文字，不能填入「上游 DNS 伺服器」，也不能換成 Clash YAML、Surge 模組或 sing-box JSON。

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/zh-TW-custom.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/zh-TW-custom.png" width="561" height="444" loading="lazy" alt="AdGuard Home 自訂清單表單中填入了秋風廣告規則僅廣告版的名稱與訂閱連結。">
  </a>
  <figcaption>範例透過官方來源（GitHub Raw）訂閱僅廣告版；輸入欄位僅顯示部分 URL，請從產生器複製實際選擇的連結。點選圖片可檢視原圖。</figcaption>
</figure>

若已使用內建訂閱，改用倉庫來源時請先停用或移除原項目，避免重複啟用。尤其改成僅廣告版時，若仍啟用完整版，原本的阻擋範圍也會保留。後續更新、更換來源與排錯請保留所選方案，不必改回完整版。

### 方式二：直接選取內建清單 {#built-in}

1. 開啟「過濾器 / Filters → DNS 封鎖清單 / DNS blocklists」。
2. 選擇「新增封鎖清單 / Add blocklist → 從該清單中選擇 / Choose from the list」。
3. 在「一般 / General」分類勾選 **AWAvenue Ads Rule**，儲存並等待下載。**這就是秋風廣告規則**，不必手動貼上 URL。

<details>
<summary>檢視內建清單入口截圖</summary>

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/zh-TW-catalog.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/zh-TW-catalog.png" width="561" height="152" loading="lazy" alt="AdGuard Home 內建清單中的 AWAvenue Ads Rule 已勾選。">
  </a>
  <figcaption>內建清單中的名稱為 AWAvenue Ads Rule，選取並儲存即可訂閱秋風廣告規則。點選圖片可檢視原圖。</figcaption>
</figure>

</details>

內建項目使用 [AdGuard HostlistsRegistry](https://github.com/AdguardTeam/HostlistsRegistry/blob/main/assets/filters.json) 編譯及散布的專案完整版副本，請見[此版本的內建目錄](https://github.com/AdguardTeam/AdGuardHome/blob/v0.107.79/client/src/helpers/filters/filters.ts)。它不提供四方案切換，處理、同步與筆數也可能不同；需要選擇其他方案或優先取得專案倉庫發布的檔案時，請使用上方的建議方式。

### 兩種方式都要檢查

下載後確認項目已啟用、沒有錯誤，且規則筆數不是零。確認「設定 / Settings → 一般設定 / General settings」中的「使用過濾器和 hosts 檔案封鎖網域 / Block domains using filters and hosts files」已啟用。若用戶端設定覆寫全域過濾選項，也要檢查測試裝置的用戶端設定；DNS allowlists 與自訂例外會影響結果。

功能與選單依據 [AdGuard Home FAQ](https://adguard-dns.io/kb/adguard-home/faq/)及[官方介面原始碼](https://github.com/AdguardTeam/AdGuardHome/blob/master/client/src/__locales/en.json)。顯示筆數會受清單去重、解析與版本影響，不以某個固定數字作為唯一成功標準。

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

在截圖版本的桌面介面中，將滑鼠移到該筆記錄「回應」欄的問號，即可檢視「回應細節」。請核對狀態、命中規則與所屬清單；自訂清單顯示的是你填入的名稱。

<figure class="tutorial-screenshot">
  <a href="/tutorials/adguard-home/zh-TW-hit.png" target="_blank" rel="noopener">
    <img src="/tutorials/adguard-home/zh-TW-hit.png" width="452" height="408" loading="lazy" alt="AdGuard Home 回應細節顯示已封鎖，命中規則為 ||ad.doubleclick.net^，所屬清單是自訂的秋風廣告規則僅廣告版，回覆 0.0.0.0。">
  </a>
  <figcaption>真實倉庫來源訂閱命中：同時核對已封鎖狀態、實際規則與自訂清單名稱「秋风广告规则 · 仅广告」。只看 0.0.0.0 或 NOERROR 都不足以證明命中本訂閱。點選圖片可檢視原圖。</figcaption>
</figure>

截圖於 2026-10-27 擷取，軟體為 **AdGuard Home v0.107.79**、正體中文（台灣）介面，表單使用手機檢視區，命中細節使用桌面檢視區。本機隔離執行個體已實際驗證專案倉庫來源與內建清單兩種訂閱方式的下載，並分別核對廣告網域命中與正常解析對照；僅向回環監聽連接埠發送測試查詢，未驗證系統預設 DNS、路由器、NAS、Docker 或其他裝置的 DNS 路徑。軟體介面與商標權利歸各自權利人。

阻擋回覆可能是 `0.0.0.0`、`::`、`NXDOMAIN` 或 `REFUSED` 等，取決於阻擋模式；只看回覆或網站打不開並不夠。更新、放行後仍異常時，清除 AdGuard Home 與測試用戶端的 DNS 快取、重新啟動相關應用程式或等待 TTL，避免舊快取與連線影響判斷。原理見 [DNS 規則語法](https://adguard-dns.io/kb/general/dns-filtering-syntax/)與[設定文件](https://adguard-dns.io/kb/adguard-home/configuration/)。

## 誤擋與還原 {#rollback}

先停用本次新增的清單，重現相同操作；重新啟用後再比較。確認誤擋時，可在查詢紀錄詳細資料中解除對應網域阻擋，接著到「自訂過濾規則 / Custom filtering rules」檢查產生的例外。也可加入最小範圍的 DNS 例外，例如 `@@||needed.example^`；這是佔位範例，須換成已確認的必要網域，會允許其子網域，不應盲目放行整個服務。

檢查 DNS allowlists、DNS rewrites、其他清單與上游是否仍阻擋。AdGuard Home 的允許規則無法撤銷上游 DNS 的阻擋。若需完全還原，移除新增訂閱與為此加入的例外，還原用戶端 / DHCP DNS，更新租約並清除快取；不要透過關閉所有安全功能來掩蓋單條誤擋。

DNS 層過濾無法隱藏網頁空白，不能保證阻擋與內文共用網域的廣告；對已快取內容或應用程式直接使用 IP 的連線也有限制。Android 本機 AdGuard 請看[產品選擇教學](./AdGuard.md)。
