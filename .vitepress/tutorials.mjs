// Shared by navigation, the subscription generator, and the built-site checker.
export const tutorialLocales = [
  { key: 'root', lang: 'zh-CN', prefix: '' },
  { key: 'en', lang: 'en-US', prefix: '/en' },
  { key: 'zh_TW', lang: 'zh-TW', prefix: '/zh_TW' }
]

export const tutorials = [
  { id: 'Knowledge', labels: ['教程总览', 'Guide overview', '教學總覽'] },
  { id: 'AdGuard', labels: ['AdGuard 产品选择', 'Choose an AdGuard product', '選擇 AdGuard 產品'] },
  { id: 'AdGuardHome', labels: ['AdGuard Home', 'AdGuard Home', 'AdGuard Home'] },
  { id: 'Coexist', labels: ['Android 共存', 'Android coexistence', 'Android 共存'] },
  { id: 'Mihomo', labels: ['Clash / Mihomo', 'Clash / Mihomo', 'Clash / Mihomo'] },
  { id: 'QuantumultX', labels: ['Quantumult X', 'Quantumult X', 'Quantumult X'] },
  { id: 'ShadowRocket', labels: ['Shadowrocket', 'Shadowrocket', 'Shadowrocket'] },
  { id: 'Loon', labels: ['Loon', 'Loon', 'Loon'] },
  { id: 'Surge', labels: ['Surge / Surfboard', 'Surge / Surfboard', 'Surge / Surfboard'] },
  { id: 'SingBox', labels: ['sing-box', 'sing-box', 'sing-box'] },
  { id: 'MosDNS', labels: ['MosDNS v5', 'MosDNS v5', 'MosDNS v5'] }
]

export const tutorialMap = {
  adguard: '/AdGuard.html',
  clash: '/Mihomo.html#yaml',
  clashClassical: '/Mihomo.html#classical',
  clashMrs: '/Mihomo.html#mrs',
  quantumultX: '/QuantumultX.html',
  shadowrocket: '/ShadowRocket.html',
  loon: '/Loon.html',
  surgeRuleSet: '/Surge.html#rule-set',
  surgeDomainSet: '/Surge.html#domain-set',
  surgeModule: '/Surge.html#module',
  singbox: '/SingBox.html',
  mosdns: '/MosDNS.html',
  hosts: '/Knowledge.html#hosts',
  dnsmasq: '/Knowledge.html#dnsmasq',
  smartdns: '/Knowledge.html#smartdns',
  routerosAdlist: '/Knowledge.html#routeros-adlist',
  routeros: '/Knowledge.html#routeros-script',
  adclose: '/Knowledge.html#adclose',
  geosite: '/Knowledge.html#geosite',
  adguardReplenish: '/Knowledge.html#adguard-replenish'
}

export function tutorialSidebar(localeKey) {
  const index = tutorialLocales.findIndex(locale => locale.key === localeKey)
  if (index < 0) throw new Error(`Unknown tutorial locale: ${localeKey}`)
  const { prefix } = tutorialLocales[index]
  const items = tutorials.map(page => ({ text: page.labels[index], link: `${prefix}/${page.id}.html` }))
  // Match only tutorial filenames. A root '/' or language prefix would add a sidebar to other pages.
  return Object.fromEntries(tutorials.map(page => [`${prefix}/${page.id}`, [{ text: ['使用教程', 'Guides', '使用教學'][index], items }]]))
}
