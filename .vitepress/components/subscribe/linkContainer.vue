<template>
  <div class="link-container">
    <code class="link" :title="props.link">{{ props.link }}</code>
    <button class="copy-link" :class="{ copyactive: copied }" type="button" :aria-label="copied ? props.copiedLabel : props.copyLabel" @click="copyLink">
      {{ copied ? props.copiedLabel : props.copyLabel }}
    </button>
    <span class="sr-only" aria-live="polite">{{ liveMessage }}</span>
    <span v-if="copyFailed" class="copy-error" role="alert">{{ props.copyErrorLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  link: string
  copyLabel: string
  copiedLabel: string
  copiedMessage: string
  copyErrorLabel: string
}>()

const copied = ref(false)
const liveMessage = ref('')
const copyFailed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copyLink() {
  copied.value = false
  copyFailed.value = false
  liveMessage.value = ''
  if (timer) clearTimeout(timer)
  const link = props.link
  try {
    await navigator.clipboard.writeText(link)
  } catch {
    if (link === props.link) copyFailed.value = true
    return
  }
  if (link !== props.link) return
  copied.value = true
  liveMessage.value = props.copiedMessage
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
    liveMessage.value = ''
  }, 2000)
}

watch(
  () => props.link,
  () => {
    if (timer) clearTimeout(timer)
    copied.value = false
    copyFailed.value = false
    liveMessage.value = ''
  }
)
onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.link-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
}

.link {
  min-width: 0;
  overflow-x: auto;
  padding: 12px 14px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 22px;
  white-space: nowrap;
  user-select: text;
}

.copy-error {
  grid-column: 1 / -1;
  padding: 10px 14px;
  color: var(--vp-c-danger-1);
  font-size: 13px;
}

.copy-link {
  min-width: 112px;
  border-left: 1px solid var(--vp-c-divider);
  padding: 10px 16px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  font-weight: 650;
  cursor: pointer;
  transition:
    color 0.2s,
    background-color 0.2s;
}

.copy-link:hover,
.copy-link:focus-visible {
  background: var(--vp-c-brand-soft);
}

.copy-link.copyactive {
  color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .link-container {
    grid-template-columns: 1fr;
  }

  .copy-link {
    min-height: 46px;
    border-top: 1px solid var(--vp-c-divider);
    border-left: 0;
  }
}
</style>
