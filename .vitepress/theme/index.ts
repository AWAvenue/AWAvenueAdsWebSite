// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Version from '../components/version/Version.vue'
import './style.css'

export default <Theme>{
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component('Version', Version)
  }
}
