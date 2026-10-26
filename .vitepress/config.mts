import { defineConfig } from 'vitepress'
import locales from './locales'
import { tokenizeSearch } from './search-tokenizer.mjs'

export default defineConfig({
  lastUpdated: true, // Git 页面修改时间；技术核验使用独立的 lastVerified 字段
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
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-N86HQ8Z06L');"
    ]
  ],
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // Segment Chinese words as well as Latin tool names, in both index and browser queries.
            tokenize: tokenizeSearch
          }
        },
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详细结果',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '返回',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '向上键',
                  navigateDownKeyAriaLabel: '向下键',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc 键'
                }
              }
            }
          },
          en: {
            translations: {
              button: { buttonText: 'Search docs', buttonAriaLabel: 'Search documentation' },
              modal: {
                displayDetails: 'Show detailed results',
                resetButtonTitle: 'Clear search',
                backButtonTitle: 'Back',
                noResultsText: 'No results found',
                footer: {
                  selectText: 'Select',
                  selectKeyAriaLabel: 'Enter',
                  navigateText: 'Navigate',
                  navigateUpKeyAriaLabel: 'Arrow up',
                  navigateDownKeyAriaLabel: 'Arrow down',
                  closeText: 'Close',
                  closeKeyAriaLabel: 'Escape'
                }
              }
            }
          },
          zh_TW: {
            translations: {
              button: { buttonText: '搜尋文件', buttonAriaLabel: '搜尋文件' },
              modal: {
                displayDetails: '顯示詳細結果',
                resetButtonTitle: '清除搜尋',
                backButtonTitle: '返回',
                noResultsText: '找不到相關結果',
                footer: {
                  selectText: '選取',
                  selectKeyAriaLabel: 'Enter 鍵',
                  navigateText: '切換',
                  navigateUpKeyAriaLabel: '向上鍵',
                  navigateDownKeyAriaLabel: '向下鍵',
                  closeText: '關閉',
                  closeKeyAriaLabel: 'Esc 鍵'
                }
              }
            }
          }
        }
      }
    },
    footer: {
      message:
        '原创文档: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> · 规则: <a href="https://github.com/TG-Twilight/AWAvenue-Ads-Rule/blob/main/LICENSE">GPLv3</a>', // 页脚消息
      copyright:
        'Copyright © 2027 <a href="https://t.me/AWAvenue" target="_blank" rel="noopener">秋风のとおり道</a> & <a href="https://awads.cc/" target="_blank" rel="noopener">秋风塬上</a>' // 版权信息
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TG-Twilight/AWAvenue-Ads-Rule' } // GitHub 链接
    ]
  }
})
