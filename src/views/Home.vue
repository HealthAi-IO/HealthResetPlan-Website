<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import HomeDay from './HomeDay.vue';
import HomeNight from './HomeNight.vue';

const themeMode = inject<Ref<'day' | 'night'>>('themeMode');

const activeHome = computed(() => (themeMode?.value === 'day' ? HomeDay : HomeNight));
</script>

<template>
  <component :is="activeHome" />
</template>
