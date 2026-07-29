---
pageClass: start-page
---

# 🧭 快速開始

歡迎使用秋風廣告規則。本頁面協助你判斷它是否適合自己，並透過三個選擇產生正確的訂閱連結。

<div class="start-hero-actions">
  <a class="start-primary-action" href="/zh_TW/Sub.html">開始產生訂閱</a>
  <a class="start-secondary-action" href="#選擇你正在使用的工具">直接選擇工具</a>
</div>

::: tip 三步完成

1. 選擇準備匯入規則的工具或格式。
2. 決定是否攔截隱私遙測和不受歡迎的網路行為。
3. 從國內鏡像、官方來源或備用線路中一鍵複製訂閱。

:::

## 選擇你正在使用的工具

已經知道自己使用什麼工具？直接進入對應的訂閱問答，選擇會被自動帶到下一頁。

<div class="start-tool-grid">
  <a href="/zh_TW/Sub.html?tool=adguard"><strong>AdGuard</strong><span>AdGuard、AdGuard Home、AdGuard DNS</span></a>
  <a href="/zh_TW/Sub.html?tool=clashClassical"><strong>Clash / Mihomo</strong><span>建議從 Classical 格式開始</span></a>
  <a href="/zh_TW/Sub.html?tool=quantumultX"><strong>Quantumult X</strong><span>適用於 Quantumult X 的規則清單</span></a>
  <a href="/zh_TW/Sub.html?tool=shadowrocket"><strong>Shadowrocket</strong><span>適用於 Shadowrocket 的模組格式</span></a>
  <a href="/zh_TW/Sub.html?tool=loon"><strong>Loon</strong><span>適用於 Loon 的模組格式</span></a>
  <a href="/zh_TW/Sub.html"><strong>其他工具或格式</strong><span>hosts、MosDNS、RouterOS、Surge、sing-box 等</span></a>
</div>

::: details 還沒有選擇工具？

- 希望在手機或電腦上直接使用：可以從 AdGuard 開始了解。
- 已經在使用代理用戶端：選擇對應用戶端支援的規則格式。
- 希望為家庭網路統一過濾：查看 AdGuard Home、MosDNS、Dnsmasq 或 RouterOS。
- 只想修改系統 hosts：選擇 hosts / AdAway 格式。

秋風廣告規則不適用於 GKD、李跳跳等無障礙點擊工具，也不適用於 AdGuard for Chrome 等瀏覽器擴充功能。

:::

## 目前版本與造訪統計

<StartStatus />

## 秋風廣告規則能做什麼？

秋風廣告規則從網路層攔截廣告及相關請求，不需要為每個應用程式單獨編寫點擊規則。它兼顧命中率、規則大小與硬體負擔，並支援多種常見過濾工具。

| 可以協助處理 | 無法保證解決 |
|---|---|
| 廣告投放、競價、素材和歸因請求 | 與正常內容共用同一網域的廣告 |
| 統計、遙測、崩潰收集和裝置指紋 | 應用程式中廣告消失後留下的空白 |
| 強制更新、P2P/PCDN、推送和雲端控制下發 | 必須觀看廣告才能領取的獎勵 |
| 多裝置或路由器上的統一網路過濾 | 所有應用程式、所有地區的每一則廣告 |

## 四種訂閱方案

訂閱產生器不會要求你記憶技術檔案名稱，而是透過兩道問題自動選擇：

| 頁面顯示 | 包含內容 | 適合情況 |
|---|---|---|
| 完整防護 | 廣告＋隱私＋不受歡迎 | 預設完整體驗 |
| 純廣告 | 僅廣告 | 相容與最小干預優先 |
| 廣告＋不受歡迎 | 不包含隱私規則 | 希望保留統計與遙測 |
| 廣告＋隱私 | 不包含不受歡迎規則 | 希望保留更新、推送和相關連線 |

## 使用前請注意

1. 秋風廣告規則不考慮觀看廣告領取獎勵的情境。
2. 網路過濾無法移除應用程式介面元素，部分應用程式可能留下空白區域。
3. 隱私或不受歡迎分類可能影響少數統計、更新、推送等功能；訂閱產生器允許你自行取捨。
4. 沒有任何廣告規則能夠涵蓋全部廣告網域。發現誤殺比漏攔更需要及時回報。

::: warning 訂閱前

請閱讀[使用者協議](./Protocol.md)和[使用教學](./Knowledge.md)。如果你使用 AdGuard、Quantumult X、Shadowrocket 或 Loon，也可以從產生結果直接進入對應教學。

:::

## 為什麼採用網路層過濾？

| 特點 | 網路層過濾 | 無障礙點擊 | Xposed Hook |
|---|---|---|---|
| 跨平台與路由部署 | 支援 | 主要限 Android | 主要限 Android |
| 廣告資源是否仍會下載 | 通常不會 | 通常會 | 取決於實作 |
| 上手要求 | 較低 | 最低 | 較高，通常需要 root |
| 應用程式適配成本 | 較低 | 需要持續適配介面 | 需要持續適配程式碼 |

網路層過濾、無障礙點擊和 Hook 解決的是不同問題，可以依照裝置環境組合使用，但規則訂閱不能直接匯入無障礙點擊工具。

## 遇到問題？

- 廣告遺漏、誤殺或規則建議：前往 [GitHub Issues](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues)。
- 訂閱連結、工具使用和交流討論：查看[使用者交流與支援](./Support.md)。
- 準備開始：進入[互動式訂閱產生器](./Sub.md)。
