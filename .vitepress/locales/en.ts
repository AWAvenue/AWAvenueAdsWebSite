import { defineConfig } from 'vitepress'
import { tutorialSidebar } from '../tutorials.mjs'

export default defineConfig({
  lang: 'en-US',
  description: 'Eliminate All Malicious Ads',

  themeConfig: {
    nav: nav(),
    footer: {
      message:
        'Original documentation: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> · Rules: <a href="https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/LICENSE">GPLv3</a>'
    },
    sidebar: tutorialSidebar('en'),
    sidebarMenuLabel: 'Guide navigation',
    lastUpdated: { text: 'Page updated', formatOptions: { dateStyle: 'medium', forceLocale: true } },

    editLink: {
      pattern: 'https://github.com/AWAvenue/AWAvenueAdsWebSite/edit/main/:path',
      text: 'Edit this page on GitHub'
    }
  }
})

function nav() {
  return [
    { text: 'Donate', link: '/en/Donate.html' },
    { text: 'Subscribe', link: '/en/Sub.html' },
    { text: 'Thanks', link: '/en/Thank.html' },
    { text: 'Communication', link: '/en/Support.html' },
    { text: 'License', link: '/en/Protocol.html' },
    { text: 'Knowledge', link: '/en/Knowledge.html' }
  ]
}
