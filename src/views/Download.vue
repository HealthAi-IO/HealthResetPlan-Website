<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const platforms = computed(() => [
  {
    name: t('download.android'),
    code: 'Android',
    desc: t('download.androidDesc'),
    status: t('download.androidStatus'),
    available: true,
  },
  {
    name: t('download.ios'),
    code: 'iOS',
    desc: t('download.iosDesc'),
    status: t('download.iosStatus'),
    available: false,
  },
  {
    name: t('download.windows'),
    code: 'Win',
    desc: t('download.windowsDesc'),
    status: t('download.windowsStatus'),
    available: false,
  },
  {
    name: t('download.macos'),
    code: 'Mac',
    desc: t('download.macosDesc'),
    status: t('download.macosStatus'),
    available: false,
  },
  {
    name: t('download.web'),
    code: 'Web',
    desc: t('download.webDesc'),
    status: t('download.webStatus'),
    available: true,
  },
  {
    name: t('download.mp'),
    code: 'MP',
    desc: t('download.mpDesc'),
    status: t('download.mpStatus'),
    available: false,
  },
]);

const releaseSteps = computed(() => [
  t('download.step1'),
  t('download.step2'),
  t('download.step3'),
]);
</script>

<template>
  <section class="page-hero">
    <span class="eyebrow">{{ t('download.eyebrow') }}</span>
    <h1>{{ t('download.title') }}</h1>
    <p>{{ t('download.desc') }}</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="mailto:hello@jkcqplan.com?subject=Android Beta">
        {{ t('download.ctaPrimary') }}
      </a>
      <a class="btn btn-secondary" href="mailto:hello@jkcqplan.com?subject=Beta Access">
        {{ t('download.ctaSecondary') }}
      </a>
    </div>
  </section>

  <section class="section">
    <div class="download-grid">
      <article v-for="platform in platforms" :key="platform.code" class="download-card">
        <div class="platform-code">{{ platform.code }}</div>
        <div class="platform-info">
          <h2>{{ platform.name }}</h2>
          <p>{{ platform.desc }}</p>
        </div>
        <span class="status-pill" :class="{ available: platform.available }">
          {{ platform.status }}
        </span>
      </article>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <span class="eyebrow">{{ t('download.planEyebrow') }}</span>
      <h2>{{ t('download.planTitle') }}</h2>
      <p>{{ t('download.planDesc') }}</p>
    </div>
    <ol class="timeline-list">
      <li v-for="step in releaseSteps" :key="step">{{ step }}</li>
    </ol>
  </section>
</template>
