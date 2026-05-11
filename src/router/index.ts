import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    { path: '/features', name: 'features', component: () => import('@/views/Features.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('@/views/Privacy.vue') },
    { path: '/terms', name: 'terms', component: () => import('@/views/Terms.vue') },
    { path: '/download', name: 'download', component: () => import('@/views/Download.vue') },
    { path: '/app', name: 'web-app', component: () => import('@/views/WebApp.vue') }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
