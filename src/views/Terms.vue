<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { legalMessages } from '@/i18n/legal'

const { locale } = useI18n()

const document = computed(() => legalMessages[locale.value].legalTerms)
</script>

<template>
  <article class="legal-page">
    <span class="eyebrow">{{ document.eyebrow }}</span>
    <h1>{{ document.title }}</h1>
    <p class="legal-lead">{{ document.effectiveDate }}</p>

    <section
      v-for="section in document.sections"
      :key="section.title"
    >
      <h2>{{ section.title }}</h2>
      <p
        v-for="paragraph in section.paragraphs"
        :key="paragraph"
      >
        {{ paragraph }}
      </p>
      <ul
        v-if="section.items"
        class="check-list"
      >
        <li
          v-for="item in section.items"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <p class="legal-footer">{{ document.footer }}</p>
  </article>
</template>
