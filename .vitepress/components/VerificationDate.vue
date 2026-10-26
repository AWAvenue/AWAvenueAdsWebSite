<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, lang } = useData()
const verifiedDate = computed(() => {
  const value = frontmatter.value.lastVerified
  // Unquoted YAML dates become Date objects during SSR and ISO strings in browser page data.
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '').slice(0, 10)
})
const copy = computed(() =>
  lang.value === 'en-US'
    ? {
        label: 'Documentation verified',
        scope:
          'Official documentation and published rule files checked. Client testing is limited to what this page explicitly states. A page update does not imply a new verification.'
      }
    : lang.value === 'zh-TW'
      ? { label: '文件核驗日期', scope: '已核對官方文件與發布的規則檔案；用戶端實測範圍以本文明確說明為準。頁面更新時間不代表已重新核驗。' }
      : { label: '文档核验日期', scope: '已核对官方文档与发布的规则文件；客户端实测范围以本文明确说明为准。页面更新时间不代表已重新核验。' }
)
</script>

<template>
  <aside v-if="frontmatter.lastVerified && frontmatter.verificationScope === 'docs'" class="verification-date" :aria-label="copy.label">
    <p>
      <strong>{{ copy.label }}：</strong><time :datetime="verifiedDate">{{ verifiedDate }}</time>
    </p>
    <p>{{ copy.scope }}</p>
  </aside>
</template>

<style scoped>
.verification-date {
  margin: 0 0 24px;
  border-left: 3px solid var(--vp-c-brand-1);
  padding: 10px 16px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  line-height: 1.6;
}
.verification-date p {
  margin: 0;
}
.verification-date p + p {
  margin-top: 4px;
}
</style>
