---
lastVerified: 2026-10-26
verificationScope: docs
---

# AdGuard：先选产品，再导入规则

适用范围：AdGuard for Android 4.x 的应用内订阅；其他平台仅提供官方入口。2026-10-26 核对官方文档和公开发布文件，未进行手机或桌面客户端实机测试。界面译名、许可及版本可能影响可用功能，请按功能名称寻找入口。

## 你使用的是哪一种 AdGuard？ {#choose-product}

| 产品 | 在哪里添加秋风广告规则 |
| --- | --- |
| AdGuard for Android | 本页的 DNS 过滤器，或自定义内容过滤器，二选一开始 |
| AdGuard Home（路由器、NAS、服务器） | [独立教程](./AdGuardHome.md)的 DNS blocklists |
| AdGuard for Windows / Mac | 本页末尾的[其他平台](#other-platforms)，不要照搬 Android 菜单 |
| AdGuard for iOS | 本页末尾的 DNS 保护入口，区分 Safari 内容拦截 |
| 公共 AdGuard DNS | 只能选择服务预设；把系统 DNS 改为它，不等于订阅秋风广告规则 |

个人 AdGuard DNS 是另一项云端服务：在自己的服务器面板中可管理用户规则，以及套餐允许的自定义 blocklists。它与公共 DNS、自己部署的 AdGuard Home 不同；自定义列表有额度限制，见[官方说明](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/)。

## 准备所选方案的订阅 URL {#subscription}

打开[订阅生成器](./Sub.md)，选择 AdGuard 和需要的方案，复制最终 URL。下文所有“所选 URL”均指这条链接；更新或切换来源时保留相同方案，别被网上的完整版示例覆盖。

AdGuard 发布文件使用 `||域名^` 等文本规则。本项目是域名拦截列表，不含网页元素隐藏规则，也不是 DNS 服务器地址或完整客户端配置。不要把 Clash YAML、sing-box JSON、Surge 模块粘贴进过滤器。可对照[当前仅广告版文件](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Adguard-Only.Ads.txt)与 [DNS 规则语法](https://adguard-dns.io/kb/general/dns-filtering-syntax/)。

## Android：使用 DNS 过滤器 {#android-dns}

这是希望在 DNS 查询阶段拦截域名时的入口；不需要为导入本列表额外开启 HTTPS 解密。

1. 启动 AdGuard 保护，完成应用要求的 Android VPN 授权。若另有 VPN，先看[共存教程](./Coexist.md)。
2. 进入“防护 / Protection → DNS 保护 / DNS protection”，启用 DNS 保护。
3. 打开“DNS 过滤器 / DNS filters”，添加自定义 DNS 过滤器，粘贴**所选 URL**。查看名称、规则数和下载结果，保存并启用。
4. 在 DNS 服务器选项中保留或选择你实际要用的上游。**订阅 URL 应填在过滤器中，不能填在 DNS 服务器地址栏。** 本地规则与上游服务商的拦截相互独立。

官方 [DNS 保护说明](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/)区分了服务器、过滤器与用户规则。DNS 拦截不能隐藏网页空白，也不能保证去除与正文共用域名的广告。

## Android：使用自定义内容过滤器 {#android-custom}

如果你已使用 AdGuard 的内容过滤，可进入“设置 / Settings → 过滤 / Filtering → 过滤器 / Filters → 自定义过滤器 / Custom filters”，选择添加，粘贴同一条**所选 URL**并启用。此入口对经过 AdGuard 内容过滤的请求应用规则，作用范围与 DNS 过滤不同；本列表自身仍只有域名规则。入口见[官方设置说明](https://adguard.com/kb/adguard-for-android/features/settings/)。

先选一个入口验证。把同一列表同时放进两个入口通常不能增加域名覆盖，反而会使定位命中来源更困难。这里只添加订阅，不要求你为此安装证书或打开所有过滤开关。

生成器中的 **AdGuard 补充规则（Replenish）** 是独立列表，没有四方案，不能替代前文所选订阅。它包含 URL 路径等非 DNS 规则，应按自定义内容过滤器处理；不能保证作为 AdGuard Home 或 DNS 过滤器完整生效。启用前阅读[当前补充文件](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Replenish.txt)中的影响说明。

## 更新与生效检查 {#verify}

在应用的更新操作中手动检查过滤器更新，并在“常规 / General → 应用和过滤器更新 / App and filter updates”确认自动更新。检查所选列表仍启用，最后更新时间与规则数合理；下载成功并不等于流量已经经过它。

1. 打开“统计 / Statistics → 最近活动 / Recent activity”。DNS 方案同时查看 DNS 统计或 DNS 请求记录。
2. 先访问正常网站，确认对应请求经过 AdGuard 且功能正常；没有记录时先排查路由、应用排除项、后台限制和浏览器独立加密 DNS。
3. 从**当前已下载的所选列表**选一条域名规则，发起该域名的 DNS 查询或访问请求。无需点击广告；请求失败本身不算证据。
4. 打开该请求详情，确认显示被拦截，并能归因到秋风广告规则或具体规则。若被其他过滤器或上游 DNS 先拦截，不能据此证明本订阅命中。

日志入口及请求详情见[官方统计说明](https://adguard.com/kb/adguard-for-android/features/statistics/)。已缓存的 DNS、已建立连接和应用自己的 DNS 都可能影响复现；关闭相关应用、清理可控缓存或等待 TTL 后重试。

## 误拦截与回退 {#rollback}

出现登录、图片或播放异常时，先仅停用新加的列表，重试同一操作；再启用并比较，避免一次改多个设置。确认误拦后，从请求详情创建最小范围的允许规则，并记录域名、命中列表和出错操作；DNS 白名单不能代替内容过滤白名单。不要直接放行整个服务的所有域名。需要完全撤回时，移除所选订阅，恢复原 DNS 设置，再清理相关缓存。

## Windows、macOS 与 iOS {#other-platforms}

以下只核对文档，未实测这些系统。进入对应产品的 DNS 过滤器添加**所选 URL**，再按该产品日志验证；不能把 Android 操作路径当作跨平台通用路径。

- **Windows**：当前[官方 DNS 保护说明](https://adguard.com/kb/adguard-for-windows/protection/dns-protection/)提供 DNS 过滤器及用户规则；旧版与新版设置布局不同。
- **macOS**：[DNS → Filters](https://adguard.com/kb/adguard-for-mac/features/dns/)管理 DNS 列表；不要混同 Safari 扩展的过滤器。
- **iOS / iPadOS**：[DNS protection](https://adguard.com/kb/adguard-for-ios/features/dns-protection/)中的 DNS filtering / DNS filters 用于 DNS 列表，相关功能取决于版本与许可；Safari protection 只负责 Safari 内容拦截，作用范围不同。

历史原稿：[天命](https://t.me/tmbyml)。2026-10-26 由秋风广告规则官网维护修订；旧视频不再作为完成步骤的依赖。
