<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const metrics = computed(() => [
  { value: t('home.statsLabel1'), label: t('home.statsDesc1') },
  { value: t('home.statsLabel2'), label: t('home.statsDesc2') },
  { value: t('home.statsLabel3'), label: t('home.statsDesc3') },
]);

const caps = computed(() => [
  { num: '01', title: t('home.cap1Title'), desc: t('home.cap1Desc') },
  { num: '02', title: t('home.cap2Title'), desc: t('home.cap2Desc') },
  { num: '03', title: t('home.cap3Title'), desc: t('home.cap3Desc') },
  { num: '04', title: t('home.cap4Title'), desc: t('home.cap4Desc') },
]);

const journey = computed(() => [
  t('home.flow1'),
  t('home.flow2'),
  t('home.flow3'),
  t('home.flow4'),
  t('home.flow5'),
]);

const secItems = computed(() => [
  { key: t('home.sec1'), desc: t('home.sec1Desc') },
  { key: t('home.sec2'), desc: t('home.sec2Desc') },
  { key: t('home.sec3'), desc: t('home.sec3Desc') },
]);
</script>

<template>
  <!-- Hero -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="eyebrow">{{ t('home.eyebrow') }}</div>
      <h1>{{ t('home.hero') }}</h1>
      <p class="hero-lead">{{ t('home.lead') }}</p>
      <div class="hero-actions">
        <RouterLink to="/download" class="btn btn-primary">{{ t('home.ctaPrimary') }}</RouterLink>
        <RouterLink to="/privacy" class="btn btn-secondary">{{ t('home.ctaSecondary') }}</RouterLink>
      </div>
      <div class="trust-row" aria-label="platform capabilities">
        <span>{{ t('home.trust1') }}</span>
        <span>{{ t('home.trust2') }}</span>
        <span>{{ t('home.trust3') }}</span>
      </div>
    </div>

    <div class="hero-visual" aria-label="product scene">
      <img
        src="/hero-health-dashboard.png"
        :alt="t('home.heroDashboardAlt')"
        class="hero-dashboard-img"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
      <div class="hero-insight-card">
        <span>{{ t('home.todayRate') }}</span>
        <strong>82%</strong>
      </div>
      <div class="hero-privacy-card">
        <strong>{{ t('home.cipherSync') }}</strong>
        <span>{{ t('home.cipherDesc') }}</span>
      </div>
    </div>
  </section>

  <!-- 统计指标条 -->
  <section class="section compact-section">
    <div class="metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-item">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </div>
  </section>

  <!-- 核心能力 -->
  <section class="section">
    <div class="section-heading">
      <span class="eyebrow">{{ t('home.coreEyebrow') }}</span>
      <h2>{{ t('home.coreTitle') }}</h2>
      <p>{{ t('home.coreDesc') }}</p>
    </div>
    <div class="card-grid">
      <article v-for="cap in caps" :key="cap.num" class="feature-card">
        <span class="feature-mark">{{ cap.num }}</span>
        <h3>{{ cap.title }}</h3>
        <p>{{ cap.desc }}</p>
      </article>
    </div>
  </section>

  <!-- 产品场景展示横幅 -->
  <section class="section showcase-section">
    <div class="showcase-wrap">
      <img
        src="/poster-hero-2.png"
        :alt="t('home.poster2Alt')"
        loading="lazy"
        decoding="async"
        class="fade-in-img"
        @load="(e) => (e.target as HTMLImageElement).classList.add('loaded')"
      />
    </div>
  </section>

  <!-- 五步流程 -->
  <section class="section flow-section">
    <div class="section-heading">
      <span class="eyebrow">{{ t('home.flowEyebrow') }}</span>
      <h2>{{ t('home.flowTitle') }}</h2>
    </div>
    <div class="journey">
      <div v-for="(item, index) in journey" :key="item" class="journey-item">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item }}</strong>
      </div>
    </div>
  </section>

  <!-- 跑步激励横幅 -->
  <section class="section showcase-section">
    <div class="showcase-wrap">
      <img
        src="/poster-hero-1.png"
        :alt="t('home.poster1Alt')"
        loading="lazy"
        decoding="async"
        class="fade-in-img"
        @load="(e) => (e.target as HTMLImageElement).classList.add('loaded')"
      />
    </div>
  </section>

  <!-- 隐私分栏 -->
  <section class="section split-section">
    <div>
      <span class="eyebrow">{{ t('home.privacyEyebrow') }}</span>
      <h2>{{ t('home.privacyTitle') }}</h2>
      <p>{{ t('home.privacyDesc') }}</p>
      <RouterLink to="/privacy" class="text-link">{{ t('home.privacyLink') }}</RouterLink>
    </div>
    <div class="security-list">
      <div v-for="item in secItems" :key="item.key">
        <strong>{{ item.key }}</strong>
        <span>{{ item.desc }}</span>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section cta-section">
    <div>
      <h2>{{ t('home.ctaTitle') }}</h2>
      <p>{{ t('home.ctaDesc') }}</p>
    </div>
    <div class="cta-actions">
      <RouterLink to="/download" class="btn btn-primary">{{ t('home.ctaDownload') }}</RouterLink>
      <RouterLink to="/app" class="btn btn-secondary">{{ t('home.ctaWeb') }}</RouterLink>
    </div>
  </section>
</template>
