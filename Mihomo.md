---
lastVerified: 2026-10-26
verificationScope: docs
---

# Mihomo 使用教程

适用于使用 Mihomo 内核、允许自定义 `rule-providers` 的客户端。核验基准为 **Mihomo 1.19.33**；旧版 Clash 或其他内核不保证支持相同格式，先在客户端查看实际内核与版本。

## 先选格式与方案

在[订阅生成器](./Sub.html?tool=clash)先选择工具格式，再回答方案偏好并复制 URL。三种写法择一即可；它们是规则集，不能作为完整的代理订阅导入。

| 生成器格式 | behavior | format | 教程 |
| --- | --- | --- | --- |
| [Clash / Mihomo YAML](./Sub.html?tool=clash) | `domain` | `yaml` | [域名 YAML](#yaml) |
| [Clash / Mihomo MRS](./Sub.html?tool=clashMrs) | `domain` | `mrs` | [MRS](#mrs) |
| [Clash / Mihomo Classical](./Sub.html?tool=clashClassical) | `classical` | `yaml` | [Classical YAML](#classical) |

核验日的完整方案中，domain YAML / MRS 各有 972 条，Classical YAML 有 976 条；Classical 另外包含 4 条 `DOMAIN-KEYWORD`。三种发布文件的表达能力和覆盖不完全相同，需要这些关键字规则时请选择 Classical。条数是当日快照，今后以实际文件为准。

以下全部是**配置片段**，URL 均为**完整防护方案**示例。使用其他方案或来源时，将 `url` 换成生成器实际复制的链接；同时保持文件格式与 `behavior` / `format` 对应，不能只改扩展名。

## 域名 YAML {#yaml}

发布文件有 `payload:`，条目是域名表达式（例如完整域名或 `+.example.com`），使用 `behavior: domain`。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## MRS 二进制规则集 {#mrs}

MRS 是二进制文件，不能用文本编辑器修改。本项目 MRS 是域名规则集，使用 `behavior: domain`、`format: mrs`；不使用 `behavior: classical`。若内核不支持，更新内核或改用上方域名 YAML。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: domain
    format: mrs
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash.mrs
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash.mrs"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## Classical YAML {#classical}

发布文件有 `payload:`，条目包含 `DOMAIN,` / `DOMAIN-SUFFIX,` 等规则类型，使用 `behavior: classical`、`format: yaml`。

```yaml
rule-providers:
  awa_ads:
    type: http
    behavior: classical
    format: yaml
    path: ./rule_providers/AWAvenue-Ads-Rule-Clash-Classical.yaml
    url: "https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Clash-Classical.yaml"
    interval: 86400
rules:
  - RULE-SET,awa_ads,REJECT
```

## 合并到持久配置

1. 备份当前能正常联网的配置。使用客户端提供的覆写、合并、扩展配置或脚本入口；这些入口各客户端不同，应查阅对应客户端说明。直接修改自动生成的订阅文件可能在下次更新时丢失。
2. 把所选片段的 `awa_ads` 合并到现有 `rule-providers`，把 `RULE-SET,awa_ads,REJECT` 插入现有 `rules`。不要重复创建同名顶层字段，也不要用示例替换原有节点、策略组和规则。
3. `rules` 从上到下匹配。把这一行放在 `MATCH`、大范围 `DIRECT` 等可能提前匹配的规则之前；确有需要的精确放行规则可放在它前面。`REJECT` 是内置拒绝策略，无需另建同名策略组。
4. 保留客户端的规则模式（Rule），保存后重载配置。`path` 是内核配置目录内的独立缓存路径；三种格式不要共用路径，目录需可写。

有命令行内核时，可在独立配置目录检查**合并后的完整配置**：

```sh
mihomo -t -d ./mihomo-check -f ./merged.yaml
```

Windows 使用实际的 `mihomo.exe` 路径。语法检查通过不代表规则已下载或真实流量已命中。

## 检查下载与命中

先在客户端或面板的规则集列表找到 `awa_ads`，确认条目数量非零、更新时间合理且日志无下载/解析错误。YAML 可核对 `payload` 和版本注释；MRS 应由内核成功载入，不能用“浏览器打开有乱码”判定失败。

再从当前所选列表选一个实际存在的域名，通过 Mihomo 代理入口发起一次请求，查看连接记录或日志是否显示命中 `awa_ads` 并使用 `REJECT`。同时访问一个正常网站作对照。不要仅凭广告消失或页面报错判断命中：缓存、其他规则及应用是否经过该内核都会影响结果。

若未命中，依次检查规则模式、运行配置中是否保留片段、规则顺序、应用是否经过 Mihomo，以及请求是否带有可供匹配的域名。这里的路由规则不会自动接管绕过内核的 DNS 或流量。

## 更新与回退

`interval: 86400` 表示内核运行期间按一天的间隔更新该 HTTP 规则集。也可在客户端或面板手动更新 `awa_ads`；更新主代理订阅不一定会立即刷新规则集。下载失败时先保留可用缓存，检查 URL、网络和格式，避免同时删除所有缓存。

误拦截时先查看具体命中域名，可临时在 `RULE-SET` 前添加精确放行规则，目标策略按原配置选择；不要一次放行整个大域名。需要整体停用时，删除或注释 `RULE-SET,awa_ads,REJECT` 并重载，必要时恢复备份。反馈请附内核版本、方案、命中域名与相关日志，隐藏订阅凭据及个人信息。

## 核验范围与来源

2026-10-26 核对官方文档及实际发布的三种文件。本文的内核验证范围见下方说明；客户端覆写界面、真实设备的代理接管及所有镜像未逐项实测。

本次使用官方 Mihomo 1.19.33 Windows 内核，校验发布资产 SHA-256 后，在独立目录对三种完整配置运行 `-t`，均通过；载入实际发布列表后，域名 YAML / MRS 各 972 条，Classical YAML 976 条。三种格式均通过本机临时代理验证一个列表内域名命中 `awa_ads` → `REJECT`，正常本机 HTTP 请求通过。验证使用独立缓存与回环监听，未修改系统代理或 DNS；它不代表真实客户端的配置合并界面或设备接管实测。

- [Mihomo 规则集合字段](https://wiki.metacubex.one/config/rule-providers/)
- [规则集合内容格式](https://wiki.metacubex.one/config/rule-providers/content/)
- [路由规则与匹配顺序](https://wiki.metacubex.one/config/rules/)
- [Mihomo 官方发布](https://github.com/MetaCubeX/mihomo/releases/tag/v1.19.33)
- [秋风广告规则发布文件](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/tree/main/Filters)
