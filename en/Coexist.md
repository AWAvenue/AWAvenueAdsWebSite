---
lastVerified: 2026-10-26
verificationScope: docs
---

# Android: use AdGuard with a proxy client

Scope: AdGuard for Android 4.x in Local VPN mode, combined with a client that **can run a local proxy without starting VPN / TUN**. Official documentation was checked on 2026-10-26; no client combination was tested on a phone. Clash forks and sing-box graphical clients do not necessarily expose the same controls. This guide supplies no proxy nodes and assumes an existing working proxy configuration.

## Decide which app owns Android VPN {#vpn}

Only one VpnService can be active within an Android user or work profile. AdGuard Local VPN and a proxy client's TUN replace each other; granting permission repeatedly does not fix this. See [Android documentation](https://developer.android.com/develop/connectivity/vpn) and [AdGuard routing modes](https://adguard.com/kb/adguard-for-android/features/settings/).

This guide uses:

```text
App → AdGuard Local VPN / filtering → local proxy at 127.0.0.1 → configured proxy outbound
```

AdGuard owns VPN; the proxy client only exposes a local SOCKS5 or compatible HTTP service. If the client only supports VPN mode, stop here. Alternatives include using [this project's rules](./Knowledge.md) directly in that client, or connecting it to an [AdGuard Home](./AdGuardHome.md) instance with the list; the actual DNS path still needs verification. AdGuard root Automatic proxy, manual Wi-Fi proxy, and dedicated AdGuard VPN integration are separate setups outside this procedure.

## 1. Verify the local proxy first {#local-proxy}

Back up the working configuration and record app versions, VPN / TUN controls, listening protocol, and port. Disable VPN / TUN capture in the proxy client and confirm it still runs as a foreground service listening on `127.0.0.1`. Do not bind to `0.0.0.0` as a troubleshooting shortcut.

- **Mihomo / Clash clients**: confirm that your client supports a proxy-only mode. Inspect `socks-port` or `mixed-port` in its effective configuration. Controls and their on/off meanings vary by fork, so do not copy an old “automatic routing” instruction blindly. A plain `port` is an HTTP listener, not SOCKS5. See the [Mihomo guide](./Mihomo.md).
- **Official sing-box for Android (SFA)**: its [features documentation](https://sing-box.sagernet.org/clients/android/features/) distinguishes ForegroundService without TUN from VpnService when TUN is needed. Keep only local inbounds, remove or disable the `tun` inbound, and retain your verified outbounds and routing. Other graphical clients may not support this operation.

Merge this sing-box SOCKS inbound object into your existing `inbounds` array. **It is not a complete configuration and supplies no proxy outbound.**

```json
{
  "type": "socks",
  "tag": "adguard-local",
  "listen": "127.0.0.1",
  "listen_port": 10808
}
```

Fields follow the [SOCKS inbound documentation](https://sing-box.sagernet.org/configuration/inbound/socks/). HTTP or mixed listeners must match the protocol chosen in AdGuard. In the [HTTP documentation](https://sing-box.sagernet.org/configuration/inbound/http/), `set_system_proxy` is not a universal unprivileged Android system-proxy solution. The documented `tun.platform.http_proxy` alternative still needs TUN, which conflicts with this guide's AdGuard-owned VPN. The current docs also contain fields marked “Since 1.15.0”; do not copy these into older cores.

Use the client's logs or connection tests to verify the listener and outbound first. Where possible, make a normal HTTPS request with a tool supporting an explicit proxy. A successful node latency test alone does not verify the local listener.

## 2. Exclude the proxy client to prevent loops {#exclude}

In AdGuard **App management**, select the **proxy client itself** and disable **Route traffic through AdGuard**. This prevents its outbound connections from looping back into its own listener. Keep ordinary apps that need filtering and proxying included.

Add the listener under **Settings → Filtering → Network → Proxy → Proxy server**:

| Field | Value |
| --- | --- |
| Type | Prefer SOCKS5, explicitly covered by the official outbound guide; match the listener |
| Host | `127.0.0.1` |
| Port | The **actual listening port**; only the snippet above uses `10808` |
| Authentication | Match credentials if the inbound requires them |

Save, select it, and enable AdGuard's main Proxy switch. For ordinary apps, check both routing through AdGuard and routing through the proxy; excluded apps do not automatically enter this chain. See the official [outbound proxy guide](https://adguard.com/kb/adguard-for-android/solving-problems/outbound-proxy/). If your AdGuard version offers HTTP, match a plain HTTP listener and test TCP / HTTPS. A working browser does not prove UDP / QUIC proxying. SOCKS5 UDP also needs support from the listener, outbound, and remote server; leave extra UDP / FakeDNS options off for the initial test.

## 3. Establish who handles DNS {#dns}

First import the **selected profile URL** into AdGuard and verify it using the [DNS subscription guide](./AdGuard.md#android-dns), then add the proxy. Do not replace it with the full list or import a duplicate during troubleshooting.

DNS may be handled by AdGuard protection, the proxy core, a SOCKS remote resolver, or an app's own DoH. Working proxy connections do not prove all DNS is filtered by AdGuard. Its Automatic DNS behavior also changes with SOCKS5 / VPN integration; it is not one fixed upstream. See the official [DNS documentation](https://adguard.com/kb/adguard-for-android/features/protection/dns-protection/).

Do not mechanically set `dns.enable: false`: the core may still need DNS for node hostnames, rule downloads, and routing destinations. Keep the working DNS setup first and inspect AdGuard DNS entries and proxy logs one change at a time. Do not pass FakeIP / FakeDNS synthetic addresses to another layer as ordinary resolved addresses. Avoid upstreams that route queries back into themselves. Check browser DNS and Android Private DNS individually. AdGuard's outbound **Filter DNS requests** option is a [low-level setting](https://adguard.com/kb/adguard-for-android/features/low-level-settings/); use it only after understanding the actual path.

## 4. Verify in stages and roll back {#verify}

1. **AdGuard alone**: outbound proxy off, normal websites work, and the selected list has attributable hits.
2. **Local proxy alone**: no VPN ownership, correct listener protocol and port, working outbound.
3. **Connect them**: after excluding the proxy client, enable outbound proxy. Check a normal page, a connection from the local listener in proxy logs, the expected exit, and a request intended to go direct.
4. **Filtering control**: query a domain in the current selected list and confirm its matching rule in AdGuard logs; also test a normal website. Proxy logs without AdGuard DNS entries do not establish DNS protection.
5. **Lifecycle**: repeat after locking the screen and switching between Wi-Fi and mobile data. Allow necessary background operation as the OS requires; a remaining notification does not establish connectivity.

If connectivity fails, **disable AdGuard's outbound proxy before stopping the local proxy**. Otherwise AdGuard keeps connecting to a listener that no longer exists. If problems remain, restore previous DNS and VPN settings and inspect Android **Always-on VPN / Block connections without VPN** for conflicts. Restore the backup and restart from stage one. Page loading, proxy exit, and DNS filtering are separate checks; all must meet your intended behavior.
