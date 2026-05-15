import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue'), meta: { title: '健康重启计划 · AI 健康管理平台官网' } },
    { path: '/features', name: 'features', component: () => import('@/views/Features.vue'), meta: { title: '功能介绍 · 健康重启计划' } },
    { path: '/privacy', name: 'privacy', component: () => import('@/views/Privacy.vue'), meta: { title: '隐私政策 · 健康重启计划' } },
    { path: '/terms', name: 'terms', component: () => import('@/views/Terms.vue'), meta: { title: '用户协议 · 健康重启计划' } },
    { path: '/download', name: 'download', component: () => import('@/views/Download.vue'), meta: { title: '客户端下载 · 健康重启计划' } },
    { path: '/app', name: 'web-app', component: () => import('@/views/WebApp.vue'), meta: { title: 'Web 版体验 · 健康重启计划' } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.afterEach((to) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : '健康重启计划 · HealthResetPlan';
});

export default router;
