import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import './assets/styles.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');

let skeletonHidden = false;

function hideSkeleton() {
  if (skeletonHidden) return;
  skeletonHidden = true;
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  requestAnimationFrame(() => {
    const skeleton = document.getElementById('app-skeleton');
    if (!skeleton) return;
    skeleton.classList.add('fade-out');
    setTimeout(() => skeleton.remove(), 400);
  });
}

router.isReady().then(hideSkeleton, hideSkeleton);
window.setTimeout(hideSkeleton, 4000);
