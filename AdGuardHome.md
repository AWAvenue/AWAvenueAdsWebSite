---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard Home：订阅、更新与验证

适用范围：已安装并可打开管理界面的 AdGuard Home 0.107.x，使用 Web 管理界面订阅 DNS blocklists。2026-10-26 核对官方文档、界面源码与公开规则，未实测路由器、NAS、Docker 或其他部署。安装、端口冲突及容器网络请先按[官方入门文档](https://adguard-dns.io/kb/adguard-home/getting-started/)处理。

## 准备与备份 {#prepare}

记录原先的客户端 DNS、路由器 DHCP DNS、上游 DNS 和已有允许规则；先在一台设备试用，再决定是否扩展至全网。管理界面地址不等于 DNS 服务地址，例如管理页的 `3000` 端口不是 DNS 查询端口。

在[订阅生成器](./Sub.md)选择 **AdGuard** 和需要的方案，复制**所选 URL**。该 URL 是过滤规则文本，不能填入“上游 DNS 服务器”。后续更新、换源和排错始终保留所选方案；不需要改成完整版。[发布文件示例](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt)是仅广告版，使用 `||域名^` 语法，不能改用 Clash YAML、Surge 模块或 sing-box JSON。

## 导入 DNS blocklists {#import}

1. 打开“过滤器 / Filters → DNS 黑名单 / DNS blocklists”。
2. 选择“添加黑名单 / Add blocklist → 添加自定义列表 / Add a custom list”。填写可识别的名称（如“秋风广告规则 · 所选方案”），粘贴**所选 URL**，保存并启用。
3. 检查下载没有报错，规则数不为零；确认“设置 / Settings → 常规设置 / General settings”中的“使用过滤器和 hosts 文件拦截域名 / Block domains using filters and hosts files”启用。
4. 如果客户端设置覆盖全局过滤选项，也检查测试设备对应的客户端配置。DNS allowlists 和自定义例外会改变结果。

功能与菜单依据 [AdGuard Home FAQ](https://adguard-dns.io/kb/adguard-home/faq/)及[官方界面源码](https://github.com/AdguardTeam/AdGuardHome/blob/master/client/src/__locales/en.json)。显示条数受列表去重、解析与版本影响，不以某个固定数字作为唯一成功标准。

## 更新列表 {#update}

在 DNS blocklists 页使用“检查更新 / Check for updates”，检查列表的更新时间、规则数以及错误提示；在常规设置确认过滤器更新间隔。此操作更新规则列表，不是升级 AdGuard Home 程序。自动更新间隔与列表配置见[官方配置文档](https://adguard-dns.io/kb/adguard-home/configuration/)。

若下载失败，先确认运行 AdGuard Home 的主机能够访问**所选 URL**，且返回规则文本而非错误页。需要换源时从生成器重新复制同一方案的另一来源，编辑原条目，避免叠加多个重复列表。不要仅凭 HTTP 200 或版本号相同认定内容最新。

## 确认客户端确实使用 AdGuard Home {#client-dns}

按[官方设备配置说明](https://adguard-dns.io/kb/adguard-home/getting-started/)把测试设备的 DNS 指向 AdGuard Home 的局域网地址；全网使用时可通过路由器 DHCP 分发。IPv4 与 IPv6 都需检查；不要额外填写不经过过滤的公共“备用 DNS”，客户端未必只在主 DNS 故障时才用它。

在有 `nslookup` 的测试电脑上运行下列命令。`192.168.1.2` **只是示例**，须替换为你的 AdGuard Home 地址：

```sh
nslookup example.org 192.168.1.2
nslookup example.org
```

第一条测试指定服务器是否可用；第二条测试当前默认解析路径。两次都到“查询日志 / Query log”查找时间、域名和客户端记录。若默认服务器显示路由器，可能由它转发，须靠日志进一步确认，不能只看地址判断失败。显式查询成功不能证明浏览器也使用相同 DNS；再用浏览器发起正常访问并观察日志。

没有新日志时，先确认日志已启用且没有排除该域名；随后检查客户端 DNS、DHCP 租约、防火墙、DNS 监听接口和容器端口。浏览器安全 DNS、Android 私人 DNS、VPN 或代理内置 DoH/DoT 可能绕开局域网 DNS。先记录这些设置，在测试设备上临时改为使用系统 DNS，验证后再按实际需求配置；本教程不声称自动接管所有加密 DNS。

## 检查命中和正常对照 {#verify}

从**当前下载的所选列表**选择一条确实存在的域名规则。仅查询该域名，无须打开广告页面：

```sh
nslookup ad.doubleclick.net 192.168.1.2
nslookup example.org 192.168.1.2
```

`ad.doubleclick.net` 是核验日仅广告版包含的示例；将来若移除，以当前列表为准。查询日志应显示第一条被拦截，详情列出命中规则及秋风广告规则列表；第二条用于正常解析对照。若对照域名被你自己的其他规则拦截，换一个已知正常域名。被其他列表或上游先拦截不能证明本订阅命中，必要时仅在测试客户端隔离其他过滤层再比较。

阻断答案可能是 `0.0.0.0`、`::`、`NXDOMAIN` 或 `REFUSED` 等，取决于阻断模式；单看答案或网站打不开不够。更新、放行后仍异常时，清理 AdGuard Home 与测试客户端的 DNS 缓存、重启相关应用或等待 TTL，避免旧缓存和连接影响判断。原理见 [DNS 规则语法](https://adguard-dns.io/kb/general/dns-filtering-syntax/)与[配置文档](https://adguard-dns.io/kb/adguard-home/configuration/)。

## 误拦截与回退 {#rollback}

先禁用本次新增的列表，复现同一操作；重新启用后再比较。确认误拦时，可在查询日志详情中解除对应域名拦截，随后到“自定义过滤规则 / Custom filtering rules”检查生成的例外。也可添加最小范围的 DNS 例外，例如 `@@||needed.example^`；这是占位示例，须换为已确认的必要域名，会允许其子域名，不应盲目放行整个服务。

检查 DNS allowlists、DNS rewrites、其他列表及上游是否仍拦截。AdGuard Home 的允许规则不能撤销上游 DNS 的阻断。若需完全回退，移除新增订阅和为此添加的例外，恢复原客户端 / DHCP DNS，更新租约并清理缓存；不要通过关闭所有安全功能来掩盖单条误拦截。

DNS 层过滤不能隐藏网页空位，不能保证拦截与正文共用域名的广告；对已缓存内容或应用直接使用 IP 的连接也有限制。Android 本机 AdGuard 请看[产品选择教程](./AdGuard.md)。
