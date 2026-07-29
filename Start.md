---
pageClass: start-page
---

# 🧭 快速开始

欢迎使用秋风广告规则。本页面帮你判断它是否适合自己，并用三个选择生成正确的订阅链接。

<div class="start-hero-actions">
  <a class="start-primary-action" href="/Sub.html">开始生成订阅</a>
  <a class="start-secondary-action" href="#选择你正在使用的工具">直接选择工具</a>
</div>

::: tip 三步完成

1. 选择准备导入规则的工具或格式。
2. 决定是否拦截隐私遥测和不受欢迎的网络行为。
3. 从国内镜像、官方源或备用线路中一键复制订阅。

:::

## 选择你正在使用的工具

已经知道自己使用什么工具？直接进入对应的订阅问答，选择会被自动带到下一页。

<div class="start-tool-grid">
  <a href="/Sub.html?tool=adguard"><strong>AdGuard</strong><span>AdGuard、AdGuard Home、AdGuard DNS</span></a>
  <a href="/Sub.html?tool=clashClassical"><strong>Clash / Mihomo</strong><span>推荐从 Classical 格式开始</span></a>
  <a href="/Sub.html?tool=quantumultX"><strong>Quantumult X</strong><span>适用于 Quantumult X 的规则列表</span></a>
  <a href="/Sub.html?tool=shadowrocket"><strong>Shadowrocket</strong><span>适用于 Shadowrocket 的模块格式</span></a>
  <a href="/Sub.html?tool=loon"><strong>Loon</strong><span>适用于 Loon 的模块格式</span></a>
  <a href="/Sub.html"><strong>其他工具或格式</strong><span>hosts、MosDNS、RouterOS、Surge、sing-box 等</span></a>
</div>

::: details 还没有选择工具？

- 希望在手机或电脑上直接使用：可以从 AdGuard 开始了解。
- 已经在使用代理客户端：选择对应客户端支持的规则格式。
- 希望为家庭网络统一过滤：查看 AdGuard Home、MosDNS、Dnsmasq 或 RouterOS。
- 只想修改系统 hosts：选择 hosts / AdAway 格式。

秋风广告规则不适用于 GKD、李跳跳等无障碍点击工具，也不适用于 AdGuard for Chrome 等浏览器扩展。

:::

## 当前版本与访问统计

<StartStatus />

## 秋风广告规则能做什么？

秋风广告规则从网络层拦截广告及相关请求，不需要为每个应用单独编写点击规则。它兼顾命中率、规则体积与硬件负担，并适配多种常见过滤工具。

| 可以帮助处理 | 无法保证解决 |
|---|---|
| 广告投放、竞价、素材和归因请求 | 与正常内容共用同一域名的广告 |
| 统计、遥测、崩溃收集和设备指纹 | 应用界面中广告消失后留下的空白 |
| 强制更新、P2P/PCDN、推送和云控下发 | 必须观看广告才能领取的奖励 |
| 多设备或路由器上的统一网络过滤 | 所有应用、所有地区的每一条广告 |

## 四种订阅方案

订阅生成器不会要求你记忆技术文件名，而是通过两道问题自动选择：

| 页面显示 | 包含内容 | 适合情况 |
|---|---|---|
| 完整防护 | 广告＋隐私＋不受欢迎 | 默认完整体验 |
| 纯广告 | 仅广告 | 兼容与最小干预优先 |
| 广告＋不受欢迎 | 不包含隐私规则 | 希望保留统计与遥测 |
| 广告＋隐私 | 不包含不受欢迎规则 | 希望保留更新、推送和相关连接 |

## 使用前请注意

1. 秋风广告规则不考虑观看广告领取奖励的场景。
2. 网络过滤无法移除应用界面元素，部分应用可能留下空白区域。
3. 隐私或不受欢迎分类可能影响少数统计、更新、推送等功能；订阅生成器允许你自行取舍。
4. 没有任何广告规则能够覆盖全部广告域名。发现误杀比漏拦更需要及时反馈。

::: warning 订阅前

请阅读[用户协议](./Protocol.md)和[使用教程](./Knowledge.md)。如果你使用的是 AdGuard、Quantumult X、Shadowrocket 或 Loon，也可以从生成结果直接进入对应教程。

:::

## 为什么采用网络层过滤？

| 特点 | 网络层过滤 | 无障碍点击 | Xposed Hook |
|---|---|---|---|
| 跨平台与路由部署 | 支持 | 主要限 Android | 主要限 Android |
| 广告资源是否仍会下载 | 通常不会 | 通常会 | 取决于实现 |
| 上手要求 | 较低 | 最低 | 较高，通常需要 root |
| 应用适配成本 | 较低 | 需要持续适配界面 | 需要持续适配代码 |

网络层过滤、无障碍点击和 Hook 解决的是不同问题，可以根据设备环境组合使用，但规则订阅不能直接导入无障碍点击工具。

## 遇到问题？

- 广告遗漏、误杀或规则建议：前往 [GitHub Issues](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/issues)。
- 订阅链接、工具使用和交流讨论：查看[用户交流与支持](./Support.md)。
- 准备开始：进入[互动式订阅生成器](./Sub.md)。
