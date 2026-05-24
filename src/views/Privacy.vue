<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <article class="legal-page">
    <span class="eyebrow">{{ t('privacy.eyebrow') }}</span>
    <h1>{{ t('privacy.title') }}</h1>
    <p class="legal-lead">{{ t('privacy.lead') }}</p>

    <section>
      <h2>{{ t('privacy.s1Title') }}</h2>
      <ul class="check-list">
        <li>{{ t('privacy.s1p1') }}</li>
        <li>{{ t('privacy.s1p2') }}</li>
        <li>{{ t('privacy.s1p3') }}</li>
        <li>{{ t('privacy.s1p4') }}</li>
      </ul>
    </section>

    <section>
      <h2>{{ t('privacy.s2Title') }}</h2>
      <p>{{ t('privacy.s2p1') }}</p>
      <p>{{ t('privacy.s2p2') }}</p>
    </section>

    <section>
      <h2>{{ t('privacy.s3Title') }}</h2>
      <ul class="check-list">
        <li>{{ t('privacy.s3p1') }}</li>
        <li>{{ t('privacy.s3p2') }}</li>
        <li>{{ t('privacy.s3p3') }}</li>
        <li>{{ t('privacy.s3p4') }}</li>
      </ul>
    </section>

    <section>
      <h2>{{ t('privacy.s4Title') }}</h2>
      <p>{{ t('privacy.s4p1') }}</p>
    </section>

    <p class="legal-footer">{{ t('privacy.updated', { email: 'hello@jkcqplan.com' }) }}</p>
  </article>
</template>
