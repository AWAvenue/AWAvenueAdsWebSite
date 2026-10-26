# MosDNS v5 使用教學

適用版本：**MosDNS v5（核對版本為 5.3.4）**；文件核對日期：**2026-10-26**。本教學使用原版 MosDNS 的 YAML 設定格式。路由器套件可能會自動產生設定檔，請使用其自訂規則功能，以免更新時覆蓋手動修改。

## 下載網域清單

在[訂閱產生器](./Sub.html?tool=mosdns)選擇 **MosDNS v5** 與所需方案，複製 `.txt` 連結。這份檔案是 `domain_set` 資料，不是 AdGuard 規則，也不是完整的 YAML 設定檔。

以下是 Linux 範例，請在自己的 MosDNS 設定目錄執行。網址使用完整防護方案；若選擇其他方案，請換成產生器提供的連結。

```sh
mkdir -p rules
curl -fL --retry 2 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Mosdns_v5.txt' -o rules/awa-ads.txt.new
```

確認下載成功，且內容為 `full:網域`、`domain:網域` 等網域表示式，而非網頁或空白檔案，再將它重新命名為 `rules/awa-ads.txt`。下載失敗時請保留舊檔。Windows 也可以手動下載並存到對應位置。

## 加入網域清單與攔截步驟

下列 `config.yaml` 是可獨立執行的最小範例，只接收本機 **127.0.0.1:5353** 的查詢，方便測試。正式使用時，請將相關項目合併到既有的 `plugins`，不要直接覆蓋整份設定檔。上游位址僅供示範，可換成你能正常連線的 DNS 伺服器。

```yaml
log:
  level: info
plugins:
  - tag: awa_domains
    type: domain_set
    args:
      files:
        - ./rules/awa-ads.txt
  - tag: upstream
    type: forward
    args:
      upstreams:
        - addr: 223.5.5.5
  - tag: main
    type: sequence
    args:
      - matches: qname $awa_domains
        exec: reject 3
      - exec: $upstream
  - tag: udp_listener
    type: udp_server
    args:
      entry: main
      listen: 127.0.0.1:5353
  - tag: tcp_listener
    type: tcp_server
    args:
      entry: main
      listen: 127.0.0.1:5353
```

`domain_set` 必須放在引用它的 `sequence` 之前。請把比對與 `reject 3` 加到實際處理查詢的 sequence，並放在快取回應、上游轉送等步驟之前。只載入網域清單，不會自動攔截查詢；`reject 3` 會回傳 NXDOMAIN 並結束處理。

## 啟動並確認生效

1. 在設定目錄執行 `mosdns start -c config.yaml`，確認啟動紀錄沒有檔案路徑或外掛參照錯誤。從其他目錄啟動時，可用 `-d` 指定工作目錄。
2. 從剛下載的方案挑一個確實存在的網域，替換下方的 `blocked.example`，再分別測試 UDP 和 TCP。執行測試的裝置須先安裝 `dig`。

```sh
dig @127.0.0.1 -p 5353 blocked.example A
dig +tcp @127.0.0.1 -p 5353 blocked.example A
dig @127.0.0.1 -p 5353 example.com A
```

3. 清單內的網域應回傳 **NXDOMAIN**；清單外的正常網域應由上游解析。若兩者都失敗，請先檢查上游與網路，不能直接判定規則有效。裝置的一般 DNS 查詢也必須使用你部署的 MosDNS 服務，才會受到過濾。
4. 更新清單後，請重新啟動 MosDNS，或使用部署套件提供的重新載入流程，讓 `domain_set` 讀取新檔案。只下載檔案不代表服務已套用更新。若安排排程更新，應依序下載、檢查內容、替換檔案並重新啟動；失敗時保留上次可用的檔案。

官方依據：[v5 資料外掛](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/shu-ju-cha-jian)、[sequence 與 reject](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/sequence-cha-jian)、[MosDNS 發布頁面](https://github.com/IrineSistiana/mosdns/releases)。
