---
lastVerified: 2026-10-26
verificationScope: docs
---

# Surge 使用教學

適用範圍：**Surge iOS 5.x / Mac 5.x、6.x** 的遠端規則集。本專案模組使用的 `pre-matching` 需要 **iOS 5.14.0+ / Mac 5.9.0+**。文件與發布檔案核對日期：**2026-10-26**。本次未在 Apple 裝置實際匯入，選單位置請以使用中的版本為準。

在[訂閱產生器](./Sub.html?tool=surgeRuleSet)選擇格式與方案。下列三種方式**擇一使用**即可，不必重複匯入。若遠端管理的設定檔無法編輯，可使用模組，或透過設定檔提供者允許的自訂規則功能加入。

## RULE-SET {#rule-set}

選擇 **Surge / Surfboard RULE-SET** 並複製 `.list` 連結。在現有設定檔的 `[Rule]` 區段加入下列規則，放在可能先放行這些網域的一般規則與 `FINAL` 之前。範例使用完整防護方案；其他方案請換成自己複製的連結。

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge-RULE-SET.list,REJECT
```

保留原本的其他規則，儲存後重新載入設定並更新遠端資源。這種檔案包含 `DOMAIN`、`DOMAIN-SUFFIX` 等規則類型，不要填入模組連結。

## DOMAIN-SET {#domain-set}

選擇 **Surge / Surfboard DOMAIN-SET**，使用對應的網域清單：

```ini
[Rule]
DOMAIN-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge.list,REJECT
```

同樣依所選方案替換網址。DOMAIN-SET 使用純網域清單，開頭帶點號的項目表示包含子網域；它與 RULE-SET 的檔案內容不同，不能只更改類型名稱卻沿用另一種格式的連結。

## Surge 模組 {#module}

1. 在[產生器](./Sub.html?tool=surgeModule)選擇 **Surge Module**、決定方案，再複製 `.sgmodule` 連結。
2. 開啟 Surge 的**模組**管理，選擇從 URL 安裝，貼上連結並下載，再啟用模組。不要用模組取代整份設定檔。
3. 模組已包含 `REJECT` 規則，會加在主設定檔的規則前面。目前發布的內容只有網域攔截，不需要安裝根憑證或開啟 HTTPS 解密。
4. 請分別檢查模組與規則集的更新狀態，並定期透過應用程式更新模組。舊版若無法辨識參數，可改用上面的 RULE-SET。

## 匯入後確認生效

- 重新整理遠端資源或模組，確認下載成功且沒有解析錯誤，網址也與所選方案一致。
- 切換為 Rule 模式並開啟 Surge 連線。從下載的清單挑選一個確實存在的網域，讓測試請求經過 Surge，再於連線紀錄確認命中的規則與 **REJECT** 策略。
- 若仍然放行，請檢查前面的規則、模組是否啟用，以及流量是否繞過 Surge。若是其他規則先攔截，單看連線失敗並不能證明命中了這份清單。
- 切換方案時替換原網址並重新整理，避免同時啟用多份方案。

Surfboard 使用者可參考其 [RULE-SET](https://getsurfboard.com/docs/profile-format/rule/ruleset/) 與 [DOMAIN-SET](https://getsurfboard.com/docs/profile-format/rule/domainset/) 文件，採用上述兩種規則集方式；Surge 的模組步驟與版本要求不適用於 Surfboard。

官方依據：[Surge 規則集](https://manual.nssurge.com/rules/ruleset.html)、[網域規則與版本要求](https://manual.nssurge.com/rules/domain.html)、[模組](https://manual.nssurge.com/profile/module.html)。

## 更新與還原

暫時排查時，模組方式可停用本模組；RULE-SET / DOMAIN-SET 方式則註解對應規則，再重新載入目前的設定。保留其他規則，才能確認是否由這份清單造成差異。需要還原時使用修改前的備份；若模組先拒絕而蓋過主設定的允許例外，可先停用模組，改用能自行安排順序的規則集方式。
