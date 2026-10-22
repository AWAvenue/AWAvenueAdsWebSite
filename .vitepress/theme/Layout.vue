<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import HomeBadges from '../components/home/HomeBadges.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-features-after>
      <HomeBadges />
    </template>
  </DefaultTheme.Layout>
</template>
