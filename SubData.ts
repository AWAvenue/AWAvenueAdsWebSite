export const subSources = ['ghraw', 'tmby', 'jsdelivr', 'ghproxy', 'cxplay', 'uura'] as const
export const subTools = [
  'adguard',
  'adguardReplenish',
  'hosts',
  'clash',
  'clashClassical',
  'clashMrs',
  'dnsmasq',
  'surgeModule',
  'surgeSomainSet',
  'surgeRuleSet',
  'quantumultX',
  'mosdns',
  'adclose',
  'routeros',
  'routerosAdlist',
  'singbox',
  'singboxReg'
] as const

const paths: Record<(typeof subSources)[number], string> = {
  ghraw: `https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main`,
  tmby: `https://github.boki.moe/https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main`,
  jsdelivr: `https://gcore.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main`,
  ghproxy: `https://ghfast.top/https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main`,
  cxplay: `https://script.cx.ms/awavenue`,
  uura: `https://cdn.uura.cn/AWAvenue`
} as const
const names: Record<(typeof subTools)[number], string> = {
  adguard: `AWAvenue-Ads-Rule.txt`,
  adguardReplenish: `AWAvenue-Ads-Rule-Replenish.txt`,
  hosts: `AWAvenue-Ads-Rule-hosts.txt`,
  clash: `AWAvenue-Ads-Rule-Clash.yaml`,
  clashClassical: `AWAvenue-Ads-Rule-Clash-Classical.yaml`,
  clashMrs: `AWAvenue-Ads-Rule-Clash.mrs`,
  dnsmasq: `AWAvenue-Ads-Rule-Dnsmasq.conf`,
  surgeModule: `AWAvenue-Ads-Rule-Surge-module.sgmodule`,
  surgeSomainSet: `AWAvenue-Ads-Rule-Surge.list`,
  surgeRuleSet: `AWAvenue-Ads-Rule-Surge-RULE-SET.list`,
  quantumultX: `AWAvenue-Ads-Rule-QuantumultX.list`,
  mosdns: `AWAvenue-Ads-Rule-Mosdns_v5.txt`,
  adclose: `AWAvenue-Ads-Rule-AdClose.rule`,
  routeros: `AWAvenue-Ads-Rule-RouterOS.txt`,
  routerosAdlist: `AWAvenue-Ads-Rule-RouterOS-Adlist.txt`,
  singbox: `AWAvenue-Ads-Rule-Singbox.json`,
  singboxReg: `AWAvenue-Ads-Rule-Singbox-regex.json`
} as const

type SubLinkList = {
  [T in (typeof subTools)[number]]: {
    [K in (typeof subSources)[number]]: string
  }
}
export const subLinkList: SubLinkList = {
  adguard: {
    ghraw: `${paths.ghraw}/${names.adguard}`,
    tmby: `${paths.tmby}/${names.adguard}`,
    jsdelivr: `${paths.jsdelivr}/${names.adguard}`,
    ghproxy: `${paths.ghproxy}/${names.adguard}`,
    cxplay: `${paths.cxplay}/AWAvenue-Ads-Rule-Adguard.txt`,
    uura: `${paths.uura}/${names.adguard}`
  },
  adguardReplenish: {
    ghraw: `${paths.ghraw}/Filters/${names.adguardReplenish}`,
    tmby: `${paths.tmby}/Filters/${names.adguardReplenish}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.adguardReplenish}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.adguardReplenish}`,
    cxplay: `${paths.cxplay}/${names.adguardReplenish}`,
    uura: `${paths.uura}/${names.adguardReplenish}`
  },
  hosts: {
    ghraw: `${paths.ghraw}/Filters/${names.hosts}`,
    tmby: `${paths.tmby}/Filters/${names.hosts}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.hosts}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.hosts}`,
    cxplay: `${paths.cxplay}/${names.hosts}`,
    uura: `${paths.uura}/${names.hosts}`
  },
  clash: {
    ghraw: `${paths.ghraw}/Filters/${names.clash}`,
    tmby: `${paths.tmby}/Filters/${names.clash}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.clash}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.clash}`,
    cxplay: `${paths.cxplay}/${names.clash}`,
    uura: `${paths.uura}/${names.clash}`
  },
  clashClassical: {
    ghraw: `${paths.ghraw}/Filters/${names.clashClassical}`,
    tmby: `${paths.tmby}/Filters/${names.clashClassical}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.clashClassical}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.clashClassical}`,
    cxplay: `${paths.cxplay}/${names.clashClassical}`,
    uura: `${paths.uura}/${names.clashClassical}`
  },
  clashMrs: {
    ghraw: `${paths.ghraw}/Filters/${names.clashMrs}`,
    tmby: `${paths.tmby}/Filters/${names.clashMrs}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.clashMrs}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.clashMrs}`,
    cxplay: `${paths.cxplay}/${names.clashMrs}`,
    uura: `${paths.uura}/${names.clashMrs}`
  },
  dnsmasq: {
    ghraw: `${paths.ghraw}/Filters/${names.dnsmasq}`,
    tmby: `${paths.tmby}/Filters/${names.dnsmasq}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.dnsmasq}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.dnsmasq}`,
    cxplay: `${paths.cxplay}/${names.dnsmasq}`,
    uura: `${paths.uura}/${names.dnsmasq}`
  },
  surgeModule: {
    ghraw: `${paths.ghraw}/Filters/${names.surgeModule}`,
    tmby: `${paths.tmby}/Filters/${names.surgeModule}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.surgeModule}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.surgeModule}`,
    cxplay: `${paths.cxplay}/${names.surgeModule}`,
    uura: `${paths.uura}/${names.surgeModule}`
  },
  surgeSomainSet: {
    ghraw: `${paths.ghraw}/Filters/${names.surgeSomainSet}`,
    tmby: `${paths.tmby}/Filters/${names.surgeSomainSet}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.surgeSomainSet}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.surgeSomainSet}`,
    cxplay: `${paths.cxplay}/${names.surgeSomainSet}`,
    uura: `${paths.uura}/${names.surgeSomainSet}`
  },
  surgeRuleSet: {
    ghraw: `${paths.ghraw}/Filters/${names.surgeRuleSet}`,
    tmby: `${paths.tmby}/Filters/${names.surgeRuleSet}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.surgeRuleSet}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.surgeRuleSet}`,
    cxplay: `${paths.cxplay}/${names.surgeRuleSet}`,
    uura: `${paths.uura}/${names.surgeRuleSet}`
  },
  quantumultX: {
    ghraw: `${paths.ghraw}/Filters/${names.quantumultX}`,
    tmby: `${paths.tmby}/Filters/${names.quantumultX}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.quantumultX}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.quantumultX}`,
    cxplay: `${paths.cxplay}/${names.quantumultX}`,
    uura: `${paths.uura}/${names.quantumultX}`
  },
  mosdns: {
    ghraw: `${paths.ghraw}/Filters/${names.mosdns}`,
    tmby: `${paths.tmby}/Filters/${names.mosdns}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.mosdns}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.mosdns}`,
    cxplay: `${paths.cxplay}/${names.mosdns}`,
    uura: `${paths.uura}/${names.mosdns}`
  },
  adclose: {
    ghraw: `${paths.ghraw}/Filters/${names.adclose}`,
    tmby: `${paths.tmby}/Filters/${names.adclose}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.adclose}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.adclose}`,
    cxplay: `${paths.cxplay}/${names.adclose}`,
    uura: `${paths.uura}/${names.adclose}`
  },
  routeros: {
    ghraw: `${paths.ghraw}/Filters/${names.routeros}`,
    tmby: `${paths.tmby}/Filters/${names.routeros}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.routeros}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.routeros}`,
    cxplay: `${paths.cxplay}/${names.routeros}`,
    uura: `${paths.uura}/${names.routeros}`
  },
  routerosAdlist: {
    ghraw: `${paths.ghraw}/Filters/${names.routerosAdlist}`,
    tmby: `${paths.tmby}/Filters/${names.routerosAdlist}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.routerosAdlist}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.routerosAdlist}`,
    cxplay: `${paths.cxplay}/${names.routerosAdlist}`,
    uura: `${paths.uura}/${names.routerosAdlist}`
  },
  singbox: {
    ghraw: `${paths.ghraw}/Filters/${names.singbox}`,
    tmby: `${paths.tmby}/Filters/${names.singbox}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.singbox}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.singbox}`,
    cxplay: ``,
    uura: ``
  },
  singboxReg: {
    ghraw: `${paths.ghraw}/Filters/${names.singboxReg}`,
    tmby: `${paths.tmby}/Filters/${names.singboxReg}`,
    jsdelivr: `${paths.jsdelivr}/Filters/${names.singboxReg}`,
    ghproxy: `${paths.ghproxy}/Filters/${names.singboxReg}`,
    cxplay: ``,
    uura: ``
  }
}
