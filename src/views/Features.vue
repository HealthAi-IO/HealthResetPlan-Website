<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const adminFeatures = computed(() => [
  { title: t('features.admin1Title'), desc: t('features.admin1Desc') },
  { title: t('features.admin2Title'), desc: t('features.admin2Desc') },
  { title: t('features.admin3Title'), desc: t('features.admin3Desc') },
  { title: t('features.admin4Title'), desc: t('features.admin4Desc') },
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

  <section class="section">
    <div class="section-heading">
      <span class="eyebrow">{{ t('features.adminEyebrow') }}</span>
      <h2>{{ t('features.adminTitle') }}</h2>
      <p>{{ t('features.adminDesc') }}</p>
    </div>
    <div class="card-grid">
      <article v-for="item in adminFeatures" :key="item.title" class="feature-card">
        <span class="feature-mark">▸</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </article>
    </div>
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
