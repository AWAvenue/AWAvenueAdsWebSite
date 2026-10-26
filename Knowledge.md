---
lastVerified: 2026-10-26
verificationScope: docs
---

# 使用教程总览

先在[订阅生成器](./Sub.md)选择工具与方案，再按下方教程导入。秋风广告规则按域名过滤，不能精确分离同一域名下的广告与正常内容。规则集、模块、脚本和完整配置的用途不同，请使用与客户端入口一致的格式。

各教程的覆盖范围以页面说明为准；文档核验不代表所有客户端、版本和镜像均已实测。

## 按客户端选择

- [AdGuard](./AdGuard.md)：说明产品选择、Android 导入步骤与其他平台的 DNS 过滤入口。

- [AdGuard Home](./AdGuardHome.md)：适用于路由器或服务器的 DNS 过滤，优先从项目仓库选择方案订阅，也可直接勾选内置的 **AWAvenue Ads Rule**（秋风广告规则）；涵盖查询日志、更新与回退。

- [Android 共存说明](./Coexist.md)：说明过滤与代理同时使用时的本地 VPN 冲突及可选连接方式。

- [Mihomo](./Mihomo.md)：适用于 Mihomo 内核，分别使用 [domain YAML](./Mihomo.md#yaml)、[MRS](./Mihomo.md#mrs) 或 [Classical YAML](./Mihomo.md#classical)。

- [sing-box](./SingBox.md)：适用于 1.14.x，使用 source JSON 规则集与 DNS 拒绝。

- [Quantumult X](./QuantumultX.md)：导入远程分流 `.list`。

- [Shadowrocket](./ShadowRocket.md)：导入 `.module` 模块，另有 RULE-SET 替代方式。

- [Loon](./Loon.md)：导入 `.module` 插件，另有规则集替代方式。

- [Surge](./Surge.md)：区分 RULE-SET、DOMAIN-SET 与模块；Surfboard 兼容范围需另查客户端说明。

- [MosDNS v5](./MosDNS.md)：使用 `domain_set`，包含更新与 DNS 验证。

托管版 AdGuard DNS 与自建 AdGuard Home 是不同产品；托管服务的规则选择与套餐能力请查看 [AdGuard DNS 官方说明](https://adguard-dns.io/kb/private-dns/setting-up-filtering/blocklists/)，不要直接套用自建教程。

## 其他生成器格式

下列格式已有发布文件；此处只说明文件用途与官方入口，**尚未提供完整的安装、更新及实机验证教程**。需要维护 DNS、路由器配置或模块时，先备份并核对工具版本；不要把这些文件作为代理订阅或完整配置直接覆盖原设置。

### hosts / AdAway {#hosts}

`AWAvenue-Ads-Rule-hosts*.txt` 是 `IP 域名` 格式的 hosts 映射。使用支持 hosts 来源的工具；不包含子域名通配能力。参阅 [AdAway 官方项目](https://github.com/AdAway/AdAway)。本页不指导直接替换系统 hosts。

### Dnsmasq {#dnsmasq}

`AWAvenue-Ads-Rule-Dnsmasq*.conf` 含 `address=/域名/#` 指令，是待合并或包含的配置片段，不是纯域名清单。加载、配置检查与重启方法依发行版或路由器插件而异，参阅 [Dnsmasq 官方手册](https://thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)。

### SmartDNS {#smartdns}

`AWAvenue-Ads-Rule-SmartDNS*.conf` 含 `address /…/#` 指令。它不是 `domain-set` 所需的逐行纯域名文件，不能直接换进该入口；参阅 [SmartDNS 官方配置说明](https://pymumu.github.io/smartdns/config/)。具体版本及加载流程尚未实测。

### RouterOS AdList {#routeros-adlist}

`AWAvenue-Ads-Rule-RouterOS-Adlist*.txt` 是供 DNS Adlist 读取的 hosts 风格列表。需确认 RouterOS 版本具备 Adlist 功能，以及内存、更新和 DNS 服务配置；参阅 [MikroTik DNS 文档](https://help.mikrotik.com/docs/spaces/ROS/pages/37748767/DNS)。与下方脚本格式不可混用。

### RouterOS Script {#routeros-script}

`AWAvenue-Ads-Rule-RouterOS*.txt` 包含 `ip dns static add` 命令，会添加静态 DNS 项。它是脚本文本而不是 Adlist；没有在本教程中核验重复导入、删除旧项、更新事务与回退过程，暂不提供一键执行步骤。参阅 [RouterOS 官方文档](https://manual.mikrotik.com/docs/)。

### AdClose {#adclose}

`AWAvenue-Ads-Rule-AdClose*.rule` 包含 `domain, …` 等 AdClose 专用规则。只用于对应工具；模块版本、权限及导入步骤尚未覆盖，参阅 [AdClose 发布入口](https://github.com/Xposed-Modules-Repo/com.close.hook.ads)。

### Geosite 源文本 {#geosite}

`AWAvenue-Ads-Rule-Geosite*.txt` 含裸域名与 `full:` 等源文本条目，**不是编译后的 `geosite.dat`**，也不是 sing-box JSON。需由支持该源格式的构建流程处理；编译、标签命名与客户端加载未在本教程中覆盖。参阅 [v2fly/domain-list-community 格式说明](https://github.com/v2fly/domain-list-community)。

### AdGuard Replenish 补充规则 {#adguard-replenish}

`AWAvenue-Ads-Rule-Replenish.txt` 是独立的 AdGuard 补充过滤器，不提供四种方案。应先确认需要的补充过滤用途，再按 [AdGuard 自定义过滤器教程](./AdGuard.md#android-custom)选择正确入口；它不等于完整版 DNS 规则，含 URL 路径等非 DNS 语法，作为 AdGuard Home DNS 阻止列表不能完整生效。此补充列表的当前拦截效果尚未实测。

### 纯域名列表 {#dns}

纯域名列表通常每行一个域名，但精确匹配、后缀匹配及子域名语义由加载工具决定。生成器中的 MosDNS、Geosite、hosts 与各类 `.conf` 有各自语法，不能因后缀相似而当作纯域名清单互换。

格式说明核对了[项目实际发布文件](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters)；新增完整教程前，仍需分别验证工具版本、下载、命中与回退。

## 常见问题

### 为什么部分广告仍会显示？

广告若与正常内容共用域名，域名过滤可能无法单独处理；应用自带加密 DNS、缓存或绕过过滤路径也会影响结果。先在查询日志或连接记录确认请求是否经过工具、命中哪条规则。安装根证书不是本规则的通用生效步骤，也不会让域名规则自动获得页面元素过滤能力。

### 正常功能疑似被误拦截，如何处理？

先临时停用本列表，重试相同操作并查看日志；确认关联后，仅放行所需域名并复测。历史反馈包括[小米云备份 #38](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/38) 的 `a0.app.xiaomi.com`，以及[搜狗跨屏输入 #45](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues/45) 的 `shouji.sougou.com`。这些是历史案例，不是适用于所有设备的固定放行建议。

旧版文档还列过 CHANGHONG（长虹）电视更新、商店、投屏或付款功能相关的域名。当前设备、固件与所选方案可能不同，不能保证拦截不影响基本功能。需要排查时按当次日志逐一确认，不建议直接放行历史整份名单。

### 模块更新后断网，是否应更换某个第三方模块？

仅凭断网现象无法确定是模块脚本、端口冲突、DNS、上游还是规则造成。先停用最近的变更并恢复可用配置，再看对应工具的日志与维护说明。本站未持续验证第三方 Magisk 模块，不给出默认替换推荐；Android 共存问题可先看[共存说明](./Coexist.md)。
