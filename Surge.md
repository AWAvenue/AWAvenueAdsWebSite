# Surge 使用教程

适用范围：**Surge iOS 5.x / Mac 5.x、6.x** 的远程规则集；本项目模块使用的 `pre-matching` 需 **iOS 5.14.0+ / Mac 5.9.0+**。文档与发布文件核验日期：**2026-10-26**。本次未在 Apple 设备上实际导入，菜单位置以所用版本为准。

在[订阅生成器](./Sub.html?tool=surgeRuleSet)选择一种格式及方案。下面三种方式**任选一种**，不要重复导入。远程配置不可直接编辑时，可使用模块，或在配置提供方允许的自定义规则位置添加。

## RULE-SET {#rule-set}

选择 **Surge / Surfboard RULE-SET**，复制 `.list` 链接。编辑当前配置，在已有的 `[Rule]` 区段中添加下列一行，并放在可能提前放行这些域名的宽泛规则与 `FINAL` 之前。下方 URL 是完整版；其他方案请换成生成器复制的 URL。

```ini
[Rule]
RULE-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge-RULE-SET.list,REJECT
```

保留原有其他规则，保存后重新加载配置并更新远程资源。规则集每行包含 `DOMAIN`、`DOMAIN-SUFFIX` 等类型；不要将模块链接填到这里。

## DOMAIN-SET {#domain-set}

选择 **Surge / Surfboard DOMAIN-SET**，使用对应的域名列表：

```ini
[Rule]
DOMAIN-SET,https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge.list,REJECT
```

同样按你的方案替换 URL。DOMAIN-SET 是纯域名列表，带前导点的条目表示包含子域名；它与 RULE-SET 的文件内容不同，不能只改关键字却复用另一种格式的链接。

## Surge 模块 {#module}

1. 在[生成器](./Sub.html?tool=surgeModule)选择 **Surge Module**，选择方案并复制 `.sgmodule` 链接。
2. 在 Surge 的**模块**管理中选择从 URL 安装，粘贴链接并下载，然后启用。不要将模块作为整个配置文件替换现有配置。
3. 模块已包含 `REJECT` 规则，会插入主配置规则前方。当前发布内容只有域名拦截，不需要安装根证书或开启 HTTPS 解密。
4. 检查模块下载状态，定期使用客户端的模块更新功能；不要把规则集的更新状态等同于模块已更新。旧版如无法识别模块参数，可改用上面的 RULE-SET。

## 导入后确认生效

- 在远程资源或模块管理中刷新，确认下载成功且没有解析错误。配置中的 URL 应与所选方案一致。
- 使用 Rule 模式，开启 Surge 接管流量。从刚下载的列表中选一个确实存在的域名，发起请求并在请求记录里检查命中规则与 **REJECT** 策略。
- 若被放行，检查前置规则、模块是否启用，以及流量是否绕过 Surge；若其他规则抢先拒绝，仅有连接失败不能证明命中了本规则。
- 改方案时替换原 URL 并刷新，避免多份方案同时启用。

Surfboard 用户可参考其 [RULE-SET](https://getsurfboard.com/docs/profile-format/rule/ruleset/) 与 [DOMAIN-SET](https://getsurfboard.com/docs/profile-format/rule/domainset/) 文档，使用上述两种规则集方式；不要套用 Surge 的模块或版本要求。

官方依据：[Surge 规则集](https://manual.nssurge.com/rules/ruleset.html)、[域名规则与版本要求](https://manual.nssurge.com/rules/domain.html)、[模块](https://manual.nssurge.com/profile/module.html)。
