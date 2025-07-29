// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Version from '../components/version/version.vue'
import SubscribeLinkList from '../components/subscribe/subscribeLinkList.vue'
import './style.css'

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('Version', Version)
    app.component('SubscribeLinkList', SubscribeLinkList)
  }
}
