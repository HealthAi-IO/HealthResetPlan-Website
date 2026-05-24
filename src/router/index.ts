import { createRouter, createWebHistory } from 'vue-router';
import { i18n } from '../i18n';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',          name: 'home',     component: () => import('@/views/Home.vue'),     meta: { titleKey: 'home.pageTitle' } },
    { path: '/features',  name: 'features', component: () => import('@/views/Features.vue'), meta: { titleKey: 'features.pageTitle' } },
    { path: '/privacy',   name: 'privacy',  component: () => import('@/views/Privacy.vue'),  meta: { titleKey: 'privacy.pageTitle' } },
    { path: '/terms',     name: 'terms',    component: () => import('@/views/Terms.vue'),     meta: { titleKey: 'terms.pageTitle' } },
    { path: '/download',  name: 'download', component: () => import('@/views/Download.vue'), meta: { titleKey: 'download.pageTitle' } },
    { path: '/app',       name: 'web-app',  component: () => import('@/views/WebApp.vue'),   meta: { titleKey: 'webapp.pageTitle' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const key = to.meta.titleKey as string | undefined;
  document.title = key ? i18n.global.t(key) : 'HealthResetPlan';
});

export default router;
