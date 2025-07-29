<template>
  <div class="sub-component" :class="{ mobile: isMobile, desktop: !isMobile, inmenu: inMenu, incontent: !inMenu }">
    <aside class="sub-aside">
      <h2 class="sub-aside-title" @click="chooseTool(undefined)"><slot name="nosrc">请选择订阅格式</slot></h2>
      <ul class="sub-aside-list">
        <li v-for="tool in subTools" :key="tool" @click="chooseTool(tool)" class="sub-aside-list-item" :class="{ activated: currentTool === tool }">
          <slot :name="tool">{{ tool }}</slot>
        </li>
      </ul>
    </aside>
    <main class="sub-pane" v-if="!isMobile || !inMenu">
      <Transition name="toogle-content">
        <article class="sub-content vp-doc" :key="currentTool">
          <template v-if="!currentSubList">
            <h2><slot name="nosrc">请选择订阅格式</slot></h2>
            <div><slot name="nosrcInfo">不同的工具接受不同的订阅格式</slot></div>
          </template>
          <template v-else>
            <h2>
              <slot :name="currentTool">{{ currentTool }}</slot>
            </h2>
            <div>
              <slot :name="currentTool + 'Info'"></slot>
            </div>
            <section v-for="source in subSources" class="sub-link custom-block info">
              <h3>
                <slot :name="source">{{ source }}</slot>
              </h3>
              <div>
                <slot :name="source + 'Info'"></slot>
              </div>
              <LinkContainer :link="currentSubList[source]" />
            </section>
          </template>
          <button v-if="isMobile" class="backtomenu" @click="goBackToMenu">{{ backBtnCaption }}</button>
        </article>
      </Transition>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { subSources, subTools, subLinkList } from '../../../SubData.ts'
import LinkContainer from './linkContainer.vue'
import { useData } from 'vitepress'

const currentTool = ref<(typeof subTools)[number] | undefined>(undefined)
const currentSubList = computed<Record<(typeof subSources)[number], string> | null>(() => {
  if (!currentTool.value) return null
  return subLinkList[currentTool.value] || null
})

const screenWidth = ref(0)

onMounted(() => {
  const listener = () => (screenWidth.value = window.innerWidth)
  listener()
  window.addEventListener('resize', listener)
  onUnmounted(() => window.removeEventListener('resize', listener))
})

const isMobile = computed(() => screenWidth.value < 768)
const inMenu = ref(true)

const backBtnCaption = {
  'zh-CN': '选择其他格式',
  'zh-TW': '選擇其他格式',
  'en-US': 'Choose another format'
}[useData().lang.value]

function chooseTool(tool: (typeof subTools)[number] | undefined) {
  currentTool.value = tool
  inMenu.value = false
  scrollTo(0, 0)
}
function goBackToMenu() {
  inMenu.value = true
  currentTool.value = undefined
  scrollTo(0, 0)
}
</script>

<style>
.subscription-page h1 {
  display: none;
}

@media screen and (min-width: 768px) {
  .subscription-page .VPContent {
    height: 100vh;
    overflow-y: hidden;
    position: relative;
  }
  .subscription-page .VPPage,
  .subscription-page .VPPage > div,
  .subscription-page .VPPage > div > div {
    height: 100%;
  }
}
.subscription-page .VPFooter {
  display: none;
}
.sub-component {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
  /* box-shadow: #f00 0 0 0 3px inset; */
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
.sub-aside {
  width: 30%;
  min-width: 300px;
  flex-grow: 0;
  overflow-y: auto;
  background-color: var(--vp-c-bg-alt);
  user-select: none;
}

.mobile .sub-aside {
  width: 100%;
}
.mobile.incontent .sub-aside {
  display: none;
}

.sub-aside-title {
  padding: 1em;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid var(--vp-c-divider);
}
.sub-aside-list-item {
  padding: 1em 1.5em;
  transition: background-color 0.1s ease;
  cursor: pointer;
  position: relative;
  font-size: 14px;
}
.sub-aside-list-item:hover {
  background-color: var(--vp-c-default-soft);
}

@keyframes fromleft {
  from {
    transform: translateX(-100%);
  }
}
.sub-aside-list-item::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  transition: background-color 0.2s;
}
.sub-aside-list-item.activated::before {
  background-color: var(--vp-c-brand-soft);
  transition: none;
}
.desktop .sub-aside-list-item.activated::before {
  animation: fromleft 0.5s cubic-bezier(0, 1, 0, 1);
}
.sub-pane {
  width: 0;
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
}
.sub-content {
  padding: 3em;
}
.mobile .sub-content {
  padding: 1em;
  padding-bottom: 5em;
}
</style>

<style>
.desktop .toogle-content-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transition: clip-path 0.3s;
  background-color: var(--vp-c-bg);
  z-index: 3;
}
.desktop .toogle-content-enter-to {
  clip-path: inset(0 0 0 0);
}
.desktop .toogle-content-enter-from {
  clip-path: inset(0 100% 0 0);
}
.desktop .toogle-content-leave-active {
  transition: opacity 0.2s;
}
.desktop .toogle-content-leave-to {
  opacity: 0;
}

.backtomenu {
  background-color: var(--vp-c-divider);
  color: var(--vp-c-brand-1);
  padding: 0.6em 1em;
  border: var(--vp-c-border) 1px solid;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  display: block;
  position: fixed;
  bottom: 0rem;
  left: 1rem;
  right: 1rem;
  backdrop-filter: blur(6px);
  box-shadow: #0003 0 0 15px;
}
</style>

<style>
.sub-content .header-anchor {
  display: none;
}

.sub-content h2 {
  line-height: 1.5;
  font-size: 28px;
  border-bottom: 2px solid var(--vp-c-divider);
  margin: 0 0 16px;
  padding: 0 0 10px;
  border-top: none;
}

.sub-content h3 {
  margin: 0 0 10px;
  line-height: 28px;
  font-size: 20px;
}
</style>
