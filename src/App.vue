<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';

const currentYear = new Date().getFullYear();

const navItems = [
  { to: '/', label: '首页' },
  { to: '/features', label: '产品功能' },
  { to: '/download', label: '下载' },
  { to: '/privacy', label: '安全与隐私' }
];
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand" aria-label="健康重启计划首页">
        <span class="brand-mark">HR</span>
        <span class="brand-text">
          <strong>健康重启计划</strong>
          <small>HealthResetPlan</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="主导航">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterLink to="/app" class="header-action">体验 Web 版</RouterLink>
    </header>

    <main class="page-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <RouterLink to="/" class="footer-brand">健康重启计划</RouterLink>
          <p>面向三高与体重管理人群的 AI 健康管理平台。</p>
        </div>

        <div class="footer-links" aria-label="页脚导航">
          <RouterLink to="/features">功能介绍</RouterLink>
          <RouterLink to="/download">客户端下载</RouterLink>
          <RouterLink to="/privacy">隐私政策</RouterLink>
          <RouterLink to="/terms">用户协议</RouterLink>
          <a href="mailto:hello@jkcqplan.com">联系我们</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ currentYear }} HealthResetPlan</span>
        <span>健康建议仅用于日常管理辅助，不能替代医生诊疗。</span>
      </div>
    </footer>
  </div>
</template>
