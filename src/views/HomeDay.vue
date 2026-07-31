<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { dayHomeMessages, type DayHomeLocale } from '@/i18n/day-home';

const { locale } = useI18n();

function getDayLocale(): DayHomeLocale {
  return locale.value in dayHomeMessages.copyMap ? (locale.value as DayHomeLocale) : 'zh-CN';
}

const copy = computed(() => dayHomeMessages.copyMap[getDayLocale()]);
const healthStats = computed(() => dayHomeMessages.healthStatsMap[getDayLocale()]);
const flowSteps = computed(() => dayHomeMessages.flowStepsMap[getDayLocale()]);
const privacyItems = computed(() => dayHomeMessages.privacyItemsMap[getDayLocale()]);
const downloadCards = computed(() => dayHomeMessages.downloadCardsMap[getDayLocale()]);
</script>

<template>
  <div class="page">
    <section class="hero-section">
      <div class="hero-inner">
        <div class="hero-copy">
          <span class="eyebrow">{{ copy.heroEyebrow }}</span>
          <h1>{{ copy.heroTitle }}</h1>
          <h2>{{ copy.heroSubtitle }}</h2>
          <p>{{ copy.heroDesc }}</p>
          <div class="hero-actions">
            <RouterLink to="/download" class="btn btn-primary">{{ copy.downloadBtn }}</RouterLink>
            <RouterLink to="/features" class="btn btn-secondary">{{ copy.planBtn }}</RouterLink>
          </div>
        </div>

        <div class="hero-visual" :aria-label="copy.videoLabel">
          <div class="hero-video-card">
            <video class="hero-video" autoplay muted loop playsinline preload="metadata">
              <source src="/media/hero-day-video.webm?v=1" type="video/webm" />
              <source src="/media/hero-day-video.mp4?v=4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>

    <section class="status-section section-band">
      <div class="section-inner">
        <div class="section-heading centered">
          <span class="eyebrow">{{ copy.statusEyebrow }}</span>
          <h2>{{ copy.statusTitle }}</h2>
          <p>{{ copy.statusDesc }}</p>
        </div>
        <div class="status-grid">
          <article v-for="item in healthStats" :key="item.label" class="status-card">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <small>{{ item.unit }}</small>
          </article>
        </div>
        <div class="wave-wrap" aria-hidden="true">
          <svg viewBox="0 0 980 170" preserveAspectRatio="none" class="wave-line">
            <path d="M0 118 C 130 52, 230 112, 360 58 S 585 88, 700 42 S 880 86, 980 22" />
          </svg>
          <div class="tip-box">{{ copy.tip }}</div>
        </div>
      </div>
    </section>

    <section class="flow-section section-band">
      <div class="section-inner">
        <div class="section-heading centered">
          <span class="eyebrow">{{ copy.flowEyebrow }}</span>
          <h2>{{ copy.flowTitle }}</h2>
        </div>
        <div class="flow-wrap">
          <article v-for="(step, index) in flowSteps" :key="step" class="flow-step">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ step }}</strong>
          </article>
        </div>
      </div>
    </section>

    <section class="privacy-section section-band">
      <div class="section-inner privacy-layout">
        <div class="privacy-art" :aria-label="copy.privacyLabel">
          <div class="desk-card card-left">
            <span>{{ copy.bloodPressure }}</span>
            <strong>118/76</strong>
          </div>
          <div class="desk-card card-right">
            <span>{{ copy.sleep }}</span>
            <strong>7.2h</strong>
          </div>
          <div class="diary-book">
            <span></span>
            <span class="short"></span>
            <strong>{{ copy.lock }}</strong>
          </div>
        </div>
        <div class="section-heading privacy-copy">
          <span class="eyebrow">{{ copy.privacyEyebrow }}</span>
          <h2>{{ copy.privacyTitle }}</h2>
          <p>{{ copy.privacyDesc }}</p>
          <div class="privacy-list">
            <article v-for="item in privacyItems" :key="item.title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.desc }}</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="download-section section-band">
      <div class="section-inner">
        <div class="section-heading centered">
          <span class="eyebrow">{{ copy.downloadEyebrow }}</span>
          <h2>{{ copy.downloadTitle }}</h2>
          <p>{{ copy.downloadDesc }}</p>
        </div>
        <div class="download-grid">
          <article v-for="item in downloadCards" :key="item.title" class="download-card">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </article>
        </div>
        <div class="download-actions">
          <RouterLink to="/download" class="btn btn-primary">{{ copy.downloadNow }}</RouterLink>
          <a
            href="https://app.jkcqplan.com/"
            class="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ copy.webApp }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.page {
  --mint: #8fd3b9;
  --cream: #fff9f0;
  --text: #3a4240;
  --body: #525b59;
  color: var(--text);
  background: var(--cream);
}

.hero-section {
  width: 100vw;
  min-height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  margin-left: calc(50% - 50vw);
  padding-top: 72px;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 200, 162, 0.2), transparent 26%),
    radial-gradient(circle at 82% 18%, rgba(143, 211, 185, 0.34), transparent 34%),
    linear-gradient(135deg, #fff9f0 0%, #fffaf4 46%, rgba(143, 211, 185, 0.42) 100%);
}

.section-inner,
.hero-inner {
  width: min(1280px, calc(100% - 96px));
  margin: 0 auto;
}

.hero-inner {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: minmax(0, 0.48fr) minmax(0, 0.52fr);
  gap: clamp(58px, 5.4vw, 88px);
  align-items: center;
}

@media (min-width: 1440px) {
  .hero-inner {
    width: min(1320px, calc(100% - 120px));
  }
}

.hero-copy {
  max-width: 590px;
}

.hero-visual {
  min-height: 0;
}

.eyebrow {
  display: inline-flex;
  width: fit-content;
  padding: 8px 18px;
  color: var(--text);
  background: rgba(143, 211, 185, 0.24);
  border: 1px solid rgba(143, 211, 185, 0.42);
  border-radius: 999px;
  font-size: 15px;
  font-weight: 800;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  margin-top: 24px;
  color: var(--text);
  font-size: clamp(68px, 5.2vw, 92px);
  line-height: 0.98;
  font-weight: 900;
}

.hero-copy h2,
.section-heading h2 {
  color: var(--text);
  font-weight: 900;
  line-height: 1.12;
}

.hero-copy h2 {
  max-width: 620px;
  margin-top: 20px;
  font-size: clamp(34px, 2.8vw, 52px);
}

.section-heading h2 {
  margin-top: 14px;
  font-size: clamp(38px, 3.8vw, 58px);
}

p {
  margin-top: 20px;
  color: var(--body);
  font-size: clamp(18px, 1.15vw, 22px);
  line-height: 1.78;
  font-weight: 650;
}

.hero-actions,
.download-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 34px;
}

.btn {
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 28px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 17px;
  font-weight: 850;
  text-decoration: none;
}

.btn-primary {
  color: #fff !important;
  background: var(--mint);
  box-shadow: 0 18px 42px rgba(143, 211, 185, 0.34);
}

.btn-secondary {
  color: var(--text);
  background: rgba(255, 255, 255, 0.84);
  border-color: rgba(143, 211, 185, 0.42);
}

.hero-video-card {
  width: 100%;
  max-width: 680px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(143, 211, 185, 0.28);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: 0 30px 82px rgba(143, 211, 185, 0.22);
  justify-self: center;
}

.hero-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.section-band {
  padding: clamp(72px, 8vw, 116px) 0;
}

.centered {
  max-width: 820px;
  margin: 0 auto 38px;
  text-align: center;
}

.status-grid,
.download-grid,
.privacy-list,
.flow-wrap {
  display: grid;
  gap: 22px;
}

.status-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.download-grid,
.privacy-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.flow-wrap {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.status-card,
.download-card,
.privacy-list article,
.flow-step {
  border: 1px solid rgba(143, 211, 185, 0.34);
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 18px 48px rgba(143, 211, 185, 0.14);
}

.status-card {
  display: grid;
  gap: 10px;
  padding: 28px;
  border-radius: 30px;

  span,
  small {
    color: var(--body);
    font-weight: 750;
  }

  strong {
    color: var(--text);
    font-size: 40px;
    line-height: 1;
    font-weight: 900;
  }
}

.wave-wrap {
  position: relative;
  min-height: 210px;
  margin-top: 24px;
  border-radius: 38px;
  background: linear-gradient(180deg, rgba(143, 211, 185, 0.12), rgba(143, 211, 185, 0.3));
  overflow: hidden;
}

.wave-line {
  position: absolute;
  inset: 28px 0 auto;
  width: 100%;
  height: 170px;

  path {
    fill: none;
    stroke: var(--mint);
    stroke-width: 8;
    stroke-linecap: round;
  }
}

.tip-box {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  padding: 12px 22px;
  color: var(--body);
  background: rgba(248, 228, 156, 0.72);
  border-radius: 999px;
  font-weight: 800;
}

.flow-step {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  min-height: 172px;
  padding: 24px;
  text-align: center;
  border-radius: 999px;
  background: rgba(143, 211, 185, 0.28);

  span {
    color: #5c9f86;
    font-weight: 900;
  }

  strong {
    color: var(--text);
    font-size: 19px;
    line-height: 1.42;
    font-weight: 900;
  }
}

.privacy-layout {
  display: grid;
  grid-template-columns: minmax(420px, 0.48fr) minmax(0, 0.52fr);
  gap: clamp(42px, 6vw, 86px);
  align-items: center;
}

.privacy-art {
  position: relative;
  min-height: 360px;
  border-radius: 34px;
  background:
    radial-gradient(circle at 50% 42%, rgba(143, 211, 185, 0.2), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 249, 240, 0.42));
  box-shadow: 0 20px 54px rgba(143, 211, 185, 0.14);
  overflow: hidden;
}

.diary-book {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 160px;
  height: 196px;
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 30px 26px;
  border-radius: 28px;
  background: linear-gradient(180deg, #8fd3b9, #66b99b);
  box-shadow: 0 24px 58px rgba(92, 159, 134, 0.24);
  transform: translate(-50%, -50%);

  span {
    height: 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.56);
  }

  .short {
    width: 62%;
  }

  strong {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    justify-self: center;
    margin-top: 14px;
    color: #fff;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.24);
    font-size: 22px;
  }
}

.desk-card {
  position: absolute;
  z-index: 2;
  display: grid;
  gap: 6px;
  min-width: 116px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(143, 211, 185, 0.32);
  box-shadow: 0 14px 34px rgba(143, 211, 185, 0.12);

  span {
    color: var(--body);
    font-weight: 800;
  }

  strong {
    color: var(--text);
    font-size: 24px;
  }
}

.card-left {
  left: 36px;
  top: 52px;
}

.card-right {
  right: 34px;
  bottom: 54px;
}

.privacy-list article,
.download-card {
  display: grid;
  gap: 8px;
  padding: 24px;
  border-radius: 24px;

  strong {
    color: var(--text);
    font-size: 20px;
    font-weight: 900;
  }

  span {
    color: var(--body);
    line-height: 1.7;
    font-weight: 650;
  }
}

.download-actions {
  justify-content: center;
}

@media (max-width: 1080px) {
  .hero-inner,
  .privacy-layout {
    grid-template-columns: 1fr;
  }

  .hero-inner {
    width: min(760px, calc(100% - 48px));
    min-height: auto;
    gap: 42px;
    padding: 72px 0 56px;
  }

  .status-grid,
  .download-grid,
  .privacy-list,
  .flow-wrap {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .section-inner {
    width: min(1280px, calc(100% - 32px));
  }

  .hero-section {
    min-height: auto;
    padding-top: 72px;
  }

  .hero-inner {
    width: min(760px, calc(100% - 32px));
    gap: 28px;
    padding: 34px 0 44px;
  }

  h1 {
    margin-top: 18px;
    font-size: 44px;
    line-height: 1;
  }

  .hero-copy h2,
  .section-heading h2 {
    font-size: 30px;
  }

  p {
    font-size: 16px;
    line-height: 1.68;
  }

  .hero-actions,
  .download-actions {
    width: 100%;
    gap: 12px;
  }

  .btn {
    width: 100%;
    min-height: 52px;
  }

  .status-grid,
  .download-grid,
  .privacy-list,
  .flow-wrap {
    grid-template-columns: 1fr;
  }

  .privacy-art {
    min-height: 300px;
  }

  .status-card,
  .download-card,
  .privacy-list article {
    border-radius: 22px;
    padding: 22px;
  }

  .flow-step {
    min-height: 118px;
    border-radius: 28px;
  }

  .status-card strong {
    font-size: 34px;
  }

  .wave-wrap {
    min-height: 160px;
    border-radius: 26px;
  }

  .tip-box {
    width: calc(100% - 32px);
    text-align: center;
    white-space: normal;
  }
}

@media (max-width: 380px) {
  h1 {
    font-size: 38px;
  }

  .hero-copy h2,
  .section-heading h2 {
    font-size: 27px;
  }

  .privacy-art {
    min-height: 260px;
  }
}
</style>
