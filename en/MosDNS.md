# MosDNS v5 guide

Applies to **MosDNS v5 (verification version: 5.3.4)**. Documentation checked: **2026-10-26**. Router packages may generate their own configuration; use their custom-rule facility to avoid having your edits overwritten.

## Download the domain list

Select **MosDNS v5** and your profile in the [generator](./Sub.html?tool=mosdns). The `.txt` file is `domain_set` data, not a complete YAML configuration or an AdGuard list.

Run this Linux example from your MosDNS configuration directory. The URL below is the full profile; substitute your generated URL if you chose another profile.

```sh
mkdir -p rules
curl -fL --retry 2 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Mosdns_v5.txt' -o rules/awa-ads.txt.new
```

Check the download succeeded and contains expressions such as `full:domain` and `domain:domain`, rather than HTML or an empty file. Then rename it to `rules/awa-ads.txt`. Keep the old file on failure. On Windows, you can download and save the file manually.

## Load and use the list

This minimal standalone `config.yaml` listens on **127.0.0.1:5353** for testing. For an existing installation, merge the relevant plugins and sequence steps instead of replacing your configuration. Replace the example upstream with a DNS server you can reach if necessary.

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

Define `domain_set` before the sequence referencing it. Put its match/reject step in the sequence actually used by your listeners, before cache returns and forwarding. Merely defining the set does not filter anything. `reject 3` ends processing with NXDOMAIN.

## Start and verify

1. From the configuration directory, run `mosdns start -c config.yaml`. Check startup logs for missing files or plugin references. Use `-d` to specify the working directory when launching elsewhere.
2. Replace `blocked.example` below with a domain actually present in your downloaded profile. Run both UDP and TCP checks with `dig` installed:

```sh
dig @127.0.0.1 -p 5353 blocked.example A
dig +tcp @127.0.0.1 -p 5353 blocked.example A
dig @127.0.0.1 -p 5353 example.com A
```

3. The listed domain should return **NXDOMAIN**; the unlisted control should resolve through the upstream. If both fail, check connectivity and upstream settings. Ordinary device queries also need to use your deployed MosDNS service to be filtered.
4. After updating the file, restart/reload MosDNS through your deployment's supported procedure so the domain set is read again. For scheduled updates, download, validate, replace, then restart; retain the last working file on failure.

Official references: [v5 data plugins](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/shu-ju-cha-jian), [sequence and reject](https://irine-sistiana.gitbook.io/mosdns-wiki/mosdns-v5/ru-he-pei-zhi-mosdns/sequence-cha-jian), and [releases](https://github.com/IrineSistiana/mosdns/releases).
