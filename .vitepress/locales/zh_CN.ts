import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-CN',
    description: '干掉所有无良广告',

    themeConfig: {
        nav: nav(),

        lastUpdatedText: "最后更新",
        darkModeSwitchLabel: '深色模式',
        returnToTopLabel: '回到顶部',
        outline: {
            label: '目录'
        },
    }
})

function nav() {
    return [
        { text: '捐赠', link: '/Donate.html' },
        { text: '订阅规则', link: '/Sub.html' },
        { text: '感谢列表', link: '/Thank.html' },
        { text: '用户交流', link: '/Support.html' },
        { text: '用户协议', link: '/Protocol.html' },
        { text: '使用教程', link: '/Knowledge.html' }
    ]
}
