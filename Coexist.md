本教程所用到的所有工具如下：
- [Clash Meta For Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest)
- [NekoBox For Android](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/latest)
- [Sing-Box](https://github.com/SagerNet/sing-box/releases/latest)
- [Adguard](https://adguard.com/zh_cn/welcome.html)

## **Clash 与 Adguard 共存**
### **Clash 的设置**
1. 将 Clash 设置为仅代理模式  
关闭设置-网络-自动路由所有流量。
2. 获取 Clash 代理端口  
建议使用复合端口，即配置文件中的 `mixed-port`，如果没有也可以使用 SOCKS 端口或 HTTP 端口，也可自行在设置-覆写中填入对应端口，例如 `7890`。
3. 获取 DNS 监听服务器  
在配置文件中寻找 `listen`，如果配置文件中没有，自行在设置-覆写-监听中填入，例如 `127.0.0.1:1053`。
### **Adguard 的设置**
1. 设置 DNS 服务器  
在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 `127.0.0.1:1053`。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。
2. 设置代理服务器  
在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 `127.0.0.1`，代理端口填入上面获取的端口。
## **NekoBox 与 Adguard 共存**
### **NekoBox 的设置**
1. 将 NekoBox 设置为仅代理模式  
设置-运行模式改为仅代理。
2. 获取 NekoBox 代理端口  
设置-入站设置-代理端口。
3. 获取 DNS 监听服务器  
设置-入站设置-本地 DNS 的端口。
4. 路由规则的设置  
启用默认规则即可，可看[文档](https://matsuridayo.github.io/nb4a-route)自行修改。
### **Adguard 的设置**
1. 设置 DNS 服务器  
在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 `127.0.0.1:6450`。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。
2. 设置代理服务器  
在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 `127.0.0.1`，代理端口填入上面获取的端口。
## **Sing-Box 与 Adguard 共存**
### **Sing-Box 示例配置**

<details>
  <summary>点击展开</summary>
  <pre><code>
{
  "log": {
    "level": "info"
  },
  "dns": {
    "servers": [
      {
        "tag": "dns_cloudflare",
        "address": "https://1.1.1.1/dns-query",
        "detour": "proxy"
      },
      {
        "tag": "dns_ali",
        "address": "https://223.5.5.5/dns-query",
        "detour": "direct"
      }
    ],
    "rules": [
      {
        "outbound": "any",
        "server": "dns_ali"
      },
      {
        "rule_set": "geosite-cn",
        "server": "dns_ali"
      },
      {
        "rule_set": "geosite-geolocation-!cn",
        "server": "dns_cloudflare"
      }
    ],
    "final": "dns_cloudflare",
    "strategy": "ipv4_only"
  },
  "ntp": {
    "enabled": true,
    "interval": "30m0s",
    "server": "time.apple.com",
    "server_port": 123,
    "detour": "direct"
  },
  "inbounds": [
    {
      "type": "socks",
      "listen": "::",
      "listen_port": 10808,
      "sniff": true,
      "sniff_override_destination": true
    },
    {
      "type": "direct",
      "listen": "::",
      "listen_port": 10853,
      "sniff": true
    }
  ],
  "outbounds": [
    {
      //粘贴你的客户端配置，需要保留 "tag": "proxy"
      "tag": "proxy"
    },
    {
      "type": "direct",
      "tag": "direct"
    },
    {
      "type": "block",
      "tag": "block"
    },
    {
      "type": "dns",
      "tag": "dns-out"
    }
  ],
  "route": {
    "rules": [
      {
        "protocol": "dns",
        "outbound": "dns-out"
      },
      {
        "ip_version": 6,
        "outbound": "block"
      },
      {
        "type": "logical",
        "mode": "or",
        "rules": [
          {
            "port": 853
          },
          {
            "network": "udp",
            "port": 443
          },
          {
            "protocol": "stun"
          }
        ],
        "outbound": "block"
      },
      {
        "ip_is_private": true,
        "outbound": "direct"
      },
      {
        "type": "logical",
        "mode": "or",
        "rules": [
          {
            "rule_set": "geoip-cn"
          },
          {
            "rule_set": "geosite-cn"
          }
        ],
        "outbound": "direct"
      },
      {
        "rule_set": "geosite-geolocation-!cn",
        "outbound": "proxy"
      }
    ],
    "rule_set": [
      {
        "type": "remote",
        "tag": "geosite-geolocation-!cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geosite-geolocation-!cn.srs",
        "download_detour": "proxy"
      },
      {
        "type": "remote",
        "tag": "geoip-cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geoip-cn.srs",
        "download_detour": "proxy"
      },
      {
        "type": "remote",
        "tag": "geosite-cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geosite-cn.srs",
        "download_detour": "proxy"
      }
    ],
    "final": "proxy"
  },
  "experimental": {
    "cache_file": {
      "enabled": true,
      "path": "cache.db",
      "store_rdrc": true
    }
  }
}
  </code></pre>
</details>

仅实现了最基本的国内外分流，如有其他需求请自行查看[文档](https://sing-box.sagernet.org/zh)进行修改。
### **Adguard 的设置**
1. 设置 DNS 服务器  
在防护-DNS保护功能-DNS服务器-自定义服务器中添加 `127.0.0.1:10853`。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。
2. 设置代理服务器  
在设置-过滤-网络-代理-代理服务器中添加，类型选择`SOCKS`，代理主机填写 `127.0.0.1`，代理端口填入`10808`。

其余代理软件与 Adguard 的共存方法类似，都是把 Adguard 的 DNS 服务器设置为代理软件本地的 DNS 服务器，Adguard 的代理服务器设置为代理软件的代理端口。