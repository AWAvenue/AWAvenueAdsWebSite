---
lastVerified: 2026-10-26
verificationScope: docs
---

# Shadowrocket 使用秋风广告规则教程

适用范围：Shadowrocket 2.x 的模块导入功能。发布文件与开发者产品资料核验日期：2026-10-26。本次未进行 iOS 实机导入，尚未确认每个可选规则参数的最低支持版本。

## 导入模块

1. 在[订阅生成器](./Sub.html?tool=shadowrocket)选择方案，复制 **Shadowrocket `.module`** 链接。
2. 打开 Shadowrocket **配置 → 模块**，添加 URL，粘贴链接并下载，然后为当前配置启用模块。菜单名称可能随版本变化。
3. 全局路由选择**配置**，开启连接。模块已包含 `REJECT` 策略，不要将它添加为节点订阅或普通 RULE-SET。
4. 刷新模块并核对更新信息。不要假设更新主配置就会更新模块，自动更新方式以当前客户端提供的功能为准。

当前模块仅包含域名拒绝规则，不需要安装根证书或开启 HTTPS 解密。

## 可选：规则集方式

如果客户端无法解析模块或其中的参数，请在[生成器](./Sub.html?tool=surgeRuleSet)选择 **Surge / Surfboard RULE-SET**，重新选择相同的拦截偏好。将对应 `.list` 链接作为 `RULE-SET` 添加到当前配置，策略选 `REJECT`，放在宽泛放行规则和最终规则之前，并停用原模块以避免重复。

## 确认生效

- 确认资源下载成功且包含预期域名规则，而不是 HTML 错误页。
- 从所选文件中挑一个确实存在的域名，通过 Shadowrocket 发起请求，在连接记录中检查命中规则与 `REJECT` 结果。
- 如果放行，检查当前配置、全局路由模式、模块开关和其他规则；仅看到超时不足以确认生效。
- 改方案时替换原模块 URL 并刷新，不要同时启用多份方案。

资料依据：[开发者的 App Store 产品说明](https://apps.apple.com/us/app/shadowrocket/id932747118)、[本项目发布的 Shadowrocket 模块](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Shadowrocket.module)。菜单流程沿用本站既有教程，本次未作设备验证。

原教程编写日期：2025-11-14；本次按生成器实际提供的模块格式更新。

## 更新与回退

切换方案时替换原 URL 并刷新。临时排障时，使用模块方式的就停用该模块，使用 RULE-SET 方式的就停用对应规则行，再重新加载当前配置并重新连接。确认误拦后，根据日志中的实际域名添加精确放行例外；恢复旧配置可使用修改前的备份。
