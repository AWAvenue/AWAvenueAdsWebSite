# Quantumult X 使用教學

適用於支援遠端分流資源的 Quantumult X 1.x。文件與發布檔案核對日期：2026-10-26。本次未以 iOS 實機驗證介面，選單名稱可能因版本而異。

## 匯入所選方案

1. 在[訂閱產生器](./Sub.html?tool=quantumultX)選擇攔截偏好，複製 Quantumult X 的 `.list` 連結。請使用產生器提供的完整連結，保留所選方案。
2. 開啟 Quantumult X 設定，進入 **分流 → 資源規則**，新增遠端分流資源。不要加到節點訂閱或重寫資源。
3. 貼上連結，名稱可填 **秋風廣告規則（AWAvenue-Ads-Rule）**，並啟用資源。策略選擇 **reject**；若使用自訂策略群組，請確認群組目前也選到 **reject**。
4. 這份檔案已是對應格式，不需要開啟資源解析器。啟用自動更新後儲存，並下載資源。
5. 將運作模式切換為依規則分流，再開啟 Quantumult X 連線。

若習慣直接編輯設定檔，可在既有的 `[filter_remote]` 區段加入下列內容。範例是完整防護方案；若選擇其他方案，請把網址換成自己產生的連結。

```ini
[filter_remote]
https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list, tag=AWAvenue-Ads-Rule, force-policy=reject, update-interval=86400, opt-parser=false, enabled=true
```

這只是設定片段，請保留原本的節點、策略與其他規則，不要覆蓋整份設定檔。

## 確認是否生效

- 手動更新資源，確認下載到的是規則內容，而非 HTML 錯誤頁面。
- 從剛下載的方案挑選一個確實存在的網域，讓測試連線通過 Quantumult X，再於連線紀錄確認該網域套用 **reject**。僅看到連線失敗，還不足以證明是這份規則攔截。
- 若仍然放行，檢查運作模式、較早命中的規則及策略覆寫；若受到快取影響，可重新連線後再試。
- 切換方案時，請替換原資源的網址並重新整理，避免同時啟用多份不同方案。

語法依據：[Quantumult X 官方設定範例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)。

依过去式於 2024-06-02 撰寫的中文教學改寫，並更新匯入與驗證步驟。
