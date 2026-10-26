import { defineConfig } from 'vitepress'
import { tutorialSidebar } from '../tutorials.mjs'

export default defineConfig({
  lang: 'zh-TW',
  description: '幹掉所有無良廣告',

  themeConfig: {
    nav: nav(),
    footer: {
      message:
        '原創文件: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> · 規則: <a href="https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/LICENSE">GPLv3</a>'
    },
    sidebar: tutorialSidebar('zh_TW'),
    sidebarMenuLabel: '教學導覽',
    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: { text: '頁面更新', formatOptions: { dateStyle: 'medium', forceLocale: true } },
    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到頂部',
    outline: {
      label: '目錄'
    },

    editLink: {
      pattern: 'https://github.com/AWAvenue/AWAvenueAdsWebSite/edit/main/:path',
      text: '在 GitHub 中編輯此頁'
    }
  }
})

function nav() {
  return [
    { text: '贊助我們', link: '/zh_TW/Donate.html' },
    { text: '訂閱規則', link: '/zh_TW/Sub.html' },
    { text: '感謝名單', link: '/zh_TW/Thank.html' },
    { text: '用戶交流', link: '/zh_TW/Support.html' },
    { text: '使用與授權', link: '/zh_TW/Protocol.html' },
    { text: '使用教程', link: '/zh_TW/Knowledge.html' }
  ]
}
