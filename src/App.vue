<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type Locale } from './i18n';
import LazyThreeHealthScene from '@/components/LazyThreeHealthScene.vue';

const { t, locale } = useI18n();
const router = useRouter();
const menuOpen = ref(false);
const langOpen = ref(false);
const langSwitcherEl = ref<HTMLElement | null>(null);
const themeMode = ref<'day' | 'night'>(
  localStorage.getItem('hrp-theme-mode') === 'night' ? 'night' : 'day'
);
const isDayMode = computed(() => themeMode.value === 'day');
provide('themeMode', themeMode);

watch(locale, () => {
  const key = router.currentRoute.value.meta.titleKey as string | undefined;
  if (key) document.title = t(key);
});

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    menuOpen.value = false;
  }
);

watch(menuOpen, open => {
  document.body.style.overflow = open ? 'hidden' : '';
});

watch(
  themeMode,
  mode => {
    document.body.classList.toggle('theme-day', mode === 'day');
    document.body.classList.toggle('theme-night', mode === 'night');
    localStorage.setItem('hrp-theme-mode', mode);
  },
  { immediate: true }
);

const localeOptions: { code: Locale; label: string }[] = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日語' },
  { code: 'ko', label: '한국어' },
];

const currentLangLabel = computed(
  () => localeOptions.find(o => o.code === locale.value)?.label ?? locale.value
);

const sceneVariant = computed(() => {
  const name = router.currentRoute.value.name;
  if (name === 'features') return 'features';
  if (name === 'download') return 'download';
  if (name === 'privacy') return 'privacy';
  return 'home';
});

function switchLocale(code: Locale) {
  setLocale(code);
  langOpen.value = false;
}

function closeMobileMenu() {
  menuOpen.value = false;
}

function toggleThemeMode() {
  themeMode.value = themeMode.value === 'day' ? 'night' : 'day';
}

function onDocClick(e: MouseEvent) {
  if (langSwitcherEl.value && !langSwitcherEl.value.contains(e.target as Node)) {
    langOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick);
});
onUnmounted(() => {
  document.removeEventListener('click', onDocClick);
  document.body.style.overflow = '';
});
</script>

<template>
  <div class="app-shell">
    <LazyThreeHealthScene v-if="!isDayMode" full-screen :variant="sceneVariant" />

    <header class="site-header">
      <RouterLink to="/" class="brand" :aria-label="t('nav.home')">
        <span class="brand-mark">
          <img src="/app-icon-192.png" width="38" height="38" alt="" />
        </span>
        <span class="brand-text">
          <strong>{{ locale.startsWith('zh') ? '健康重启计划' : 'HealthResetPlan' }}</strong>
          <small>HealthResetPlan</small>
        </span>
      </RouterLink>

      <nav class="site-nav" aria-label="main navigation">
        <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/features">{{ t('nav.features') }}</RouterLink>
        <RouterLink to="/download">{{ t('nav.download') }}</RouterLink>
        <RouterLink to="/privacy">{{ t('nav.privacy') }}</RouterLink>
      </nav>

      <div class="header-right">
        <!-- 语言切换器 -->
        <div ref="langSwitcherEl" class="lang-switcher">
          <button
            class="lang-btn"
            :aria-expanded="langOpen"
            aria-haspopup="listbox"
            @click="langOpen = !langOpen"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
            </svg>
            <span>{{ currentLangLabel }}</span>
            <svg class="chevron" :class="{ open: langOpen }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div v-if="langOpen" class="lang-dropdown" role="listbox">
            <button
              v-for="opt in localeOptions"
              :key="opt.code"
              role="option"
              :aria-selected="locale === opt.code"
              :class="{ active: locale === opt.code }"
              @click="switchLocale(opt.code)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <a
          href="https://app.jkcqplan.com/"
          class="header-action"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('nav.webApp') }}
        </a>

        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDayMode ? '切换至黑夜模式' : '切换至白天模式'"
          :title="isDayMode ? '黑夜模式' : '白天模式'"
          @click="toggleThemeMode"
        >
          <svg v-if="isDayMode" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.4 15.3A8.5 8.5 0 0 1 8.7 3.6 8.5 8.5 0 1 0 20.4 15.3Z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <span>{{ isDayMode ? '黑夜模式' : '白天模式' }}</span>
        </button>

        <button
          class="hamburger"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <!-- 移动端抽屉菜单 -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-drawer" @click.self="menuOpen = false">
        <nav class="mobile-nav">
          <RouterLink to="/" @click="closeMobileMenu">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/features" @click="closeMobileMenu">{{ t('nav.features') }}</RouterLink>
          <RouterLink to="/download" @click="closeMobileMenu">{{ t('nav.download') }}</RouterLink>
          <RouterLink to="/privacy" @click="closeMobileMenu">{{ t('nav.privacy') }}</RouterLink>
          <RouterLink to="/terms" @click="closeMobileMenu">{{ t('nav.terms') }}</RouterLink>
          <a
            href="https://app.jkcqplan.com/"
            class="mobile-cta"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeMobileMenu"
          >
            {{ t('nav.webApp') }}
          </a>
          <div class="mobile-lang">
            <button
              v-for="opt in localeOptions"
              :key="opt.code"
              :class="{ active: locale === opt.code }"
              @click="switchLocale(opt.code); closeMobileMenu()"
            >
              {{ opt.label }}
            </button>
          </div>
        </nav>
      </div>
    </Transition>

    <main class="page-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand-col">
          <RouterLink to="/" class="footer-brand">
            {{ locale.startsWith('zh') ? '健康重启计划' : 'HealthResetPlan' }}
          </RouterLink>
          <p>{{ t('footer.tagline') }}</p>
        </div>

        <div class="footer-links" aria-label="footer navigation">
          <RouterLink to="/features">{{ t('footer.features') }}</RouterLink>
          <RouterLink to="/download">{{ t('footer.download') }}</RouterLink>
          <RouterLink to="/privacy">{{ t('footer.privacy') }}</RouterLink>
          <RouterLink to="/terms">{{ t('footer.terms') }}</RouterLink>
          <a href="mailto:87103978@qq.com">{{ t('footer.contact') }}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>{{ t('footer.copyright') }}</span>
        <span>{{ t('footer.record') }}</span>
        <span>{{ t('footer.disclaimer') }}</span>
      </div>
    </footer>
  </div>
</template>

<style lang="less" scoped>
.theme-toggle {
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  color: #3a4240;
  background: rgba(255, 249, 240, 0.92);
  border: 1px solid rgba(143, 211, 185, 0.52);
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(143, 211, 185, 0.14);

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }
}

:global(#app),
:global(.app-shell) {
  width: 100%;
  min-height: 100vh;
}

:global(body.theme-day) {
  --hrp-green: #8fd3b9;
  --hrp-blue: #8fd3b9;
  --hrp-blue-dark: #5ea98c;
  --hrp-ink: #3a4240;
  --hrp-text: #3a4240;
  --hrp-muted: rgba(58, 66, 64, 0.68);
  --hrp-soft: #fff9f0;
  --hrp-surface: rgba(255, 255, 255, 0.72);
  --hrp-line: rgba(143, 211, 185, 0.32);
  --hrp-panel: rgba(143, 211, 185, 0.18);
  --hrp-shadow: 0 20px 56px rgba(143, 211, 185, 0.18);
  color: #3a4240;
  background:
    radial-gradient(circle at 12% 18%, rgba(143, 211, 185, 0.2), transparent 28%),
    radial-gradient(circle at 86% 10%, rgba(255, 200, 162, 0.18), transparent 24%),
    linear-gradient(180deg, #fff9f0 0%, #fffdf8 48%, #f4fbf6 100%);
  background-size: auto;
}

:global(body.theme-day::before) {
  display: none;
}

:global(body.theme-day .site-header) {
  background: rgba(255, 249, 240, 0.88);
  border-bottom-color: rgba(143, 211, 185, 0.24);
  box-shadow: 0 12px 36px rgba(143, 211, 185, 0.12);
}

:global(body.theme-day .brand-mark),
:global(body.theme-day .header-action),
:global(body.theme-day .btn-primary),
:global(body.theme-day .mobile-cta) {
  color: #fff !important;
  box-shadow: 0 14px 34px rgba(143, 211, 185, 0.28) !important;
}

:global(body.theme-day .header-action),
:global(body.theme-day .btn-primary),
:global(body.theme-day .mobile-cta) {
  background: #8fd3b9 !important;
}

:global(body.theme-day .brand),
:global(body.theme-day .footer-brand),
:global(body.theme-day .site-nav a.router-link-active) {
  color: #3a4240;
}

:global(body.theme-day .site-nav a),
:global(body.theme-day .footer-links a),
:global(body.theme-day .lang-btn),
:global(body.theme-day .brand-text small) {
  color: rgba(58, 66, 64, 0.68);
}

:global(body.theme-day .lang-btn),
:global(body.theme-day .hamburger),
:global(body.theme-day .mobile-lang button) {
  background: rgba(255, 255, 255, 0.58);
  border-color: rgba(143, 211, 185, 0.34);
}

:global(body.theme-day .site-footer),
:global(body.theme-day .mobile-nav),
:global(body.theme-day .lang-dropdown) {
  background: rgba(255, 249, 240, 0.96);
  border-color: rgba(143, 211, 185, 0.24);
}

@media (max-width: 560px) {
  .theme-toggle {
    width: 36px;
    min-height: 36px;
    padding: 0;

    span {
      display: none;
    }
  }
}
</style>
