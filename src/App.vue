<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="layout">
    <header class="navbar">
      <RouterLink to="/" class="brand">
        <span class="logo">HRP</span>
        <span>健康重启计划</span>
      </RouterLink>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/features">功能</RouterLink>
        <RouterLink to="/privacy">隐私与加密</RouterLink>
        <RouterLink to="/download">下载</RouterLink>
        <RouterLink to="/app" class="cta">进入 Web 版</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <div>© {{ new Date().getFullYear() }} 健康重启计划 · HealthResetPlan</div>
      <div class="links">
        <RouterLink to="/privacy">隐私政策</RouterLink>
        <RouterLink to="/terms">用户协议</RouterLink>
        <a href="mailto:hello@healthresetplan.io">联系我们</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #eef2f7;
  position: sticky;
  top: 0;
  z-index: 10;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  color: #1f2937;
}
.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #2bbe7a, #1e88e5);
  font-size: 14px;
}
nav {
  display: flex;
  gap: 20px;
  align-items: center;
}
nav a {
  color: #374151;
  text-decoration: none;
  font-size: 14px;
}
nav a.router-link-active {
  color: #2bbe7a;
}
nav .cta {
  background: #2bbe7a;
  color: #fff;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 600;
}
main {
  flex: 1;
}
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  border-top: 1px solid #eef2f7;
  color: #6b7280;
  font-size: 13px;
}
footer .links {
  display: flex;
  gap: 16px;
}
footer .links a {
  color: #6b7280;
  text-decoration: none;
}
</style>
