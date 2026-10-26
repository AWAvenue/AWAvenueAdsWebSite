# MosDNS v5 使用教程

适用版本：**MosDNS v5（以 5.3.4 为核验版本）**；文档核验日期：**2026-10-26**。此处使用原版 MosDNS YAML 格式；路由器插件可能自行生成配置，请使用其自定义规则入口，避免更新时被覆盖。

## 下载域名列表

在[订阅生成器](./Sub.html?tool=mosdns)选择 **MosDNS v5** 和所需方案，复制 `.txt` 链接。这是 `domain_set` 数据，不是 AdGuard 规则或完整的 YAML 配置。

以下为 Linux 环境示例，在你的 MosDNS 配置目录执行。URL 是完整防护方案，使用其他方案时必须替换为自己的生成链接。

```sh
mkdir -p rules
curl -fL --retry 2 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Mosdns_v5.txt' -o rules/awa-ads.txt.new
```

确认下载成功且内容是 `full:域名` / `domain:域名` 等域名表达式，而不是网页或空文件，再将 `rules/awa-ads.txt.new` 改名为 `rules/awa-ads.txt`。下载失败时保留旧文件。Windows 也可手动下载并保存到对应位置。

## 加入 domain_set 和拦截步骤

下面是可单独运行的最小示例 `config.yaml`，仅监听本机 `127.0.0.1:5353`，便于测试。正式环境请合并到现有 `plugins`，不要覆盖整个配置；上游地址只是示例，可换成你能访问的 DNS。

```yaml
log:
  level: info
plugins:
  - tag: awa_domains
    type: domain_set
    args:
      files:
        - ./rules/awa-ads.txt
  - tag: upstream
    type: forward
    args:
      upstreams:
        - addr: 223.5.5.5
  - tag: main
    type: sequence
    args:
      - matches: qname $awa_domains
        exec: reject 3
      - exec: $upstream
  - tag: udp_listener
    type: udp_server
    args:
      entry: main
      listen: 127.0.0.1:5353
  - tag: tcp_listener
    type: tcp_server
    args:
      entry: main
      listen: 127.0.0.1:5353
```

`domain_set` 必须定义在引用它的 `sequence` 前。把匹配与 `reject 3` 放在实际处理请求的 sequence 中，并放在缓存命中返回、上游转发等步骤之前；只定义域名集不会产生拦截效果。`reject 3` 返回 NXDOMAIN 并终止处理。

## 启动与验证

1. 在配置目录执行 `mosdns start -c config.yaml`，检查启动日志没有文件路径或插件引用错误。其他工作目录请通过 `-d` 指定配置目录。
2. 从刚下载的列表中挑一个确实存在的域名，将下方 `blocked.example` 替换成它，再测试 UDP 和 TCP。使用 `dig` 的设备需自行安装该工具。

```sh
dig @127.0.0.1 -p 5353 blocked.example A
dig +tcp @127.0.0.1 -p 5353 blocked.example A
dig @127.0.0.1 -p 5353 example.com A
```

3. 命中的域名应返回 **NXDOMAIN**。不在列表中的正常域名应由上游解析；若两者都失败，先检查上游及网络，不能据此认定规则生效。系统普通查询也需要指向你实际部署的 MosDNS 服务，才会受到过滤。
4. 更新列表后，重启或使用部署方式提供的重新加载流程，让 `domain_set` 重新读入文件；仅下载新文件不代表进程已使用它。需要自动更新时，安排定时下载、内容检查、替换和重启，保留上次可用文件。

官方依据：[v5 数据插件](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/shu-ju-cha-jian)、[sequence 与 reject](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/sequence-cha-jian)、[MosDNS 发布页](https://github.com/IrineSistiana/mosdns/releases)。
