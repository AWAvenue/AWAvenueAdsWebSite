
# Shadowrocket使用秋风去广告规则指南

### 使用须知
去广告规则旨在拦截常见广告及隐私追踪，阻止广告域名请求有利于减轻设备负担，节省流量电量及保护隐私；但同时亦会造成某些小程序/App/游戏“看广告领福利”权利失效，凡事皆持两面性有得有失，望各位权衡利弊后决定是否使用本规则。（使用本规则默认放弃“看广告领福利”之权利。）

## ①设置广告规则操作步骤：
> 打开Shadowrocket  点击底栏第二项“配置”，
> 选择配置：default.conf为默认配置，强烈建议点击配置重命名为自定义名称配置，否则更新Shadowrocket版本后会被新版本默认配置覆盖 相当于恢复默认恢复配置 丢失去广告规则设置（专业用户自有配置或扩展配置的忽略即可）
> 点击当前使用配置或重名后的配置右侧感叹号，> 点击右上角“+”号，- “添加规则” ，
> 第一项类型选择“RULE-SET”，第二项策略选择“REJECT”，
> 第三项域名输入https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge-RULE-SET.list
> 点击右上角“保存”。
> 最后一步：点击打开Shadowrocket首页顶端VPN开关即可，此时秋风去广告规则完成生效。

------

## ②模块使用方法：
> 复制以下链接
https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Surge-module.sgmodule
> 点击底栏第二项“配置”，点击“模块”，
> 点击右上角“+” ，粘贴下载即可。


# ⚠️注意⚠️注意⚠️注意
### ①为去广告规则  ②为去广告模块，两者择一即可；建议使用①去广告规则，模块目前无法实现自动更新；以上教程为保证功效，请务必更新Shadowrocket至最新正式版后再实施操作。

> （鉴于iOS系统运存自动管理机制特性，
> 为避免Shadowrocket被系统杀掉VPN开关被系统关掉，有去广告刚需的朋友必须打开Shadowrocket设置 - “按需求连接” - 点击打开“始终开启”开关，
> 开启此功能后 即便系统杀掉VPN进程也会自动再次打开；

> 再点击Shadowrocket右下角设置 - “配置” - 打开自动后台更新，间隔多少天可自行选择；

> 最后打开iOS系统设置 - “通用” - “后台App刷新” - 点击顶部 “后台App刷新” - 选择“Wi-Fi与蜂窝数据”，返回上一级菜单，拉至底部 找到“Shadowrocket”，把开关打开，大功告成。）


编写时间：2025年11月14日05:31
