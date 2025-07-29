/// <reference types="vite/client" />
import { reactive, toRef } from 'vue'

const versionInfo = reactive({
  version: '',
  date: '',
  info: '',
  loaded: false
})

const apiUrls = [
  'https://api.github.com/repos/TG-Twilight/AWAvenue-Ads-Rule/releases/latest',
  'https://api.github.com/repos/TG-Twilight/AWAvenue-Adblock-Rule/releases/latest'
]

async function fetchVersion() {
  for (const url of apiUrls) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.name && data.published_at && data.body) {
        versionInfo.version = data.name
        versionInfo.date = data.published_at
        versionInfo.info = data.body
        versionInfo.loaded = true
        return
      }
    } catch {}
  }
}

let fetched = false
export function useVersion() {
  if (!fetched && !import.meta.env.SSR) {
    fetched = true
    fetchVersion()
  }
  return versionInfo
}
