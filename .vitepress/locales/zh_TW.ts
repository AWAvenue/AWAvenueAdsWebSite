import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'zh-TW',
    description: '幹掉所有無良廣告',

    themeConfig: {
        nav: nav(),

        lastUpdatedText: "最後更新",
        darkModeSwitchLabel: '深色模式',
        returnToTopLabel: '回到頂部',
        outline: {
            label: '目錄'
        },
        
    }
})

function nav() {
    return [
        { text: '贊助', link: '/zh_TW/Donate.html' },
        { text: '訂閱規則', link: '/zh_TW/Sub.html' },
        { text: '感謝名單', link: '/zh_TW/Thank.html' },
        { text: '用戶交流', link: '/zh_TW/Support.html' },
        { text: '用戶協議', link: '/zh_TW/Protocol.html' },
        { text: '使用教程', link: '/zh_TW/Knowledge.html' },
    ]
}