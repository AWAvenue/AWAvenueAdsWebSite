import{_ as o,o as t,c as u,R as e}from"./chunks/framework.emLw3Ecc.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Coexist.md","filePath":"Coexist.md"}'),q={name:"Coexist.md"},n=e(`<p>本教程所用到的所有工具如下：</p><ul><li><a href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest" target="_blank" rel="noreferrer">Clash Meta For Android</a></li><li><a href="https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/latest" target="_blank" rel="noreferrer">NekoBox For Android</a></li><li><a href="https://github.com/SagerNet/sing-box/releases/latest" target="_blank" rel="noreferrer">Sing-Box</a></li><li><a href="https://adguard.com/zh_cn/welcome.html" target="_blank" rel="noreferrer">Adguard</a></li></ul><h2 id="clash-与-adguard-共存" tabindex="-1"><strong>Clash 与 Adguard 共存</strong> <a class="header-anchor" href="#clash-与-adguard-共存" aria-label="Permalink to &quot;**Clash 与 Adguard 共存**&quot;">​</a></h2><h3 id="clash-的设置" tabindex="-1"><strong>Clash 的设置</strong> <a class="header-anchor" href="#clash-的设置" aria-label="Permalink to &quot;**Clash 的设置**&quot;">​</a></h3><ol><li>将 Clash 设置为仅代理模式<br> 关闭设置-网络-自动路由所有流量。</li><li>获取 Clash 代理端口<br> 建议使用复合端口，即配置文件中的 <code>mixed-port</code>，如果没有也可以使用 SOCKS 端口或 HTTP 端口，也可自行在设置-覆写中填入对应端口，例如 <code>7890</code>。</li><li>获取 DNS 监听服务器<br> 在配置文件中寻找 <code>listen</code>，如果配置文件中没有，自行在设置-覆写-监听中填入，例如 <code>127.0.0.1:1053</code>。</li></ol><h3 id="adguard-的设置" tabindex="-1"><strong>Adguard 的设置</strong> <a class="header-anchor" href="#adguard-的设置" aria-label="Permalink to &quot;**Adguard 的设置**&quot;">​</a></h3><ol><li>设置 DNS 服务器<br> 在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 <code>127.0.0.1:1053</code>。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。</li><li>设置代理服务器<br> 在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 <code>127.0.0.1</code>，代理端口填入上面获取的端口。</li></ol><h2 id="nekobox-与-adguard-共存" tabindex="-1"><strong>NekoBox 与 Adguard 共存</strong> <a class="header-anchor" href="#nekobox-与-adguard-共存" aria-label="Permalink to &quot;**NekoBox 与 Adguard 共存**&quot;">​</a></h2><h3 id="nekobox-的设置" tabindex="-1"><strong>NekoBox 的设置</strong> <a class="header-anchor" href="#nekobox-的设置" aria-label="Permalink to &quot;**NekoBox 的设置**&quot;">​</a></h3><ol><li>将 NekoBox 设置为仅代理模式<br> 设置-运行模式改为仅代理。</li><li>获取 NekoBox 代理端口<br> 设置-入站设置-代理端口。</li><li>获取 DNS 监听服务器<br> 设置-入站设置-本地 DNS 的端口。</li><li>路由规则的设置<br> 启用默认规则即可，可看<a href="https://matsuridayo.github.io/nb4a-route" target="_blank" rel="noreferrer">文档</a>自行修改。</li></ol><h3 id="adguard-的设置-1" tabindex="-1"><strong>Adguard 的设置</strong> <a class="header-anchor" href="#adguard-的设置-1" aria-label="Permalink to &quot;**Adguard 的设置**&quot;">​</a></h3><ol><li>设置 DNS 服务器<br> 在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 <code>127.0.0.1:6450</code>。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。</li><li>设置代理服务器<br> 在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 <code>127.0.0.1</code>，代理端口填入上面获取的端口。</li></ol><h2 id="sing-box-与-adguard-共存" tabindex="-1"><strong>Sing-Box 与 Adguard 共存</strong> <a class="header-anchor" href="#sing-box-与-adguard-共存" aria-label="Permalink to &quot;**Sing-Box 与 Adguard 共存**&quot;">​</a></h2><h3 id="sing-box-示例配置" tabindex="-1"><strong>Sing-Box 示例配置</strong> <a class="header-anchor" href="#sing-box-示例配置" aria-label="Permalink to &quot;**Sing-Box 示例配置**&quot;">​</a></h3><details><summary>点击展开</summary><pre><code>
{
  &quot;log&quot;: {
    &quot;level&quot;: &quot;info&quot;
  },
  &quot;dns&quot;: {
    &quot;servers&quot;: [
      {
        &quot;tag&quot;: &quot;dns_proxy&quot;,
        &quot;address&quot;: &quot;https://dns.cloudflare.com/dns-query&quot;,
        &quot;address_resolver&quot;: &quot;dns_resolver&quot;,
        &quot;detour&quot;: &quot;proxy&quot;
      },
      {
        &quot;tag&quot;: &quot;dns_direct&quot;,
        &quot;address&quot;: &quot;https://dns.alidns.com/dns-query&quot;,
        &quot;address_resolver&quot;: &quot;dns_resolver&quot;,
        &quot;detour&quot;: &quot;direct&quot;
      },
      {
        &quot;tag&quot;: &quot;dns_resolver&quot;,
        &quot;address&quot;: &quot;223.5.5.5&quot;,
        &quot;detour&quot;: &quot;direct&quot;
      }
    ],
    &quot;rules&quot;: [
      {
        &quot;outbound&quot;: &quot;any&quot;,
        &quot;server&quot;: &quot;dns_resolver&quot;
      },
      {
        &quot;rule_set&quot;: &quot;geosite-geolocation-!cn&quot;,
        &quot;server&quot;: &quot;dns_proxy&quot;
      },
      {
        &quot;rule_set&quot;: &quot;geosite-cn&quot;,
        &quot;server&quot;: &quot;dns_direct&quot;
      }
    ],
    &quot;final&quot;: &quot;dns_proxy&quot;,
    &quot;strategy&quot;: &quot;ipv4_only&quot;,
    &quot;independent_cache&quot;: true
  },
  &quot;ntp&quot;: {
    &quot;enabled&quot;: true,
    &quot;interval&quot;: &quot;30m0s&quot;,
    &quot;server&quot;: &quot;time.apple.com&quot;,
    &quot;server_port&quot;: 123,
    &quot;detour&quot;: &quot;direct&quot;
  },
  &quot;inbounds&quot;: [
    {
      &quot;type&quot;: &quot;socks&quot;,
      &quot;listen&quot;: &quot;::&quot;,
      &quot;listen_port&quot;: 10808,
      &quot;sniff&quot;: true
    },
    {
      &quot;type&quot;: &quot;direct&quot;,
      &quot;listen&quot;: &quot;::&quot;,
      &quot;listen_port&quot;: 10853,
      &quot;sniff&quot;: true
    }
  ],
  &quot;outbounds&quot;: [
    {
      //粘贴你的客户端配置，需要保留 &quot;tag&quot;: &quot;proxy&quot;
      &quot;tag&quot;: &quot;proxy&quot;
    },
    {
      &quot;type&quot;: &quot;direct&quot;,
      &quot;tag&quot;: &quot;direct&quot;
    },
    {
      &quot;type&quot;: &quot;block&quot;,
      &quot;tag&quot;: &quot;block&quot;
    },
    {
      &quot;type&quot;: &quot;dns&quot;,
      &quot;tag&quot;: &quot;dns-out&quot;
    }
  ],
  &quot;route&quot;: {
    &quot;rules&quot;: [
      {
        &quot;protocol&quot;: &quot;dns&quot;,
        &quot;outbound&quot;: &quot;dns-out&quot;
      },
      {
        &quot;ip_version&quot;: 6,
        &quot;outbound&quot;: &quot;block&quot;
      },
      {
        &quot;protocol&quot;: &quot;quic&quot;,
        &quot;outbound&quot;: &quot;block&quot;
      },
      {
        &quot;type&quot;: &quot;logical&quot;,
        &quot;mode&quot;: &quot;and&quot;,
        &quot;rules&quot;: [
          {
            &quot;rule_set&quot;: &quot;geoip-cn&quot;,
            &quot;invert&quot;: true
          },
          {
            &quot;rule_set&quot;: &quot;geosite-geolocation-!cn&quot;
          }
        ],
        &quot;outbound&quot;: &quot;proxy&quot;
      },
      {
        &quot;type&quot;: &quot;logical&quot;,
        &quot;mode&quot;: &quot;and&quot;,
        &quot;rules&quot;: [
          {
            &quot;rule_set&quot;: &quot;geoip-cn&quot;
          },
          {
            &quot;rule_set&quot;: &quot;geosite-cn&quot;
          }
        ],
        &quot;outbound&quot;: &quot;direct&quot;
      },
      {
        &quot;rule_set&quot;: &quot;geoip-cn&quot;,
        &quot;outbound&quot;: &quot;direct&quot;
      },
      {
        &quot;ip_is_private&quot;: true,
        &quot;outbound&quot;: &quot;direct&quot;
      }
    ],
    &quot;rule_set&quot;: [
      {
        &quot;type&quot;: &quot;remote&quot;,
        &quot;tag&quot;: &quot;geosite-geolocation-!cn&quot;,
        &quot;format&quot;: &quot;binary&quot;,
        &quot;url&quot;: &quot;https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geosite-geolocation-!cn.srs&quot;,
        &quot;download_detour&quot;: &quot;proxy&quot;
      },
      {
        &quot;type&quot;: &quot;remote&quot;,
        &quot;tag&quot;: &quot;geoip-cn&quot;,
        &quot;format&quot;: &quot;binary&quot;,
        &quot;url&quot;: &quot;https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geoip-cn.srs&quot;,
        &quot;download_detour&quot;: &quot;proxy&quot;
      },
      {
        &quot;type&quot;: &quot;remote&quot;,
        &quot;tag&quot;: &quot;geosite-cn&quot;,
        &quot;format&quot;: &quot;binary&quot;,
        &quot;url&quot;: &quot;https://raw.githubusercontent.com/CHIZI-0618/v2ray-rules-dat/release/singbox_rule_set/geosite-cn.srs&quot;,
        &quot;download_detour&quot;: &quot;proxy&quot;
      }
    ],
    &quot;final&quot;: &quot;proxy&quot;,
    &quot;auto_detect_interface&quot;: true,
    &quot;override_android_vpn&quot;: true
  },
  &quot;experimental&quot;: {
    &quot;cache_file&quot;: {
      &quot;enabled&quot;: true,
      &quot;path&quot;: &quot;cache.db&quot;
    }
  }
}
  </code></pre></details><p>仅实现了最基本的国内外分流，如有特殊需求请自行查看<a href="https://sing-box.sagernet.org/zh" target="_blank" rel="noreferrer">文档</a>进行修改。</p><h3 id="adguard-的设置-2" tabindex="-1"><strong>Adguard 的设置</strong> <a class="header-anchor" href="#adguard-的设置-2" aria-label="Permalink to &quot;**Adguard 的设置**&quot;">​</a></h3><ol><li>设置 DNS 服务器<br> 在防护-DNS保护功能-DNS服务器-自定义服务器中添加 <code>127.0.0.1:10853</code>。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。</li><li>设置代理服务器<br> 在设置-过滤-网络-代理-代理服务器中添加，类型选择<code>SOCKS</code>，代理主机填写 <code>127.0.0.1</code>，代理端口填入<code>10808</code>。</li></ol><p>其余代理软件与 Adguard 的共存方法类似，都是把 Adguard 的 DNS 服务器设置为代理软件本地的 DNS 服务器，Adguard 的代理服务器设置为代理软件的代理端口。</p>`,19),r=[n];function a(d,s,l,i,c,g){return t(),u("div",null,r)}const _=o(q,[["render",a]]);export{b as __pageData,_ as default};
