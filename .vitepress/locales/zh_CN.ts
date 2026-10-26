import { defineConfig } from 'vitepress'
import { tutorialSidebar } from '../tutorials.mjs'

export default defineConfig({
  lang: 'zh-CN',
  description: '干掉所有无良广告',

  themeConfig: {
    nav: nav(),
    footer: {
      message:
        '原创文档: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> · 规则: <a href="https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/LICENSE">GPLv3</a>'
    },
    sidebar: tutorialSidebar('root'),
    sidebarMenuLabel: '教程导航',
    docFooter: { prev: '上一篇', next: '下一篇' },

    lastUpdated: { text: '页面更新', formatOptions: { dateStyle: 'medium', forceLocale: true } },
    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到顶部',
    outline: {
      label: '目录'
    },

    editLink: {
      pattern: 'https://github.com/AWAvenue/AWAvenueAdsWebSite/edit/main/:path',
      text: '在 GitHub 中编辑本页'
    }
  }
})

function nav() {
  return [
    { text: '赞助我们', link: '/Donate.html' },
    { text: '订阅规则', link: '/Sub.html' },
    { text: '感谢列表', link: '/Thank.html' },
    { text: '用户交流', link: '/Support.html' },
    { text: '使用与许可', link: '/Protocol.html' },
    { text: '使用教程', link: '/Knowledge.html' }
  ]
}
