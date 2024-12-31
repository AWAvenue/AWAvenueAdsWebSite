本教程所用到的所有工具如下（请确保你使用的是最新版本）：

- [Adguard](https://adguard.com/zh_cn/welcome.html)
- [Clash Meta For Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest)
- [Sing-Box](https://github.com/SagerNet/sing-box/releases/latest)

---

## **Adguard 的设置**

1. **设置 DNS 服务器**  
   使用 `防护 -> DNS 保护功能 -> DNS 服务器 -> 自动 DNS`

2. **排除对 Clash Meta For Android 或 Sing-Box 的路由**

---

## **Clash 与 Adguard 共存**

### **Clash 的设置**

1. **下载 Clash 的配置文件**

2. **获取 Clash 代理端口**  
   查看配置文件中的 `mixed-port` 或 `socks-port`。

3. **关闭 DNS**  
   手动编辑配置文件，设置如下：
   ```yaml
   dns:
      enable: false
   ```
见[虚空终端文档](https://wiki.metacubex.one/config/dns/#enable)

4. **本地导入修改后的配置文件**

5. **将 Clash 设置为仅代理模式**  
   关闭 `设置 -> 网络 -> 自动路由所有流量`。

---

### **Adguard 的设置**

1. 打开 `设置 -> 过滤 -> 网络 -> 代理 -> 代理服务器 -> 添加代理`。

2. 配置代理：
   - **代理类型**：选择 `SOCKS5`。
   - **代理主机**：填写 `127.0.0.1`。
   - **代理端口**：填入获取到的端口。
   - **高级设置**：
     - 可根据节点状态选择开启 `通过 SOCKS5 路由 UDP`。
     - **注意**：`使用 FakeDNS` 保持关闭。

---

## **Sing-Box 与 Adguard 共存**

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

- 仅实现了最基本的国内外分流，如有其他需求，请自行查看 [文档](https://sing-box.sagernet.org/zh) 进行修改。

---

### **Adguard 的设置**

1. 打开 `设置 -> 过滤 -> 网络 -> 代理 -> 代理服务器 -> 添加代理`。

2. 配置代理：
   - **代理类型**：选择 `SOCKS5`。
   - **代理主机**：填写 `127.0.0.1`。
   - **代理端口**：填入 `10808`。
   - **高级设置**：
     - 可根据节点状态选择开启 `通过 SOCKS5 路由 UDP`。
     - **注意**：`使用 FakeDNS` 保持关闭。