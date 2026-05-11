<script setup lang="ts">
/**
 * Web 端入口占位：实际项目会将 Flutter Web 构建产物（flutter build web）
 * 复制到 `public/app/`，访问本路由时通过 iframe / 重定向打开。
 */
</script>

<template>
  <section class="container">
    <h1>健康重启计划 · Web 版</h1>
    <p class="lead">尚未部署 Web 构建产物。请按以下步骤接入：</p>
    <ol>
      <li>在客户端目录执行 <code>flutter build web --release</code></li>
      <li>把 <code>HealthResetPlan/build/web/</code> 复制到 <code>HealthResetPlan-Website/public/app/</code></li>
      <li>本路由会自动跳转到 <code>/app/</code> 子路径</li>
    </ol>
    <a class="btn btn-primary" href="/app/">尝试打开 /app/</a>
  </section>
</template>

<style scoped>
section { padding: 64px 32px; max-width: 880px; }
h1 { font-size: 32px; }
.lead { color: var(--hrp-muted); }
code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'JetBrains Mono', monospace;
}
ol { line-height: 2; }
</style>
