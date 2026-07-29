<template>
  <section class="start-status" :aria-label="copy.title">
    <article class="status-card version-card">
      <p class="status-eyebrow">{{ copy.versionEyebrow }}</p>
      <h3>
        <Version version>{{ copy.loading }}</Version>
      </h3>
      <p class="update-date">
        {{ copy.updated }} <Version date>{{ copy.loading }}</Version> UTC
      </p>
      <details>
        <summary>{{ copy.changelog }}</summary>
        <Version info>{{ copy.loadingHelp }}</Version>
      </details>
    </article>

    <article class="status-card counter-card">
      <p class="status-eyebrow">{{ copy.counterEyebrow }}</p>
      <h3>{{ copy.counterTitle }}</h3>
      <p>{{ copy.counterHelp }}</p>
      <img src="https://count.getloli.com/get/@TG-Twiligh?theme=booru-helltaker" :alt="copy.counterAlt" loading="lazy" width="666" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const copySets = {
  'zh-CN': {
    title: '秋风广告规则运行状态',
    versionEyebrow: '当前版本',
    updated: '更新时间：',
    changelog: '查看本次更新内容',
    loading: '少女祈祷中……',
    loadingHelp: '更新日志由 GitHub 提供，如果持续无法加载，请更换网络环境。',
    counterEyebrow: '访问统计',
    counterTitle: '感谢每一次到访',
    counterHelp: '自 2024 年 6 月开始统计；统计服务偶尔可能暂时无法加载。',
    counterAlt: '秋风广告规则网站访问统计'
  },
  'zh-TW': {
    title: '秋風廣告規則運行狀態',
    versionEyebrow: '目前版本',
    updated: '更新時間：',
    changelog: '查看本次更新內容',
    loading: '少女祈禱中……',
    loadingHelp: '更新日誌由 GitHub 提供，如果持續無法載入，請更換網路環境。',
    counterEyebrow: '造訪統計',
    counterTitle: '感謝每一次到訪',
    counterHelp: '自 2024 年 6 月開始統計；統計服務偶爾可能暫時無法載入。',
    counterAlt: '秋風廣告規則網站造訪統計'
  },
  'en-US': {
    title: 'AWAvenue Ads Rule status',
    versionEyebrow: 'Current release',
    updated: 'Updated: ',
    changelog: 'View this release',
    loading: 'Loading…',
    loadingHelp: 'Release data comes from GitHub. Try another network if it does not load.',
    counterEyebrow: 'Visit counter',
    counterTitle: 'Thanks for every visit',
    counterHelp: 'Counting since June 2024. The counter service may occasionally be unavailable.',
    counterAlt: 'AWAvenue Ads Rule website visit counter'
  }
} as const

const { lang } = useData()
const copy = computed(() => copySets[lang.value as keyof typeof copySets] || copySets['zh-CN'])
</script>

<style scoped>
.start-status {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 16px;
  margin: 22px 0 34px;
}

.status-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 20px;
  background: radial-gradient(circle at 100% 0, var(--vp-c-brand-soft), transparent 46%), var(--vp-c-bg-soft);
}

.status-eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-card h3 {
  margin: 0 0 8px;
  font-size: 22px;
}

.status-card > p:not(.status-eyebrow) {
  margin: 0 0 12px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.status-card details {
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 16px;
  padding-top: 12px;
}

.status-card summary {
  color: var(--vp-c-brand-1);
  font-weight: 650;
  cursor: pointer;
}

.counter-card img {
  display: block;
  width: 100%;
  max-height: 150px;
  border-radius: 10px;
  object-fit: cover;
  object-position: left center;
}

@media (max-width: 720px) {
  .start-status {
    grid-template-columns: 1fr;
  }
}
</style>
