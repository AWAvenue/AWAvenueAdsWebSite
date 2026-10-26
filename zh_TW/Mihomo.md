---
lastVerified: 2026-10-26
verificationScope: docs
---

# Mihomo 使用教學

適用於使用 Mihomo 核心、允許自訂 `rule-providers` 的用戶端。核驗基準為 **Mihomo 1.19.33**；舊版 Clash 或其他核心不保證支援相同格式，請先在用戶端確認實際核心與版本。

## 先選格式與方案

在[訂閱產生器](./Sub.html?tool=clash)先選擇工具格式，再回答方案偏好並複製 URL。三種寫法擇一即可；這些是規則集，不能當作完整的代理訂閱匯入。

| 產生器格式 | behavior | format | 教學 |
| --- | --- | --- | --- |
| [Clash / Mihomo YAML](./Sub.html?tool=clash) | `domain` | `yaml` | [網域 YAML](#yaml) |
| [Clash / Mihomo MRS](./Sub.html?tool=clashMrs) | `domain` | `mrs` | [MRS](#mrs) |
| [Clash / Mihomo Classical](./Sub.html?tool=clashClassical) | `classical` | `yaml` | [Classical YAML](#classical) |

以下全部是**設定片段**，URL 均為**完整防護方案**範例。使用其他方案或來源時，將 `url` 換成產生器實際複製的連結；同時保持檔案格式與 `behavior` / `format` 對應，不能只改副檔名。

核驗日的完整方案中，domain YAML / MRS 各有 972 條，Classical YAML 有 976 條；Classical 另外包含 4 條 `DOMAIN-KEYWORD`。三種發布檔案的表達能力與涵蓋範圍並非完全相同，需要這些關鍵字規則時請選擇 Classical。條數是當日快照，之後以實際檔案為準。

## 網域 YAML {#yaml}

發布檔案含有 `payload:`，項目是網域表示式（例如完整網域或 `+.example.com`），使用 `behavior: domain`。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## MRS 二進位規則集 {#mrs}

MRS 是二進位檔案，不能用文字編輯器修改。本專案的 MRS 是網域規則集，使用 `behavior: domain`、`format: mrs`；不使用 `behavior: classical`。若核心不支援，請更新核心或改用上方網域 YAML。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: mrs
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.mrs
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.mrs"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## Classical YAML {#classical}

發布檔案含有 `payload:`，項目包含 `DOMAIN,` / `DOMAIN-SUFFIX,` 等規則類型，使用 `behavior: classical`、`format: yaml`。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: classical
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash-Classical.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash-Classical.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## 合併至持久設定

1. 備份目前可正常連線的設定。使用用戶端提供的覆寫、合併、擴充設定或指令碼入口；各用戶端不同，請查閱對應說明。直接修改自動產生的訂閱檔案，可能在下次更新時遺失變更。
2. 把所選片段的 `awa_ads` 合併到現有 `rule-providers`，把 `RULE-SET,awa_ads,REJECT` 插入現有 `rules`。不要重複建立同名頂層欄位，也不要用範例取代原有節點、策略群組和規則。
3. `rules` 由上而下比對。把這一行放在 `MATCH`、大範圍 `DIRECT` 等可能先比對成功的規則之前；確有需要的精確放行規則可放在它前面。`REJECT` 是內建拒絕策略，無須另建同名策略群組。
4. 使用規則模式（Rule），儲存後重新載入設定。`path` 是核心設定目錄內的獨立快取路徑；三種格式不要共用路徑，目錄必須可寫入。

若可使用命令列核心，可在獨立設定目錄檢查**合併後的完整設定**：

```sh
mihomo -t -d ./mihomo-check -f ./merged.yaml
```

Windows 請使用實際的 `mihomo.exe` 路徑。語法檢查通過不代表規則已下載或真實流量已命中。

## 確認下載與命中

先在用戶端或面板的規則集清單找到 `awa_ads`，確認項目數量不為零、更新時間合理，且記錄中沒有下載或解析錯誤。YAML 可核對 `payload` 和版本註解；MRS 應由核心成功載入，不能用「瀏覽器開啟有亂碼」判定失敗。

再從目前所選清單挑選一個實際存在的網域，經由 Mihomo 代理入口發出請求，查看連線紀錄或記錄是否顯示命中 `awa_ads` 並使用 `REJECT`。同時開啟一個正常網站作對照。不要只憑廣告消失或頁面出錯判斷命中：快取、其他規則，以及應用程式是否經過該核心，都會影響結果。

若未命中，依序檢查規則模式、執行中的設定是否保留片段、規則順序、應用程式是否經過 Mihomo，以及請求是否帶有可供比對的網域。此處的路由規則不會自動接管繞過核心的 DNS 或流量。

## 更新與還原

`interval: 86400` 表示核心執行期間以一天的間隔更新該 HTTP 規則集。也可在用戶端或面板手動更新 `awa_ads`；更新主代理訂閱不一定會立即重新整理規則集。下載失敗時先保留可用快取，檢查 URL、網路和格式，避免同時刪除所有快取。

誤擋時先查看命中的網域，可暫時在 `RULE-SET` 前加入精確放行規則，目標策略依原設定選擇；不要一次放行整個上層網域。若要整體停用，移除或註解 `RULE-SET,awa_ads,REJECT` 並重新載入，必要時還原備份。回報請附核心版本、方案、命中網域與相關記錄，隱藏訂閱憑證及個人資訊。

## 核驗範圍與來源

2026-10-26 核對官方文件及實際發布的三種檔案。本文的核心驗證範圍見下方說明；用戶端覆寫介面、實體裝置的代理接管及所有鏡像未逐項實測。

本次使用官方 Mihomo 1.19.33 Windows 核心，核對發布資產的 SHA-256 後，在獨立目錄對三種完整設定執行 `-t`，均通過；載入實際發布清單後，網域 YAML / MRS 各 972 筆，Classical YAML 976 筆。三種格式均經由本機臨時代理，驗證一個清單內網域命中 `awa_ads` → `REJECT`，正常本機 HTTP 請求通過。驗證使用獨立快取與回環監聽，未修改系統代理或 DNS；這不代表已實測用戶端的設定合併介面或裝置接管。

- [Mihomo 規則集合欄位](https://wiki.metacubex.one/config/rule-providers/)
- [規則集合內容格式](https://wiki.metacubex.one/config/rule-providers/content/)
- [路由規則與比對順序](https://wiki.metacubex.one/config/rules/)
- [Mihomo 官方發布](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.33)
- [秋風廣告規則發布檔案](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters)
