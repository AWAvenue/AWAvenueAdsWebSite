// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './Layout.vue'
import Version from '../components/version/Version.vue'
import SubscribeLinks from '../components/subscribe/SubscribeLinks.vue'
import StartStatus from '../components/start/StartStatus.vue'
import './style.css'

export default <Theme>{
  extends: DefaultTheme,
  Layout,
  enhanceApp: ({ app }) => {
    app.component('Version', Version)
    app.component('SubscribeLinks', SubscribeLinks)
    app.component('StartStatus', StartStatus)
  }
}
