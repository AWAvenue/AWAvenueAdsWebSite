---
lastVerified: 2026-10-26
verificationScope: docs
---

# Loon 使用教學

適用範圍：Loon 3.0.3+ 的外掛功能；官方文件與發布檔案核對日期：2026-10-26。本次未以 iOS 實機匯入，也尚未確認所有選用規則參數的最低支援版本。

## 匯入外掛

1. 在[訂閱產生器](./Sub.html?tool=loon)選擇方案並複製 **Loon `.module`** 連結。
2. 在 Loon 設定區域開啟 **Plugins（外掛，部分介面顯示「插件」）**，新增遠端外掛，貼上網址、下載並啟用。選單名稱可能因版本而異。
3. 切換為依規則自動分流並啟動 Loon。雖然副檔名是 `.module`，內容包含外掛資訊及 `[Rule]` 區段，請作為外掛匯入，不要填入分流訂閱或節點訂閱。
4. 重新整理外掛並檢查下載內容與更新資訊。這些網域拒絕規則不需要根憑證或 HTTPS 解密。

## 另一種方式：分流訂閱

若外掛無法解析，可在[產生器](./Sub.html?tool=surgeRuleSet)選擇 **Surge / Surfboard RULE-SET**，重新選擇相同的攔截方案。將 `.list` 網址新增為**分流訂閱**，選擇 `REJECT` 並啟用，再停用原外掛。

也可以建立包含 `REJECT`、`DIRECT` 的自訂策略群組，但要攔截時必須選到 `REJECT`。請勿把純 DOMAIN-SET 檔案當成 RULE-SET 匯入。

## 確認是否生效

- 確認資源已成功下載，且沒有解析錯誤。
- 從所選清單挑選一個確實存在的網域，透過 Loon 發起請求，於連線詳細資訊確認命中的規則與 `REJECT` 結果。
- 若仍然放行，請檢查本機規則。官方文件說明的優先順序為：本機規則高於外掛規則，外掛規則高於訂閱規則。
- 切換方案時替換原網址並重新整理，避免同時啟用多份方案。

依據：[Loon 外掛文件](https://nsloon.app/en/docs/Plugin/)、[規則優先順序](https://nsloon.app/en/docs/Rule/)、[本專案發布的 Loon 模組](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Loon.module)。

原教學：ink_hitori，2025-03-22；本次依產生器目前提供的外掛格式更新。

## 更新與還原

切換方案時替換原網址並重新整理。暫時排查時，停用本次加入的外掛或分流訂閱，再重新載入設定，保留原本的代理設定。確認誤攔截後，依請求詳情加入範圍明確的本機允許規則，並核對規則優先順序。需要還原時使用修改前的備份。
