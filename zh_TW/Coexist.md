本教程所用到的所有工具如下（請確保你使用的是最新版本）：

- [Adguard](https://adguard.com/zh_cn/welcome.html)
- [Clash Meta For Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest)
- [Sing-Box](https://github.com/SagerNet/sing-box/releases/latest)

---

## **Adguard 的設定**

1. **設定 DNS 伺服器**  
   使用 `防護 -> DNS 保護功能 -> DNS 伺服器 -> 自動 DNS`

2. **排除對 Clash Meta For Android 或 Sing-Box 的路由**

---

## **Clash 與 Adguard 共存**

### **Clash 的設定**

1. **下載 Clash 的配置檔**

2. **取得 Clash 代理端口**  
   查看配置檔中的 `mixed-port` 或 `socks-port`。

3. **關閉 DNS**  
   手動編輯配置檔，設定如下：
   ```yaml
   dns:
      enable: false
   ```
   參見[虛空終端 Docs](https://wiki.metacubex.one/config/dns/#enable)

4. **本地導入修改後的配置檔**

5. **將 Clash 設定為僅代理模式**  
   關閉 `設定 -> 網路 -> 自動路由所有流量`。

---

### **Adguard 的設定**

1. 開啟 `設定 -> 篩選 -> 網路 -> 代理 -> 代理伺服器 -> 新增代理`。

2. 配置代理：
   - **代理類型**：選擇 `SOCKS5`。
   - **代理主機**：填寫 `127.0.0.1`。
   - **代理端口**：填入取得的端口。
   - **進階設定**：
     - 可根據節點狀態選擇開啟 `透過 SOCKS5 路由 UDP`。
     - **注意**：`使用 FakeDNS` 保持關閉。

---

## **Sing-Box 與 Adguard 共存**

### **Sing-Box 共存示例配置**

- **1.11.0-alpha.7-**

  ```json
  {
    "inbounds": [
      {
        "type": "socks",
        "listen": "127.0.0.1",
        "listen_port": 10808,
        "sniff": true,
        "sniff_override_destination": true
      }
    ],
    "outbounds": [
      {
        "tag": "proxy"
      },
      {
        "type": "direct",
        "tag": "direct"
      }
    ],
    "route": {
      "rules": [
        {
          "rule_set": "geosite-cn",
          "outbound": "direct"
        },
        {
          "rule_set": "geoip-cn",
          "outbound": "direct"
        }
      ],
      "rule_set": [
        {
          "type": "remote",
          "tag": "geosite-cn",
          "format": "binary",
          "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/sing/geo/geosite/cn.srs"
        },
        {
          "type": "remote",
          "tag": "geoip-cn",
          "format": "binary",
          "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/sing/geo/geoip/cn.srs"
        }
      ]
    }
  }
  ```

- **1.11.0-alpha.7+**

  ```json
  {
    "inbounds": [
      {
        "type": "socks",
        "listen": "127.0.0.1",
        "listen_port": 10808
      }
    ],
    "outbounds": [
      {
        "tag": "proxy"
      },
      {
        "type": "direct",
        "tag": "direct"
      }
    ],
    "route": {
      "rules": [
        {
          "action": "sniff"
        },
        {
          "rule_set": "geosite-cn",
          "outbound": "direct"
        },
        {
          "rule_set": "geoip-cn",
          "outbound": "direct"
        }
      ],
      "rule_set": [
        {
          "type": "remote",
          "tag": "geosite-cn",
          "format": "binary",
          "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/sing/geo/geosite/cn.srs"
        },
        {
          "type": "remote",
          "tag": "geoip-cn",
          "format": "binary",
          "url": "https://github.com/MetaCubeX/meta-rules-dat/raw/refs/heads/sing/geo/geoip/cn.srs"
        }
      ]
    }
  }
  ```

- 僅實現了最基本的國內外分流，如有其他需求，請自行查看 [文件](https://sing-box.sagernet.org/zh) 進行修改。

---

### **Adguard 的設定**

1. 開啟 `設定 -> 篩選 -> 網路 -> 代理 -> 代理伺服器 -> 新增代理`。

2. 配置代理：
   - **代理類型**：選擇 `SOCKS5`。
   - **代理主機**：填寫 `127.0.0.1`。
   - **代理端口**：填入 `10808`。
   - **進階設定**：
     - 可根據節點狀態選擇開啟 `透過 SOCKS5 路由 UDP`。
     - **注意**：`使用 FakeDNS` 保持關閉。
