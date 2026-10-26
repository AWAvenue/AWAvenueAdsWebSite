---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard：先選產品，再匯入規則

適用範圍：AdGuard for Android 4.x 的應用程式內訂閱；其他平台僅提供官方入口。2026-10-26 核對官方文件與公開發布檔案，未進行手機或桌面用戶端實機測試。介面譯名、授權與版本可能影響可用功能，請依功能名稱尋找入口。

## 你使用的是哪一種 AdGuard？ {#choose-product}

| 產品 | 在哪裡加入秋風廣告規則 |
| --- | --- |
| AdGuard for Android | 本頁的 DNS 過濾器，或自訂內容過濾器，先選一種 |
| AdGuard Home（路由器、NAS、伺服器） | [獨立教學](./AdGuardHome.md)的 DNS blocklists |
| AdGuard for Windows / Mac | 本頁末尾的[其他平台](#other-platforms)，不要照搬 Android 選單 |
| AdGuard for iOS | 本頁末尾的 DNS 防護入口，區分 Safari 內容阻擋 |
| 公共 AdGuard DNS | 只能選擇服務預設；把系統 DNS 改為它，不等於訂閱秋風廣告規則 |

個人 AdGuard DNS 是另一項雲端服務：在自己的伺服器面板中可管理使用者規則，以及方案允許的自訂 blocklists。它與公共 DNS、自行架設的 AdGuard Home 不同；自訂清單有額度限制，請見[官方說明](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/)。

## 準備所選方案的訂閱 URL {#subscription}

開啟[訂閱產生器](./Sub.md)，選擇 AdGuard 與需要的方案，優先複製**官方來源（GitHub Raw）**的 URL，直接訂閱專案倉庫發布的檔案；若存取受限，再更換備用來源。下文所有「所選 URL」都指這個連結；更新或切換來源時保留相同方案，別被網路上的完整版範例覆蓋。

AdGuard 發布檔案使用 `||網域^` 等文字規則。本專案是網域阻擋清單，不含網頁元素隱藏規則，也不是 DNS 伺服器位址或完整用戶端設定。不要把 Clash YAML、sing-box JSON、Surge 模組貼進過濾器。可對照[目前僅廣告版檔案](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt)與 [DNS 規則語法](https://adguard-dns.io/kb/general/dns-filtering-syntax/)。

## Android：使用 DNS 過濾器 {#android-dns}

這是希望在 DNS 查詢階段阻擋網域時的入口；不需要為匯入本清單額外啟用 HTTPS 解密。

1. 啟動 AdGuard 防護，完成應用程式要求的 Android VPN 授權。若另有 VPN，先看[共存教學](./Coexist.md)。
2. 進入「防護 / Protection → DNS 防護 / DNS protection」，啟用 DNS 防護。
3. 開啟「DNS 過濾器 / DNS filters」，新增自訂 DNS 過濾器，貼上**所選 URL**。查看名稱、規則數與下載結果，儲存並啟用。
4. 在 DNS 伺服器選項中保留或選擇你實際要用的上游。**訂閱 URL 應填在過濾器中，不能填在 DNS 伺服器位址欄。** 本機規則與上游服務商的阻擋互相獨立。

官方 [DNS 防護說明](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/)區分了伺服器、過濾器與使用者規則。DNS 阻擋無法隱藏網頁空白，也不能保證移除與內文共用網域的廣告。

## Android：使用自訂內容過濾器 {#android-custom}

如果你已使用 AdGuard 的內容過濾，可進入「設定 / Settings → 過濾 / Filtering → 過濾器 / Filters → 自訂過濾器 / Custom filters」，選擇新增，貼上同一個**所選 URL**並啟用。此入口對經過 AdGuard 內容過濾的請求套用規則，作用範圍與 DNS 過濾不同；本清單本身仍只有網域規則。入口見[官方設定說明](https://adguard.com/kb/adguard-for-android/features/settings/)。

先選一個入口驗證。把相同清單同時放進兩個入口，通常不會增加網域涵蓋範圍，反而更難追查命中來源。這裡只新增訂閱，不要求你為此安裝憑證或開啟所有過濾開關。

產生器中的 **AdGuard 補充規則（Replenish）** 是獨立清單，沒有四方案，不能取代前文所選訂閱。它包含 URL 路徑等非 DNS 規則，應以自訂內容過濾器處理；不能保證作為 AdGuard Home 或 DNS 過濾器完整生效。啟用前請閱讀[目前補充檔案](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Replenish.txt)中的影響說明。

## 更新與生效檢查 {#verify}

在應用程式的更新操作中手動檢查過濾器更新，並在「一般 / General → 應用程式與過濾器更新 / App and filter updates」確認自動更新。檢查所選清單仍啟用，最後更新時間與規則數合理；下載成功不等於流量已經過它。

1. 開啟「統計 / Statistics → 最近活動 / Recent activity」。DNS 方案同時查看 DNS 統計或 DNS 請求紀錄。
2. 先造訪正常網站，確認對應請求經過 AdGuard 且功能正常；沒有紀錄時先檢查路由、應用程式排除項目、背景限制與瀏覽器獨立加密 DNS。
3. 從**目前已下載的所選清單**選一條網域規則，發出該網域的 DNS 查詢或存取請求。無須點擊廣告；請求失敗本身不算證據。
4. 開啟該請求詳細資料，確認顯示已阻擋，並能歸因至秋風廣告規則或具體規則。若被其他過濾器或上游 DNS 先阻擋，不能據此證明本訂閱命中。

紀錄入口與請求詳細資料見[官方統計說明](https://adguard.com/kb/adguard-for-android/features/statistics/)。已快取的 DNS、已建立連線與應用程式自己的 DNS 都可能影響重現；關閉相關應用程式、清除可控制的快取或等待 TTL 後重試。

## 誤擋與還原 {#rollback}

出現登入、圖片或播放異常時，先只停用新加入的清單，重試相同操作；再啟用並比較，避免一次改多個設定。確認誤擋後，從請求詳細資料建立最小範圍的允許規則，並記錄網域、命中清單與出錯操作；DNS 允許清單不能代替內容過濾允許清單。不要直接放行整個服務的所有網域。需要完全還原時，移除所選訂閱，還原原本的 DNS 設定，再清除相關快取。

## Windows、macOS 與 iOS {#other-platforms}

以下僅核對文件，未實測這些系統。進入對應產品的 DNS 過濾器加入**所選 URL**，再依該產品紀錄驗證；Android 操作路徑不是跨平台通用路徑。

- **Windows**：目前的[官方 DNS 防護說明](https://adguard.com/kb/adguard-for-windows/protection/dns-protection/)提供 DNS 過濾器與使用者規則；舊版與新版設定版面不同。
- **macOS**：[DNS → Filters](https://adguard.com/kb/adguard-for-mac/features/dns/)管理 DNS 清單；不要混同 Safari 擴充功能的過濾器。
- **iOS / iPadOS**：[DNS protection](https://adguard.com/kb/adguard-for-ios/features/dns-protection/)中的 DNS filtering / DNS filters 用於 DNS 清單，相關功能取決於版本與授權；Safari protection 僅負責 Safari 內容阻擋，作用範圍不同。

歷史原稿：[天命](https://t.me/tmbyml)。2026-10-26 由秋風廣告規則官網維護修訂；舊影片不再是完成步驟的必要依據。
