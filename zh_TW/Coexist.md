---
lastVerified: 2026-10-26
verificationScope: docs
---

# Android：AdGuard 與代理用戶端共存

適用範圍：AdGuard for Android 4.x 的本機 VPN 模式，加上**確實支援不啟動 VPN / TUN 的本機代理服務**。2026-10-26 核對官方文件；未在手機上驗證任何用戶端組合，不保證所有 Clash 分支或 sing-box 圖形用戶端都有相同開關。本文不提供代理節點，也不取代既有可用的代理設定。

## 先確定誰使用 Android VPN {#vpn}

Android 同一使用者 / 工作設定檔中只能有一個運作中的 VpnService。AdGuard 本機 VPN 與代理用戶端 TUN 同時啟用會互相取代；反覆授權無法解決。[Android 官方說明](https://developer.android.com/develop/connectivity/vpn)與 [AdGuard 路由模式](https://adguard.com/kb/adguard-for-android/features/settings/)說明了這項限制。

本頁採用這條路徑：

```text
應用程式 → AdGuard 本機 VPN / 過濾 → 127.0.0.1 本機代理 → 已設定的代理出口
```

AdGuard 使用 VPN；代理用戶端僅提供本機 SOCKS5 或相容的 HTTP 服務。若用戶端只能使用 VPN 模式，請先停在這裡：可改為在該代理用戶端直接使用[秋風廣告規則](./Knowledge.md)，或讓它連線至已訂閱規則的 [AdGuard Home](./AdGuardHome.md)，但 DNS 是否經過該伺服器仍須驗證。AdGuard 的 root 自動代理、手動 Wi-Fi 代理與 AdGuard VPN 專用整合是不同方案，不在本教學的操作範圍。

## 1. 先驗證本機代理 {#local-proxy}

備份可用設定，記錄應用程式版本、VPN / TUN 開關、實際監聽協定與連接埠。關閉代理用戶端的 VPN / TUN 接管，確認它仍能以前景服務執行並監聽 `127.0.0.1`。不要把本機入口綁定至 `0.0.0.0` 作為排錯捷徑。

- **Mihomo / Clash 系用戶端**：檢查用戶端是否提供「僅代理」執行方式，並在實際生效設定中核對 `socks-port`、`mixed-port` 等。開關名稱與啟用意義隨分支變化，不照搬舊版某個「自動路由」開關的開 / 關說明；一般 `port` 是 HTTP 入口，不能當作 SOCKS5。規則設定見 [Mihomo 教學](./Mihomo.md)。
- **官方 sing-box for Android（SFA）**：[官方功能說明](https://sing-box.sagernet.org/clients/android/features/)區分不需要 TUN 時的 ForegroundService 與需要 TUN 時的 VpnService。僅保留本機入站、移除或停用 `tun` 入站，保留你已驗證的出站與路由。其他圖形用戶端不一定支援此方式。

sing-box 本機 SOCKS 入站片段如下，合併至既有設定的 `inbounds` 陣列中；**它不是完整設定，也沒有代理出站**：

```json
{
  "type": "socks",
  "tag": "adguard-local",
  "listen": "127.0.0.1",
  "listen_port": 10808
}
```

欄位依據 [SOCKS 入站文件](https://sing-box.sagernet.org/configuration/inbound/socks/)。HTTP 或 mixed 入口須與 AdGuard 選擇的協定一致。[HTTP 入站文件](https://sing-box.sagernet.org/configuration/inbound/http/)中的 `set_system_proxy` 不能當作無特權 Android 上的通用系統代理方案；官方建議的 `tun.platform.http_proxy` 仍依賴 TUN，不適合本頁讓 AdGuard 獨占 VPN 的路徑。目前文件還包含標示「Since 1.15.0」的欄位，不應複製至較舊核心。

先透過用戶端本身的紀錄 / 連線測試確認本機入口與出口正常。有條件時用支援手動代理的測試工具發出正常 HTTPS 請求；節點延遲測試成功不一定證明本機入口可用。

## 2. 排除代理用戶端，避免迴圈 {#exclude}

在 AdGuard 的「應用程式管理 / App management」選擇**代理用戶端本身**，關閉「透過 AdGuard 路由流量 / Route traffic through AdGuard」。這樣代理出口連線不會重新送回自己的入口。不要把需要過濾與代理的一般應用程式一起排除。

接著在「設定 / Settings → 過濾 / Filtering → 網路 / Network → 代理 / Proxy → 代理伺服器 / Proxy server」新增本機入口：

| 欄位 | 填寫方式 |
| --- | --- |
| 類型 | 優先使用官方出站代理教學明確說明的 SOCKS5；須與入站協定相符 |
| 主機 | `127.0.0.1` |
| 連接埠 | 用戶端**實際監聽的連接埠**，僅上方片段使用 `10808` |
| 驗證 | 若入站啟用驗證，填寫相同帳號密碼 |

儲存並選取後，啟用 AdGuard 代理總開關。對需要代理的應用程式，同時檢查「透過 AdGuard 路由流量」與「透過代理路由」相關選項；被排除的應用程式不會自動經過這條路徑。官方依據：[出站代理設定](https://adguard.com/kb/adguard-for-android/solving-problems/outbound-proxy/)。若目前 AdGuard 提供 HTTP 選項，可配合一般 HTTP 代理入口測試 TCP / HTTPS；不要因為瀏覽器可用就認為 UDP / QUIC 也經過代理。SOCKS5 UDP 也需要入站、出站與遠端共同支援，初次驗證先不要啟用額外 UDP / FakeDNS 選項。

## 3. 明確 DNS 歸屬 {#dns}

先在 AdGuard 依[訂閱教學](./AdGuard.md#android-dns)匯入**所選方案 URL**並驗證 DNS 過濾，再加入代理。不要在共存排錯時換成完整版或另加一份重複清單。

DNS 可能由 AdGuard 本機防護、代理核心解析、SOCKS 遠端解析，或應用程式自己的 DoH 處理；代理連線成功不代表所有 DNS 都由 AdGuard 過濾。AdGuard 的「自動 DNS」在 SOCKS5 / VPN 整合情境中的選擇也不同於一般系統 DNS，見[官方 DNS 說明](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/)。因此不要把「自動 DNS」描述成固定上游。

不要機械式地把代理設定改成 `dns.enable: false`：核心可能仍需解析節點網域、規則集下載位址與路由目標。先保留已可運作的 DNS 設定，逐項觀察 AdGuard DNS 紀錄與代理紀錄。FakeIP / FakeDNS 的合成位址不能直接當作一般解析位址交給另一層；DNS 上游也不能指向會再次把查詢送回自己的解析器。瀏覽器或 Android 私人 DNS 是否繞過過濾，應在測試裝置逐項核實。AdGuard 的「過濾 DNS 請求」出站選項屬於[低階設定](https://adguard.com/kb/adguard-for-android/features/low-level-settings/)，僅在理解目前路徑後使用。

## 4. 分階段驗證與還原 {#verify}

1. **AdGuard 單獨執行**：出站代理關閉，正常網站可用；所選清單有可歸因的命中紀錄。
2. **本機代理單獨檢查**：不使用 VPN，監聽協定與連接埠正確，既有出口可用。
3. **連接兩者**：排除代理用戶端後啟用出站代理。正常網頁能開啟，代理紀錄出現來自本機入口的連線，出口符合預期；同時檢查一個應直接連線的請求。
4. **過濾對照**：查詢目前所選清單的一個網域，在 AdGuard 紀錄確認具體命中；再造訪正常網站。若只有代理紀錄、沒有 AdGuard DNS 紀錄，繼續查 DNS 路徑，不能宣稱已完成 DNS 防護。
5. **生命週期**：鎖定螢幕後、切換 Wi-Fi / 行動數據後，再檢查兩項服務與相同請求。依系統提示允許必要的背景執行，不把「通知還在」當作路徑正常。

無法連線時，**先在 AdGuard 關閉出站代理**，再停止本機代理；否則它仍會連線至已消失的監聽連接埠。若仍異常，還原原本的 DNS 與 VPN 設定，檢查系統「一律啟用 VPN / 不使用 VPN 則封鎖連線」是否與目前方案衝突。還原備份後從第一階段重試。網頁成功、代理出口與 DNS 命中是三個不同的檢查項目，都通過才可認為目前組合符合你的目標。
