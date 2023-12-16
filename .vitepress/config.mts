import { defineConfig } from 'vitepress'
import locales from './locales'

export default defineConfig( {
    ignoreDeadLinks: true,
    title: '秋风广告规则',
    locales: locales.locales,
    srcExclude: ['README.md'],
    head: [
        ['meta', { name: 'theme-color', content: '#ea668d' }],
        ['link', { rel: 'stylesheet', href: 'https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Simplify,Latin&display=swap' }],
        ['link', { rel: 'stylesheet', href: 'https://font.sec.miui.com/font/css?family=MiSans:200,300,400,450,500,600,650,700:Chinese_Traditional,Latin&display=swap' }]
      ],
    themeConfig: {
        footer: {
            message: 'CC BY-NC-SA 4.0 Licensed',
            copyright: 'Copyright © 2022-2023 秋风のとおり道'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/TG-Twilight/AWAvenue-Ads-Rule' }
        ]
    }
})
