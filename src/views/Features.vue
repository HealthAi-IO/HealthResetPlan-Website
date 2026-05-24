<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const rows = computed(() => tm('features.rows') as { feature: string; free: boolean; paid: boolean }[]);

const detailGroups = computed(() => [
  {
    num: '01',
    title: t('features.g1Title'),
    summary: t('features.g1Summary'),
    points: [t('features.g1p1'), t('features.g1p2'), t('features.g1p3')],
  },
  {
    num: '02',
    title: t('features.g2Title'),
    summary: t('features.g2Summary'),
    points: [t('features.g2p1'), t('features.g2p2'), t('features.g2p3')],
  },
  {
    num: '03',
    title: t('features.g3Title'),
    summary: t('features.g3Summary'),
    points: [t('features.g3p1'), t('features.g3p2'), t('features.g3p3')],
  },
  {
    num: '04',
    title: t('features.g4Title'),
    summary: t('features.g4Summary'),
    points: [t('features.g4p1'), t('features.g4p2'), t('features.g4p3')],
  },
]);

const scenarios = computed(() => [
  { title: t('features.s1Title'), desc: t('features.s1Desc') },
  { title: t('features.s2Title'), desc: t('features.s2Desc') },
  { title: t('features.s3Title'), desc: t('features.s3Desc') },
]);
</script>

<template>
  <!-- 页面 Hero -->
  <section class="page-hero">
    <span class="eyebrow">{{ t('features.eyebrow') }}</span>
    <h1>{{ t('features.title') }}</h1>
    <p>{{ t('features.desc') }}</p>
  </section>

  <!-- 免费/付费对比表 -->
  <section class="section pricing-section">
    <div class="section-heading">
      <h2>{{ t('features.pricingTitle') }}</h2>
      <p>{{ t('features.pricingDesc') }}</p>
    </div>

    <div class="pricing-grid">
      <!-- 免费版卡片 -->
      <div class="pricing-card">
        <div class="pricing-tier-label">{{ t('features.free') }}</div>
        <div class="pricing-price">{{ t('features.freePrice') }}</div>
        <p class="pricing-desc">{{ t('features.freeDesc') }}</p>
        <a href="/download" class="btn btn-secondary pricing-btn">{{ t('features.freeCta') }}</a>
      </div>

      <!-- 付费版卡片 -->
      <div class="pricing-card pricing-card--pro">
        <div class="pricing-tier-label">{{ t('features.paid') }}</div>
        <div class="pricing-price">{{ t('features.paidPrice') }}</div>
        <p class="pricing-desc">{{ t('features.paidDesc') }}</p>
        <a href="mailto:hello@jkcqplan.com?subject=Pro" class="btn btn-primary pricing-btn">{{ t('features.paidCta') }}</a>
      </div>
    </div>

    <!-- 功能对比表格 -->
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th></th>
            <th>{{ t('features.free') }}</th>
            <th>{{ t('features.paid') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.feature">
            <td>{{ row.feature }}</td>
            <td>
              <span v-if="row.free" class="check-icon" aria-label="included">✓</span>
              <span v-else class="dash-icon" aria-label="not included">—</span>
            </td>
            <td>
              <span v-if="row.paid" class="check-icon" aria-label="included">✓</span>
              <span v-else class="dash-icon" aria-label="not included">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- 功能详情 -->
  <section class="section feature-detail-list">
    <div class="section-heading">
      <span class="eyebrow">{{ t('features.detailEyebrow') }}</span>
    </div>
    <article v-for="group in detailGroups" :key="group.num" class="detail-card">
      <div class="detail-code">{{ group.num }}</div>
      <div>
        <h2>{{ group.title }}</h2>
        <p>{{ group.summary }}</p>
        <ul class="check-list">
          <li v-for="point in group.points" :key="point">{{ point }}</li>
        </ul>
      </div>
    </article>
  </section>

  <!-- 场景卡片 -->
  <section class="section">
    <div class="section-heading">
      <span class="eyebrow">{{ t('features.scenarioEyebrow') }}</span>
      <h2>{{ t('features.scenarioTitle') }}</h2>
    </div>
    <div class="card-grid three">
      <article v-for="scenario in scenarios" :key="scenario.title" class="feature-card">
        <span class="feature-mark">▸</span>
        <h3>{{ scenario.title }}</h3>
        <p>{{ scenario.desc }}</p>
      </article>
    </div>
  </section>
</template>
