---
lastVerified: 2026-10-26
verificationScope: docs
---

# Loon 使用教程

适用范围：Loon 3.0.3+ 的插件功能；官方文档与发布文件核验日期：2026-10-26。本次未进行 iOS 实机导入，也未确认所有可选规则参数的最低版本。

## 导入插件

1. 在[订阅生成器](./Sub.html?tool=loon)选择方案并复制 **Loon `.module`** 链接。
2. 在 Loon 配置区域打开**插件**，添加远程插件，粘贴 URL、下载并启用。菜单名称可能随版本变化。
3. 选择按规则自动分流并启动 Loon。虽然文件后缀是 `.module`，它包含插件元信息和 `[Rule]` 区段，请作为插件导入，不要填到分流订阅或节点订阅中。
4. 刷新插件并核对下载内容和更新时间。这些域名拒绝规则不需要根证书或 HTTPS 解密。

## 可选：分流订阅方式

如果插件无法解析，请在[生成器](./Sub.html?tool=surgeRuleSet)选择 **Surge / Surfboard RULE-SET**，重新选择相同方案。将对应 `.list` URL 添加为**分流订阅**，选择 `REJECT` 并启用，停用原插件。

也可创建包含 `REJECT`、`DIRECT` 的自定义策略组，但实际拦截时必须选中 `REJECT`。不要把纯 DOMAIN-SET 文件作为 RULE-SET 导入。

## 确认生效

- 确认资源成功下载且没有解析错误。
- 从所选列表中挑一个确实存在的域名，通过 Loon 发起请求，在请求详情中确认命中规则和 `REJECT` 结果。
- 若被放行，检查本地规则：官方说明的优先级为本地规则高于插件规则，插件规则高于订阅规则。
- 改方案时替换原 URL 并刷新，避免多份方案同时启用。

依据：[Loon 插件文档](https://nsloon.app/en/docs/Plugin/)、[规则优先级](https://nsloon.app/en/docs/Rule/)、[本项目发布的 Loon 模块](https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Loon.module)。

原教程：ink_hitori，2025-03-22；本次按生成器当前提供的插件格式更新。

## 更新与回退

切换方案时替换原 URL 并刷新。临时排障时，停用本次添加的插件或分流订阅，再重新加载配置；不要为了停用一份列表而删除整个代理配置。确认误拦后，根据请求详情添加有针对性的本地放行规则，并核对本地规则优先级。需要回退时恢复修改前的备份。
