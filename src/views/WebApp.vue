<script setup lang="ts">
import { onMounted } from 'vue';

const webAppUrl = 'https://app.jkcqplan.com/';

onMounted(() => {
  window.location.replace(webAppUrl);
});
</script>

<template>
  <section class="page web-app-redirect">
    <p>正在打开 Web 版...</p>
    <a :href="webAppUrl" target="_blank" rel="noopener noreferrer">
      如果没有自动跳转，请点击这里
    </a>
  </section>
</template>

<style lang="less" scoped>
.page {
  min-height: 60vh;
  display: grid;
  place-content: center;
  gap: 14px;
  text-align: center;
}
</style>
