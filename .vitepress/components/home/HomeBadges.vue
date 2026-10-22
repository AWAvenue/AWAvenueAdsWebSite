<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const labels = computed(() => {
  if (lang.value.startsWith('en')) {
    return ['Project rankings', 'Trendshift daily ranking', 'Star History ranking', 'Trendshift weekly ranking']
  }
  if (lang.value === 'zh-TW') {
    return ['專案榜單', 'Trendshift 日榜', 'Star History 排名', 'Trendshift 週榜']
  }
  return ['项目榜单', 'Trendshift 日榜', 'Star History 排名', 'Trendshift 周榜']
})

const trendshiftLink = 'https://trendshift.io/repositories/221045?utm_source=trendshift-badge&utm_medium=badge&utm_campaign=badge-trendshift-221045'
</script>

<template>
  <nav class="home-badges" :aria-label="labels[0]">
    <a :href="trendshiftLink" target="_blank" rel="noopener noreferrer">
      <img
        src="https://trendshift.io/api/badge/trendshift/repositories/221045/daily?language=Adblock%20Filter%20List"
        :alt="labels[1]"
        width="250"
        height="55"
      >
    </a>
    <a href="https://www.star-history.com/tg-twilight/awavenue-ads-rule" target="_blank" rel="noopener noreferrer">
      <img
        src="https://api.star-history.com/badge?repo=TG-Twilight/AWAvenue-Ads-Rule&theme=light"
        :alt="labels[2]"
        width="195"
        height="55"
      >
    </a>
    <a :href="trendshiftLink" target="_blank" rel="noopener noreferrer">
      <img
        src="https://trendshift.io/api/badge/trendshift/repositories/221045/weekly?language=Adblock%20Filter%20List"
        :alt="labels[3]"
        width="250"
        height="55"
      >
    </a>
  </nav>
</template>

<style scoped>
.home-badges {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 32px auto 0;
  padding: 0 24px;
  max-width: 1152px;
}

.home-badges a {
  display: block;
  flex: 0 0 auto;
  max-width: 100%;
  border-radius: 6px;
}

.home-badges a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.home-badges img {
  display: block;
  max-width: 100%;
  width: auto;
  height: 55px;
  object-fit: contain;
}

@media (max-width: 767px) {
  .home-badges {
    flex-direction: column;
  }
}
</style>
