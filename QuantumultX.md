---
lastVerified: 2026-10-26
verificationScope: docs
---

# Quantumult X 使用教程

适用范围：Quantumult X 1.x 的远程分流资源；本次对照官方配置示例与项目发布文件核验，未进行 iOS 实机导入。菜单名称可能随版本变化。

## 导入所选方案

1. 在[订阅生成器](./Sub.html?tool=quantumultX)选择拦截偏好，复制 **Quantumult X `.list`** 链接。保留这个链接，才能保留你选择的方案。
2. 打开 Quantumult X 设置，进入**分流 → 资源规则**，添加远程分流资源。这里不是节点订阅，也不是重写资源。
3. 粘贴链接，标签可填“秋风广告规则”，启用资源。将策略偏好设为 **reject**；若选择自定义策略组，确认该组当前也选中 **reject**。
4. 文件已是对应格式，**资源解析器保持关闭**。启用自动更新，保存并下载资源。官方示例中远程资源默认更新间隔为 86400 秒，即 24 小时。
5. 切换到按规则分流的工作模式，并开启 Quantumult X 连接。

无需先创建策略组。若希望在 `reject` 与 `direct` 间切换，可自行创建包含两者的策略组，再将其作为策略偏好；选中 `direct` 时会放行命中的请求。

## 直接编辑配置（可选）

在已有的 `[filter_remote]` 区段追加下面的资源行。下方使用完整防护方案；选择其他方案时，只把 URL 换成生成器给你的链接。

```ini
[filter_remote]
https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-QuantumultX.list, tag=AWAvenue-Ads-Rule, force-policy=reject, update-interval=86400, opt-parser=false, enabled=true
```

这是配置片段，保留已有节点、策略与其他规则，不要用它覆盖整份配置。`force-policy=reject` 会覆写该远程资源内的策略；不要改成当前选择了放行的策略组。

## 确认是否生效

- 手动刷新资源，检查下载内容包含规则，没有下载或解析错误，URL 与所选方案一致。
- 从刚下载的文件挑一个确实存在的域名，让请求经过 Quantumult X，在活动记录中确认命中该资源并使用 **reject**。仅看到超时不能证明命中了秋风广告规则。
- 再访问一个不在所选文件内的正常域名，确认没有把全部流量都拒绝。
- 若意外放行，检查工作模式、较早匹配的规则、策略偏好与策略组当前选项；重新连接后再测试，排除缓存和旧连接影响。

## 更新、切换与回退

切换方案时替换原资源 URL 并刷新，避免同时启用多份方案。遇到误拦截，先在活动记录确认命中的域名和资源，再添加有针对性的放行例外；临时排障可禁用这份远程资源并重新连接。若需要回退到旧配置，恢复你保存的配置备份。

语法依据：[Quantumult X 官方配置示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)。该文件说明了远程分流、策略覆写与更新间隔；本文的界面流程仍需按实际版本核对。

原教程由过去式于 2024-06-02 编写；当前版本重新整理了导入、验证与回退步骤。
