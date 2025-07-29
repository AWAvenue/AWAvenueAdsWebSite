import { defineConfig } from 'vitepress'
import locales from './locales'

export default defineConfig({
  ignoreDeadLinks: true, // 忽略死链
  title: '秋风广告规则', // 网站标题
  locales: locales.locales, // 国际化配置
  srcExclude: ['README.md'], // 排除 README.md 文件
  head: [
    // 设置主题颜色
    ['meta', { name: 'theme-color', content: '#0A3FAC' }],
    // 引入 MiSans 简体中文/拉丁字体
    ['link', { rel: 'stylesheet', href: 'https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Simplify,Latin&display=swap' }],
    // 引入 MiSans 繁体中文/拉丁字体
    ['link', { rel: 'stylesheet', href: 'https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Traditional,Latin&display=swap' }],
    // 谷歌分析 (Google Analytics) 代码
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-N86HQ8Z06L' }],
    [
      'script',
      {},
      /* js */ `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N86HQ8Z06L');`
    ]
  ],
  themeConfig: {
    footer: {
      message: 'CC BY-NC-SA 4.0 Licensed', // 页脚消息
      copyright: /* html */ `Copyright © 2025 <a href="https://zyc.su/?source=awavenue.top" target="_blank" rel="noopener">秋风のとおり道</a> & <a href="https://awads.cc/?source=awavenue.top" target="_blank" rel="noopener">秋风塬上</a>` // 版权信息
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TG-Twilight/AWAvenue-Ads-Rule' } // GitHub 社交链接
    ]
  },
  cleanUrls: true,
  rewrites: {
    'zh_CN/:path*': ':path*'
  }
})
