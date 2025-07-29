---
layout: page
pageClass: subscription-page
---

# Subscription Rules

<SubscribeLinkList>
  <!-- ### Subscription Source Information ### -->

  <!-- Default -->
  <template #nosrc> Please select a subscription format </template>
  <template #nosrcInfo>
  Different tools require different subscription formats. Please choose your network filtering tool from the menu.

  ::: danger Attention

  **Before subscribing, please be sure to read the [User Protocol](./Protocol.md) and [Usage Guide](./Knowledge) thoroughly, and confirm you have the ability to troubleshoot issues yourself.**

  Due to the wide variety of ad-blocking and proxy tools available, we can't cover every scenario. If you can't find a suitable rule or guide, we apologize. If you’re able, we welcome your contributions to help improve the project (including this page).

  :::

  ## Feedback & Community Group

  [Click to view](/Support.html)

  ## Latest Version

  <Version hidden>Changelog is provided by GitHub. If loading fails continuously, please try a different network environment.</Version>

  Version: <Version version>Praying for updates...</Version>

  Updated: <Version date>Praying for updates...</Version> (UTC)

  <Version info>Praying for updates...</Version>

  ## Total Visits

  <p align="left">
    <img src="https://count.getloli.com/get/@TG-Twiligh?theme=booru-helltaker" alt="Profile Views" width="666"/>
  </p>
  Statistics started in June 2024. Data may occasionally be inaccurate...
  </template>

  <!-- Github Raw -->
  <template #ghraw> Github Raw </template>
  <template #ghrawInfo>
  Direct file link from Github, updated in real time, highest reliability.
  </template>

  <!-- TMBy CDN Proxy -->
  <template #tmby> TMBy CFCDN Proxy </template>
  <template #tmbyInfo>
  Private CloudFlare proxy subscription link provided by [@TMBy](https://github.com/tmby), one of the rule maintainers.
  </template>

  <!-- jsDelivr -->
  <template #jsdelivr> jsDelivr </template>
  <template #jsdelivrInfo>
  Official jsDelivr accelerated subscription. Fast and relatively stable access, but updates are slower—about every 3 to 7 days.
  </template>

  <template #ghproxy>ghproxy Proxy</template>
  <template #ghproxyInfo>
  ghproxy subscription address, updates quickly but stability is poor. ~~gitProxy is unreliable, domains are frequently blocked. If blocked again, we’ll stop using it.~~
  </template>

  <!-- CXPLAY -->
  <template #cxplay> CXPLAY Mirror Subscription </template>
  <template #cxplayInfo>
  Real-time mirror subscription service provided by community volunteer CXPLAY, optimized for the Teyvat region.
  </template>

  <!-- Uura -->
  <template #uura> Uura Mirror Subscription </template>
  <template #uuraInfo>
  Mirror service provided by community volunteer Uura, updates every hour, optimized for the Teyvat region.
  </template>

  <!-- ### Tool Information ### -->

  <!-- AdGuard -->
  <template #adguard> AdGuard Subscription Link </template>
  <template #adguardInfo> All AdGuard family products except AdGuard for Chrome are supported. If your tool supports (or partially supports) adblock syntax, you can also try, e.g. DNS ad-blocking. </template>

  <!-- AdGuard Supplementary Rules -->
  <template #adguardReplenish> AdGuard Supplementary Rules </template>
  <template #adguardReplenishInfo>
  Tips: “AWAvenue Ads Rule – Supplementary Rules” only provides subscription links for “AdGuard Home/DNS”. For other formats, please convert them yourself.

  [What are Supplementary Rules?](https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/assets/README_Update.md#:~:text=%E6%96%B0%E5%A2%9E%EF%BC%9CAWAvenue%2DAds%2DRule%2DReplenish%E2%80%9D%EF%BC%8C%E7%A7%8B%E9%A3%8E%E5%B9%BF%E5%91%8A%E8%A7%84%E5%88%99%E7%9A%84%E8%A1%A5%E5%85%85%E8%A7%84%E5%88%99%EF%BC%8C%E6%AD%A4%E8%A7%84%E5%88%99%E5%8C%85%E5%90%AB%E4%B8%80%E4%BA%9B%E8%BE%83%E4%B8%BA%E6%BF%80%E8%BF%9B%E7%9A%84%E8%A2%AB%E6%8B%A6%E6%88%AA%E5%9F%9F%E5%90%8D%EF%BC%88%E6%BF%80%E8%BF%9B%E7%A8%8B%E5%BA%A6%E8%BF%9C%E8%BF%9C%E4%B8%8D%E5%A6%82%E2%80%9CAWAvenue%2DAds%2DRule%2DStrict%E6%BF%80%E8%BF%9B%E7%89%88%E2%80%9D%EF%BC%89%EF%BC%8C%E4%B8%94%E6%AF%8F%E4%B8%AA%E9%83%BD%E9%85%8D%E6%9C%89%E7%9B%B8%E5%85%B3%E7%9A%84%E8%AF%B4%E6%98%8E%E3%80%82%E8%BF%99%E4%BA%9B%E5%9F%9F%E5%90%8D%E9%80%9A%E5%B8%B8%E6%9D%A5%E8%AE%B2%E4%B8%8D%E4%BC%9A%E5%A4%AA%E5%BD%B1%E5%93%8D%E4%BD%A0%E7%BD%91%E7%BB%9C%E7%9A%84%E6%AD%A3%E5%B8%B8%E4%BD%BF%E7%94%A8%EF%BC%8C%E4%BD%86%E8%BF%98%E6%98%AF%E4%B8%BA%E6%9C%89%E9%9C%80%E8%A6%81%E7%9A%84%E4%BA%BA%E6%8F%90%E4%BE%9B%E4%BA%86%E4%B8%80%E4%B8%AA%E9%80%89%E6%8B%A9%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E8%87%AA%E7%94%B1%E9%80%89%E6%8B%A9%E6%98%AF%E5%90%A6%E8%AE%A2%E9%98%85%E3%80%82)
  </template>

  <!-- hosts -->
  <template #hosts> hosts Subscription Link </template>
  <template #hostsInfo>
  This is the most universal format—simple to write, and theoretically usable anywhere you can modify the system hosts file. We recommend [AdAway](https://adaway.org/).

  For AdAway users with KernelSU, you should also flash the [Systemless-hosts-KernelSU](https://github.com/symbuzzer/systemless-hosts-KernelSU-module) module.
  </template>

  <!-- Clash -->
  <template #clash> Clash Subscription Link </template>
  <template #clashInfo>
  Official kernel is not supported. Only Premium or Meta versions of Clash are supported. QuantumultX is also compatible after configuration, but we also provide a “.list” subscription link for QuantumultX below.

  *Refer to the [Usage Guide](./Knowledge) for specific syntax.*

  *For users without root who use both Clash and AdGuard for Android, see the [AdGuard Coexistence Guide](https://awavenue.top/Coexist.html).*
  </template>

  <!-- Clash Classical -->
  <template #clashClassical> Clash Classical Subscription Link </template>
  <template #clashClassicalInfo>
  Official kernel is not supported. Only Premium or Meta versions of Clash are supported. QuantumultX is also compatible after configuration, but we also provide a “.list” subscription link for QuantumultX below.

  *Refer to the [Usage Guide](./Knowledge) for specific syntax.*

  *For users without root who use both Clash and AdGuard for Android, see the [AdGuard Coexistence Guide](https://awavenue.top/Coexist.html).*
  </template>

  <!-- dnsmasq -->
  <template #dnsmasq> Dnsmasq.conf Subscription Link </template>

  <!-- Surge Module -->
  <template #surgeModule>Surge.sgmodule Subscription Link </template>

  <!-- Surge/Surfboard DOMAIN-SET -->
  <template #surgeSomainSet>Surge/Surfboard DOMAIN-SET Subscription Link </template>
  <template #surgeSomainSetInfo> RULE-SET format subscription link is recommended for better results. </template>

  <!-- Surge/Surfboard RULE-SET -->
  <template #surgeRuleSet>Surge/Surfboard RULE-SET Subscription Link </template>

  <template #quantumultX> QuantumultX.list Subscription Link </template>
  <template #quantumultXInfo> If you’re unsure how to configure QuantumultX, please refer to the <a href="./QuantumultX.html">QuantumultX Guide</a>. </template>

  <!-- Mosdns V5 -->
  <template #mosdns> Mosdns V5 Subscription Link </template>

  <!-- AdClose rule -->
  <template #adclose> AdClose Subscription Link </template>
  <template #adcloseInfo> Currently in testing, but custom imports are supported. </template>

  <!-- RouterOS -->
  <template #routeros> RouterOS Subscription Link </template>

  <!-- RouterOS AdList -->
  <template #routerosAdlist> RouterOS AdList Subscription Link </template>

  <!-- Singbox -->
  <template #singbox> Singbox Subscription Link </template>

  <!-- Singbox REGEX -->
  <template #singboxReg> Singbox REGEX Subscription Link </template>
</SubscribeLinkList>
