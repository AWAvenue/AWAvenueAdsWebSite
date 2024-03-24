本教程所用到的所有工具如下：
- [Clash Meta For Android](https://github.com/MetaCubeX/ClashMetaForAndroid/releases/latest)
- [NekoBox For Android](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/latest)
- [Adguard](https://adguard.com/zh_cn/welcome.html)

# **Clash 与 Adguard 共存**
## **Clash 的设置**
1. 将 Clash 设置为仅代理模式  
关闭设置-网络-自动路由所有流量。
2. 获取 Clash 代理端口  
建议使用复合端口，即配置文件中的 `mixed-port`，如果没有也可以使用 Socks 端口或 HTTP 端口，也可自行在设置-覆写中填入对应端口，例如 `7890`。
3. 获取 DNS 监听服务器  
在配置文件中寻找 `listen`，如果配置文件中没有，自行在设置-覆写-监听中填入，例如 `127.0.0.1:1053`。
## **Adguard 的设置**
1. 设置 DNS 服务器  
在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 `127.0.0.1:1053`。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。
2. 设置代理服务器  
在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 `127.0.0.1`，代理端口填入上面获取的端口。
# **NekoBox 与 Adguard 共存**
## **NekoBox 的设置**
1. 将 NekoBox 设置为仅代理模式  
设置-运行模式改为仅代理。
2. 获取 NekoBox 代理端口  
设置-入站设置-代理端口。
3. 获取 DNS 监听服务器  
设置-入站设置-本地 DNS 的端口。
4. 路由规则的设置  
启用默认规则即可，可看[文档](https://matsuridayo.github.io/nb4a-route)自行修改。
## **Adguard 的设置**
1. 设置 DNS 服务器  
在防护-DNS保护功能-DNS服务器-自定义服务器中添加上面获取到的 DNS，例如 `127.0.0.1:6450`。如果提示 DNS 服务器不可用，可到设置-通用-高级设置-低级设置中关闭验证 DNS 上游功能。
2. 设置代理服务器  
在设置-过滤-网络-代理-代理服务器中添加，类型选择代理端口的类型，代理主机填写 `127.0.0.1`，代理端口填入上面获取的端口。

其余代理软件与 Adguard 的共存方法类似，都是把 Adguard 的 DNS 服务器设置为代理软件本地的 DNS 服务器，Adguard 的代理服务器设置为代理软件的代理端口。代理软件负责分流，Adguard 决定软件走不走代理。