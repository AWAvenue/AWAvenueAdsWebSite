---
lastVerified: 2026-10-26
verificationScope: docs
---

# Shadowrocket 使用教學

適用範圍：Shadowrocket 2.x 的模組匯入功能。發布檔案與開發者產品資料核對日期：2026-10-26。本次未以 iOS 實機匯入，尚未確認所有選用規則參數的最低支援版本。

## 匯入模組

1. 在[訂閱產生器](./Sub.html?tool=shadowrocket)選擇方案，複製 **Shadowrocket `.module`** 連結。
2. 開啟 Shadowrocket 的 **Config（配置）→ Modules（模組）**，新增 URL，貼上連結並下載，再為目前使用的設定檔啟用模組。選單名稱可能因版本而異。
3. 將全域路由切換為 **Config（依設定檔分流）**，再開啟連線。模組已包含 `REJECT` 策略，請勿加到節點訂閱或一般 RULE-SET。
4. 重新整理模組並確認更新資訊。主設定檔已更新，不代表模組也已更新；自動更新方式請以目前版本提供的功能為準。

目前的模組只包含網域拒絕規則，不需要安裝根憑證或啟用 HTTPS 解密。

## 另一種方式：遠端規則集

若應用程式無法解析模組或其中的參數，可在[產生器](./Sub.html?tool=surgeRuleSet)選擇 **Surge / Surfboard RULE-SET**，重新選擇相同的攔截偏好，再將 `.list` 連結加入目前設定檔的 `RULE-SET` 規則，策略選 `REJECT`。請放在一般放行規則與最終規則之前，並停用原模組，避免重複匯入。

## 確認是否生效

- 確認資源下載成功，內容為預期的網域規則，而不是 HTML 錯誤頁面。
- 從所選檔案挑選一個確實存在的網域，透過 Shadowrocket 發起連線，再於連線紀錄確認命中的規則與 `REJECT` 結果。
- 若仍然放行，檢查目前的設定檔、路由模式、模組開關及其他規則。單看連線逾時，還不足以確認規則生效。
- 切換方案時，請替換原模組網址並重新整理，不要同時啟用多份方案。

資料依據：[開發者的 App Store 說明](https://apps.apple.com/us/app/shadowrocket/id932747118)、[本專案發布的 Shadowrocket 模組](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Shadowrocket.module)。選單流程沿用本站既有教學，本次未以實機驗證。

## 更新與還原

切換方案時替換原網址並重新整理。暫時排查時，使用模組方式的就停用該模組，使用 RULE-SET 方式的就停用對應規則，再重新載入目前的設定並重新連線。確認誤攔截後，依紀錄中的實際網域加入精確允許例外；需要還原時可使用修改前的備份。
