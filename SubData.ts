export type VariantId = 'full' | 'ads' | 'noPrivacy' | 'noUnwelcome'
export type SourceId = 'tmby' | 'cxplay' | 'uura' | 'ghraw' | 'jsdelivr' | 'ghproxy'
export type ToolGroup = 'popular' | 'proxy' | 'dns' | 'advanced'

export type SubscriptionTool = {
  id: string
  label: string
  group: ToolGroup
  stem: string
  extension: string
  supportsVariants?: boolean
  defaultFilename?: string
  cxplayDefaultFilename?: string
  unsupportedSources?: SourceId[]
}

export const variants: Record<VariantId, { tag: string }> = {
  full: { tag: '' },
  ads: { tag: '-Only.Ads' },
  noPrivacy: { tag: '-No.Privacy' },
  noUnwelcome: { tag: '-No.Unwelcome' }
}

export const tools: SubscriptionTool[] = [
  {
    id: 'adguard',
    label: 'AdGuard / AdGuard Home',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-Adguard',
    extension: '.txt',
    defaultFilename: 'AWAvenue-Ads-Rule.txt',
    cxplayDefaultFilename: 'AWAvenue-Ads-Rule-Adguard.txt'
  },
  {
    id: 'clashClassical',
    label: 'Clash / Mihomo Classical',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-Clash-Classical',
    extension: '.yaml'
  },
  {
    id: 'clashMrs',
    label: 'Clash / Mihomo MRS',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-Clash',
    extension: '.mrs'
  },
  {
    id: 'quantumultX',
    label: 'Quantumult X',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-QuantumultX',
    extension: '.list'
  },
  {
    id: 'shadowrocket',
    label: 'Shadowrocket',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-Shadowrocket',
    extension: '.module'
  },
  {
    id: 'loon',
    label: 'Loon',
    group: 'popular',
    stem: 'AWAvenue-Ads-Rule-Loon',
    extension: '.module'
  },
  {
    id: 'clash',
    label: 'Clash / Mihomo YAML',
    group: 'proxy',
    stem: 'AWAvenue-Ads-Rule-Clash',
    extension: '.yaml'
  },
  {
    id: 'surgeRuleSet',
    label: 'Surge / Surfboard RULE-SET',
    group: 'proxy',
    stem: 'AWAvenue-Ads-Rule-Surge-RULE-SET',
    extension: '.list'
  },
  {
    id: 'surgeDomainSet',
    label: 'Surge / Surfboard DOMAIN-SET',
    group: 'proxy',
    stem: 'AWAvenue-Ads-Rule-Surge',
    extension: '.list'
  },
  {
    id: 'surgeModule',
    label: 'Surge Module',
    group: 'proxy',
    stem: 'AWAvenue-Ads-Rule-Surge-module',
    extension: '.sgmodule'
  },
  {
    id: 'singbox',
    label: 'sing-box',
    group: 'proxy',
    stem: 'AWAvenue-Ads-Rule-Singbox',
    extension: '.json'
  },
  {
    id: 'hosts',
    label: 'hosts / AdAway',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-hosts',
    extension: '.txt'
  },
  {
    id: 'dnsmasq',
    label: 'Dnsmasq',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-Dnsmasq',
    extension: '.conf'
  },
  {
    id: 'mosdns',
    label: 'MosDNS v5',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-Mosdns_v5',
    extension: '.txt'
  },
  {
    id: 'smartdns',
    label: 'SmartDNS',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-SmartDNS',
    extension: '.conf'
  },
  {
    id: 'routerosAdlist',
    label: 'RouterOS AdList',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-RouterOS-Adlist',
    extension: '.txt'
  },
  {
    id: 'routeros',
    label: 'RouterOS Script',
    group: 'dns',
    stem: 'AWAvenue-Ads-Rule-RouterOS',
    extension: '.txt'
  },
  {
    id: 'adclose',
    label: 'AdClose',
    group: 'advanced',
    stem: 'AWAvenue-Ads-Rule-AdClose',
    extension: '.rule'
  },
  {
    id: 'geosite',
    label: 'Geosite',
    group: 'advanced',
    stem: 'AWAvenue-Ads-Rule-Geosite',
    extension: '.txt'
  },
  {
    id: 'adguardReplenish',
    label: 'AdGuard Replenish',
    group: 'advanced',
    stem: 'AWAvenue-Ads-Rule-Replenish',
    extension: '.txt',
    supportsVariants: false
  }
]

export const sources: Array<{
  id: SourceId
  base: string
  flat: boolean
  domestic: boolean
}> = [
  {
    id: 'tmby',
    base: 'https://github.boki.moe/https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main',
    flat: false,
    domestic: true
  },
  {
    id: 'cxplay',
    base: 'https://script.cx.ms/awavenue',
    flat: true,
    domestic: true
  },
  {
    id: 'uura',
    base: 'https://cdn.uura.cn/AWAvenue',
    flat: true,
    domestic: true
  },
  {
    id: 'ghraw',
    base: 'https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main',
    flat: false,
    domestic: false
  },
  {
    id: 'jsdelivr',
    base: 'https://gcore.jsdelivr.net/gh/TG-Twilight/AWAvenue-Ads-Rule@main',
    flat: false,
    domestic: false
  },
  {
    id: 'ghproxy',
    base: 'https://ghfast.top/https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main',
    flat: false,
    domestic: false
  }
]

export function getTool(toolId: string) {
  return tools.find(tool => tool.id === toolId)
}

export function getVariantId(blockPrivacy: boolean, blockUnwelcome: boolean): VariantId {
  if (blockPrivacy && blockUnwelcome) return 'full'
  if (!blockPrivacy && blockUnwelcome) return 'noPrivacy'
  if (blockPrivacy && !blockUnwelcome) return 'noUnwelcome'
  return 'ads'
}

export function getFilename(tool: SubscriptionTool, variantId: VariantId) {
  if (variantId === 'full' && tool.defaultFilename) return tool.defaultFilename
  const tag = tool.supportsVariants === false ? '' : variants[variantId].tag
  return `${tool.stem}${tag}${tool.extension}`
}

export function getSubscriptionLink(tool: SubscriptionTool, variantId: VariantId, sourceId: SourceId) {
  if (tool.unsupportedSources?.includes(sourceId)) return ''

  const source = sources.find(item => item.id === sourceId)
  if (!source) return ''

  let filename = getFilename(tool, variantId)
  if (sourceId === 'cxplay' && variantId === 'full' && tool.cxplayDefaultFilename) {
    filename = tool.cxplayDefaultFilename
  }

  const isRootDefault = tool.id === 'adguard' && variantId === 'full'
  const path = source.flat || isRootDefault ? filename : `Filters/${filename}`
  return `${source.base}/${path}`
}
