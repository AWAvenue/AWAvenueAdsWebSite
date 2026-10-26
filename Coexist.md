---
lastVerified: 2026-10-26
verificationScope: docs
---

# Android：AdGuard 与代理客户端共存

适用范围：AdGuard for Android 4.x 的本地 VPN 模式，加上**确实支持不启动 VPN / TUN 的本机代理服务**。2026-10-26 核对官方文档；未在手机上验证任何客户端组合，不保证所有 Clash 分支或 sing-box 图形客户端都有相同开关。本文不提供代理节点，也不替代已有的可用代理配置。

## 先确定谁使用 Android VPN {#vpn}

Android 同一用户 / 工作资料中只能有一个活动的 VpnService。AdGuard 本地 VPN 与代理客户端 TUN 同时开启会互相替换；反复授权不能解决。[Android 官方说明](https://developer.android.com/develop/connectivity/vpn)与 [AdGuard 路由模式](https://adguard.com/kb/adguard-for-android/features/settings/)说明了这一限制。

本页采用这条路径：

```text
应用 → AdGuard 本地 VPN / 过滤 → 127.0.0.1 本机代理 → 已配置的代理出口
```

AdGuard 占用 VPN；代理客户端仅提供本机 SOCKS5 或兼容的 HTTP 服务。若客户端只能用 VPN 模式，先停在这里：可改为在该代理客户端直接使用[秋风广告规则](./Knowledge.md)，或让它连接已订阅规则的 [AdGuard Home](./AdGuardHome.md)，但 DNS 是否经过该服务器仍须验证。AdGuard 的 root 自动代理、手动 Wi-Fi 代理以及 AdGuard VPN 专用集成是不同方案，不在本教程的操作范围。

## 1. 先验证本机代理 {#local-proxy}

备份可用配置，记录应用版本、VPN / TUN 开关、实际监听协议及端口。关闭代理客户端的 VPN / TUN 接管，确认它仍能以前台服务运行并监听 `127.0.0.1`。不要把本机入口绑定到 `0.0.0.0` 作为排错捷径。

- **Mihomo / Clash 系客户端**：检查客户端是否提供“仅代理”运行方式，并在实际生效配置中核对 `socks-port`、`mixed-port` 等。开关名称与极性随分支变化，不照搬旧版某个“自动路由”开关的开 / 关说明；普通 `port` 是 HTTP 入口，不能当 SOCKS5。规则配置见 [Mihomo 教程](./Mihomo.md)。
- **官方 sing-box for Android（SFA）**：[官方功能说明](https://sing-box.sagernet.org/clients/android/features/)区分不需要 TUN 时的 ForegroundService 与需要 TUN 时的 VpnService。仅保留本机入站、移除或停用 `tun` 入站，保留你已验证的出站与路由。其他图形客户端不一定支持此方式。

sing-box 本机 SOCKS 入站片段如下，合并到已有配置的 `inbounds` 数组中；**它不是完整配置，也没有代理出站**：

```json
{
  "type": "socks",
  "tag": "adguard-local",
  "listen": "127.0.0.1",
  "listen_port": 10808
}
```

字段依据 [SOCKS 入站文档](https://sing-box.sagernet.org/configuration/inbound/socks/)。HTTP 或 mixed 入口须与 AdGuard 选择的协议一致。[HTTP 入站文档](https://sing-box.sagernet.org/configuration/inbound/http/)中的 `set_system_proxy` 不能当作无特权 Android 上的通用系统代理方案；官方建议的 `tun.platform.http_proxy` 仍依赖 TUN，不适合本页让 AdGuard 独占 VPN 的路径。当前文档还包含标明“Since 1.15.0”的字段，不应复制到较旧内核。

先通过客户端自身的日志 / 连接测试确认本机入口和出口正常。有条件时用支持手动代理的测试工具发起正常 HTTPS 请求；节点延迟测试成功不一定证明本机入口可用。

## 2. 排除代理客户端，避免循环 {#exclude}

在 AdGuard 的“应用管理 / App management”选择**代理客户端本身**，关闭“通过 AdGuard 路由流量 / Route traffic through AdGuard”。这样代理出口连接不会重新送回自己的入口。不要把需要过滤和代理的普通应用一并排除。

随后在“设置 / Settings → 过滤 / Filtering → 网络 / Network → 代理 / Proxy → 代理服务器 / Proxy server”添加本机入口：

| 字段 | 填写方式 |
| --- | --- |
| 类型 | 优先使用官方出站代理教程明确说明的 SOCKS5；须与入站协议匹配 |
| 主机 | `127.0.0.1` |
| 端口 | 客户端**实际监听的端口**，仅上面片段使用 `10808` |
| 认证 | 若入站启用认证，填写相同账号密码 |

保存并选中后，开启 AdGuard 代理总开关。对需要代理的应用，同时检查“通过 AdGuard 路由流量”和“通过代理路由”相关选项；被排除的应用不自动经过该链路。官方依据：[出站代理设置](https://adguard.com/kb/adguard-for-android/solving-problems/outbound-proxy/)。若当前 AdGuard 提供 HTTP 选项，可匹配普通 HTTP 代理入口测试 TCP / HTTPS；不要因为浏览器可用就认为 UDP / QUIC 也走代理。SOCKS5 UDP 也依赖入站、出站和远端共同支持，初次验证先不启用额外 UDP / FakeDNS 选项。

## 3. 明确 DNS 归属 {#dns}

先在 AdGuard 按[订阅教程](./AdGuard.md#android-dns)导入**所选方案 URL**并验证 DNS 过滤，再增加代理。不要在共存排错时换成完整版或另加一份重复列表。

DNS 可能由 AdGuard 本地保护、代理内核解析、SOCKS 远端解析，或应用自己的 DoH 处理；代理连接成功不代表所有 DNS 都由 AdGuard 过滤。AdGuard 的“自动 DNS”在 SOCKS5 / VPN 集成场景中的选择也不同于普通系统 DNS，见[官方 DNS 说明](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/)。因此不要把“自动 DNS”描述为固定的上游。

不要机械地把代理配置改成 `dns.enable: false`：内核可能仍需解析节点域名、规则集下载地址和路由目标。先保留已工作的 DNS 配置，逐项观察 AdGuard DNS 记录与代理日志。FakeIP / FakeDNS 的合成地址不可直接当作普通解析地址交给另一层；DNS 上游也不能指回会再次把查询送回自己的解析器。浏览器或 Android 私人 DNS 是否绕过过滤，应在测试设备逐项核实。AdGuard 的“过滤 DNS 请求”出站选项属于[低级设置](https://adguard.com/kb/adguard-for-android/features/low-level-settings/)，仅在理解当前链路后使用。

## 4. 分阶段验证与回退 {#verify}

1. **AdGuard 单独运行**：出站代理关闭，正常网站可用；所选列表有可归因的命中记录。
2. **本机代理单独检查**：不占 VPN，监听协议与端口正确，已有出口可用。
3. **连接两者**：排除代理客户端后启用出站代理。正常网页能打开，代理日志出现来自本机入口的连接，出口符合预期；同时检查一个应直连的请求。
4. **过滤对照**：查询当前所选列表的一条域名，在 AdGuard 日志确认具体命中；再访问正常网站。若只有代理日志、没有 AdGuard DNS 记录，继续查 DNS 路径，不能宣称已完成 DNS 防护。
5. **生命周期**：锁屏后、切换 Wi-Fi / 移动数据后再检查两项服务和相同请求。按系统提示允许必要后台运行，不把“通知还在”当作链路正常。

断网时，**先在 AdGuard 关闭出站代理**，再停止本机代理；否则它仍会连接已经消失的监听端口。若仍异常，恢复原 DNS 与 VPN 设置，检查系统“始终开启 VPN / 不使用 VPN 则阻止连接”是否与当前方案冲突。恢复备份后从第一阶段重试。网页成功、代理出口和 DNS 命中是三个不同的检查项目，都通过才可认为当前组合满足你的目标。
