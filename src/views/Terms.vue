<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <article class="legal-page">
    <span class="eyebrow">{{ t('terms.eyebrow') }}</span>
    <h1>{{ t('terms.title') }}</h1>
    <p class="legal-lead">{{ t('terms.lead') }}</p>

    <section>
      <h2>{{ t('terms.s1Title') }}</h2>
      <p>{{ t('terms.s1p1') }}</p>
    </section>

    <section>
      <h2>{{ t('terms.s2Title') }}</h2>
      <ul class="check-list">
        <li>{{ t('terms.s2p1') }}</li>
        <li>{{ t('terms.s2p2') }}</li>
        <li>{{ t('terms.s2p3') }}</li>
      </ul>
    </section>

    <section>
      <h2>{{ t('terms.s3Title') }}</h2>
      <p>{{ t('terms.s3p1') }}</p>
    </section>

    <section>
      <h2>{{ t('terms.s4Title') }}</h2>
      <p>{{ t('terms.s4p1', { email: 'hello@jkcqplan.com' }) }}</p>
    </section>

    <p class="legal-footer">{{ t('terms.updated') }}</p>
  </article>
</template>
