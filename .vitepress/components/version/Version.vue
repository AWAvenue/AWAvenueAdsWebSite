<template>
  <template v-if="versionData.loaded">
    <p v-if="props.info" class="pre">{{ versionData.info }}</p>
    <span v-else-if="props.version">{{ versionData.version }}</span>
    <span v-else-if="props.date">{{ versionData.date }}</span>
  </template>
  <template v-else>
    <p v-if="props.info"><slot></slot></p>
    <span v-else-if="props.version"><slot></slot></span>
    <span v-else-if="props.date"><slot></slot></span>
    <p v-else-if="props.hidden"><slot></slot></p>
  </template>
</template>

<script setup lang="ts">
import { useVersion } from './fetchVersion'

const props = defineProps<{
  info?: boolean
  version?: boolean
  date?: boolean
  hidden?: boolean
}>()

const versionData = useVersion()
</script>

<style scoped>
.pre {
  white-space: pre-wrap;
}
</style>
