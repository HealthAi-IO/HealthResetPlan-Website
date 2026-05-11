<script setup lang="ts">
const platforms = [
  { name: 'macOS', icon: '🍎', desc: '支持 macOS 13+' },
  { name: 'iOS', icon: '📱', desc: '支持 iOS 14+' },
  { name: 'Windows', icon: '🪟', desc: '支持 Windows 10/11' },
  { name: 'Android', icon: '🤖', desc: 'API 24 及以上' },
  { name: 'Web', icon: '🌐', desc: '现代浏览器直接打开' },
  { name: '微信小程序', icon: '💬', desc: '微信搜索"健康重启计划"' }
];
</script>

<template>
  <section class="container">
    <h1>下载客户端</h1>
    <p class="lead">5 端覆盖 + 微信小程序，无论桌面还是移动场景都能管理您的健康。</p>
    <div class="grid">
      <div v-for="p in platforms" :key="p.name" class="card">
        <div class="icon">{{ p.icon }}</div>
        <h3>{{ p.name }}</h3>
        <p>{{ p.desc }}</p>
        <a class="btn btn-outline" href="#" @click.prevent>即将发布</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
section { padding: 64px 32px; max-width: 1080px; }
h1 { font-size: 32px; }
.lead { color: var(--hrp-muted); }
.grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.card {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
  text-align: center;
}
.card .icon { font-size: 36px; }
.card h3 { margin: 8px 0; }
.card p { color: var(--hrp-muted); margin: 0 0 16px; }
</style>
