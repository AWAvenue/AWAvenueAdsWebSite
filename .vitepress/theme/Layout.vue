<script setup lang="ts">
import DefaultTheme from 'vitepress/theme-without-fonts'
import HomeBadges from '../components/home/HomeBadges.vue'
import VerificationDate from '../components/VerificationDate.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <VerificationDate />
    </template>
    <template #home-features-after>
      <HomeBadges />
    </template>
  </DefaultTheme.Layout>
</template>
