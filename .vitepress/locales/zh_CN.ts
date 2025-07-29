import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  description: '干掉所有无良广告',

  themeConfig: {
    nav: nav(),

    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到顶部',
    outline: {
      label: '目录'
    },

    editLink: {
      pattern: 'https://github.com/TG-Twilight/AWAvenueAdsWebSite/blob/main/:path',
      text: '在 GitHub 中查看本页'
    }
  }
})

function nav() {
  return [
    { text: '使用教程', link: '/tutorial/' },
    { text: '地址列表', link: '/links.html' },
    { text: '致谢列表', link: '/acknowledgements.html' },
    { text: '交流反馈', link: '/community.html' },
    { text: '用户协议', link: '/agreement.html' },
    { text: '仓库地址', link: 'https://github.com/TG-Twilight/AWAvenue-Ads-Rule' }
  ]
}
