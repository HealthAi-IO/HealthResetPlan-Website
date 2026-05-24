<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type Locale } from './i18n';

const { t, locale } = useI18n();
const router = useRouter();

watch(locale, () => {
  const key = router.currentRoute.value.meta.titleKey as string | undefined;
  if (key) document.title = t(key);
});

const currentYear = new Date().getFullYear();
const menuOpen = ref(false);
const langOpen = ref(false);
const langSwitcherEl = ref<HTMLElement | null>(null);

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

function switchLocale(code: Locale) {
  setLocale(code);
  langOpen.value = false;
}

function closeMobileMenu() {
  menuOpen.value = false;
}

function onDocClick(e: MouseEvent) {
  if (langSwitcherEl.value && !langSwitcherEl.value.contains(e.target as Node)) {
    langOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', onDocClick));
onUnmounted(() => document.removeEventListener('click', onDocClick));
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink to="/" class="brand" :aria-label="t('nav.home')">
        <span class="brand-mark">HR</span>
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

        <RouterLink to="/app" class="header-action">{{ t('nav.webApp') }}</RouterLink>

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
          <RouterLink to="/app" class="mobile-cta" @click="closeMobileMenu">{{ t('nav.webApp') }}</RouterLink>
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
          <a href="mailto:hello@jkcqplan.com">{{ t('footer.contact') }}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ currentYear }} HealthResetPlan</span>
        <span>{{ t('footer.disclaimer') }}</span>
      </div>
    </footer>
  </div>
</template>
