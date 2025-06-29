<template>
  <aside class="sub-aside">
    <ul class="sub-aside-list">
      <li v-for="tool in subTools" :key="tool" @click="currentTool = tool" class="sub-aside-item" :class="{ activated: currentTool === tool }">
        <slot :name="tool">{{ tool }}</slot>
      </li>
    </ul>
  </aside>
  <article>
    <template v-if="!currentSubList">
      <h2><slot name="defaultHeading">请选择订阅格式</slot></h2>
      <p><slot name="defaultInfo">不同的工具接受不同的订阅格式</slot></p>
    </template>
    <template v-else>
      <h2><slot :name="currentTool">{{ currentTool }}</slot></h2>
      <section v-for="source in subSources" class="sub-link">
        <h3><slot :name="source">{{ source }}</slot></h3>
        <p><slot :name="source + 'Info'">{{ source }}</slot></p>
        <div class="link-container">
          <span class="link">{{ currentSubList[source] }}</span>
          <button class="copy-link"></button>
        </div>
      </section>
    </template>
  </article>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { subSources, subTools, subLinkList } from '../../../SubData.ts'

const currentTool = ref<(typeof subTools)[number] | undefined>(undefined)
const currentSubList = computed<Record<(typeof subSources)[number], string> | null>(() => {
  if (!currentTool.value) return null
  return subLinkList[currentTool.value] || null
})
</script>
