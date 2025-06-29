<template>
  <div v-if="props.link" class="link-container">
    <pre class="link">{{ props.link }}</pre>
    <button class="copy-link" :class="{ copyactive }" @click="handleButtonClick"></button>
  </div>
  <div v-else class="no-link">
    <span class="no-link-text"><slot name="nolink">暂无链接</slot></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  link: string
}>()
const copyactive = ref<number | undefined>(undefined)

function handleButtonClick() {
  if (copyactive.value) {
    clearTimeout(copyactive.value)
  }
  navigator.clipboard.writeText(props.link)
  copyactive.value = setTimeout(() => {
    copyactive.value = undefined
  }, 2000)
}
</script>

<style>
.link-container {
  display: flex;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;
  margin: 8px 0;
  overflow: hidden;
}

.link-container .link {
  margin: 0;
  padding: 0 15px;
  line-height: 45px;
  font-size: 16px;
  overflow-x: auto;
  flex-grow: 1;
  width: 0;
}

.link-container .copy-link {
  width: 45px;
  padding-right: 3px;
  background-color: var(--vp-c-bg-alt);
  border-left: 1px solid var(--vp-c-border);
  background-image: var(--vp-icon-copy);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: background-color 0.1s;
}

.link-container .copy-link.copyactive {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgb(41, 151, 100)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E");
  background-color: var(--vp-c-success-soft);
}
</style>
