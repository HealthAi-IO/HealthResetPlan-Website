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
  { num: '01', model: '7D', data: '1570 kcal', title: t('home.cap1Title'), desc: t('home.cap1Desc') },
  { num: '02', model: '118/76', data: '52.4 kg', title: t('home.cap2Title'), desc: t('home.cap2Desc') },
  { num: '03', model: '✓', data: '8632 steps', title: t('home.cap3Title'), desc: t('home.cap3Desc') },
  { num: '04', model: 'AES', data: '256-GCM', title: t('home.cap4Title'), desc: t('home.cap4Desc') },
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

const chartBars = [42, 58, 51, 76, 64, 82, 73];
</script>

<template>
  <!-- Hero -->
  <section class="hero-section immersive-hero">
    <div class="hero-content depth-layer">
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

    <div class="hero-visual depth-layer" aria-label="product scene">
    </div>
  </section>

  <!-- 统计指标条 -->
  <section class="section compact-section reveal-3d">
    <div class="metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-item">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </div>
    <div class="completion-strip">
      <div>
        <span>{{ t('home.todayRate') }}</span>
        <strong>82%</strong>
      </div>
      <i aria-hidden="true"></i>
    </div>
  </section>

  <!-- 核心能力 -->
  <section class="section reveal-3d">
    <div class="section-heading">
      <span class="eyebrow">{{ t('home.coreEyebrow') }}</span>
      <h2>{{ t('home.coreTitle') }}</h2>
      <p>{{ t('home.coreDesc') }}</p>
    </div>
    <div class="card-grid">
      <article v-for="cap in caps" :key="cap.num" class="feature-card">
        <span class="feature-mark">{{ cap.num }}</span>
        <div class="mini-3d-model">{{ cap.model }}</div>
        <div class="animated-data">{{ cap.data }}</div>
        <h3>{{ cap.title }}</h3>
        <p>{{ cap.desc }}</p>
      </article>
    </div>
  </section>

  <!-- 五步流程 -->
  <section class="section flow-section reveal-3d">
    <div class="section-heading">
      <span class="eyebrow">{{ t('home.flowEyebrow') }}</span>
      <h2>{{ t('home.flowTitle') }}</h2>
    </div>
    <div class="journey">
      <div v-for="(item, index) in journey" :key="item" class="journey-item">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item }}</strong>
        <small>{{ ['Profile', 'Metrics', 'Plan', 'Reminder', 'Review'][index] }}</small>
      </div>
    </div>
  </section>

  <section class="section data-section reveal-3d">
    <div class="section-heading">
      <span class="eyebrow">Data visualization</span>
      <h2>{{ t('home.todayRate') }} · 82%</h2>
      <p>血压 118/76、血糖 4.9 mmol/L、体重 52.4kg、步数 8632，健康指标以 3D 数据流持续复盘。</p>
    </div>
    <div class="chart-stage">
      <div v-for="(bar, index) in chartBars" :key="index" class="chart-bar" :style="{ '--bar-height': `${bar}%` }">
        <span>{{ bar }}</span>
      </div>
    </div>
  </section>

  <!-- 隐私分栏 -->
  <section class="section split-section security-scene reveal-3d">
    <div>
      <span class="eyebrow">{{ t('home.privacyEyebrow') }}</span>
      <h2>{{ t('home.privacyTitle') }}</h2>
      <p>{{ t('home.privacyDesc') }}</p>
      <RouterLink to="/privacy" class="text-link">{{ t('home.privacyLink') }}</RouterLink>
    </div>
    <div class="cipher-cube" aria-hidden="true">
      <span>AES-256</span>
      <small>UMK</small>
    </div>
    <div class="security-list">
      <div v-for="item in secItems" :key="item.key">
        <strong>{{ item.key }}</strong>
        <span>{{ item.desc }}</span>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section cta-section reveal-3d">
    <div>
      <h2>{{ t('home.ctaTitle') }}</h2>
      <p>{{ t('home.ctaDesc') }}</p>
    </div>
    <div class="cta-actions">
      <RouterLink to="/download" class="btn btn-primary">{{ t('home.ctaDownload') }}</RouterLink>
      <a
        href="https://app.jkcqplan.com/"
        class="btn btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('home.ctaWeb') }}
      </a>
    </div>
  </section>
</template>

<style lang="less" scoped>
.depth-layer {
  transform-style: preserve-3d;
  animation: layer-float 8s ease-in-out infinite alternate;
}

.immersive-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: clamp(96px, 12vh, 150px) clamp(24px, 6vw, 92px) clamp(44px, 8vh, 80px);
  perspective: 1200px;
  grid-template-columns: minmax(600px, 0.55fr) minmax(0, 0.45fr);
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    background:
      linear-gradient(90deg, rgba(8, 10, 20, 0.92) 0%, rgba(8, 10, 20, 0.72) 28%, rgba(8, 10, 20, 0.16) 55%, transparent 100%),
      linear-gradient(180deg, rgba(8, 10, 20, 0.05), rgba(8, 10, 20, 0.52));
    pointer-events: none;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  align-self: center;
  max-width: 720px;
  margin-left: clamp(18px, 2.6vw, 52px);
  padding: clamp(28px, 3.6vw, 46px);
  border: 1px solid rgba(32, 198, 240, 0.22);
  border-radius: 8px;
  background: rgba(8, 10, 20, 0.48);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(22px);
}

.hero-content h1 {
  font-size: clamp(50px, 5.4vw, 72px);
  font-weight: 900;
  line-height: 1.02;
}

.hero-lead {
  font-size: clamp(18px, 1.34vw, 21px);
  line-height: 1.75;
}

.hero-actions {
  gap: 18px;
  margin-top: 30px;
}

.hero-actions .btn {
  min-height: 56px;
  padding: 0 28px;
  font-size: 18px;
}

.trust-row {
  gap: 14px;
  margin-top: 26px;
}

.trust-row span {
  padding: 10px 15px;
  font-size: 16px;
}

.hero-visual {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 120px);
  transform: translateZ(24px);
  pointer-events: none;
}

.hero-visual :deep(.three-health-scene) {
  margin-bottom: 0;
}

.hero-visual .hero-insight-card,
.hero-visual .hero-privacy-card {
  position: absolute;
  z-index: 2;
  display: inline-grid;
  min-width: min(230px, 100%);
  margin: 0;
}

.hero-visual .hero-insight-card {
  right: clamp(22px, 7vw, 96px);
  bottom: clamp(70px, 12vh, 130px);
}

.hero-visual .hero-privacy-card {
  right: clamp(24px, 5vw, 78px);
  top: clamp(110px, 16vh, 160px);
}

.completion-strip {
  width: min(760px, 100%);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
  margin: 22px auto 0;
  padding: 16px 20px;
  border: 1px solid rgba(32, 198, 240, 0.2);
  border-radius: 8px;
  background: rgba(8, 10, 20, 0.48);
  backdrop-filter: blur(18px);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.08);

  span {
    display: block;
    color: rgba(202, 219, 232, 0.68);
    font-size: 12px;
  }

  strong {
    display: block;
    color: #ffffff;
    font-size: 28px;
    line-height: 1;
  }

  i {
    height: 8px;
    border-radius: 999px;
    background:
      linear-gradient(90deg, rgba(32, 198, 240, 0.95) 0 82%, rgba(255, 255, 255, 0.18) 82% 100%);
    box-shadow: 0 0 24px rgba(32, 198, 240, 0.2);
  }
}

.reveal-3d {
  animation: reveal-3d 0.8s ease both;
  animation-timeline: view();
  animation-range: entry 10% cover 34%;
}

.mini-3d-model {
  width: 74px;
  height: 74px;
  display: grid;
  place-items: center;
  margin-top: 18px;
  color: #eafaff;
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.38), transparent 32%),
    linear-gradient(145deg, rgba(32, 198, 240, 0.34), rgba(156, 124, 255, 0.18));
  border: 1px solid rgba(32, 198, 240, 0.32);
  border-radius: 8px;
  box-shadow: 0 20px 42px rgba(32, 198, 240, 0.12), inset 0 0 28px rgba(255, 255, 255, 0.06);
  font-weight: 900;
  transform: rotateX(12deg) rotateY(-18deg);
  animation: model-hover 5s ease-in-out infinite;
}

.animated-data {
  width: max-content;
  margin-top: 14px;
  padding: 7px 10px;
  color: #9fefff;
  background: rgba(32, 198, 240, 0.1);
  border: 1px solid rgba(32, 198, 240, 0.2);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  animation: data-pulse 1.8s ease-in-out infinite;
}

.journey-item {
  transform-style: preserve-3d;

  small {
    display: block;
    margin-top: 12px;
    color: rgba(159, 239, 255, 0.58);
  }
}

.data-section {
  position: relative;
}

.chart-stage {
  height: 320px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 18px;
  align-items: end;
  padding: 28px;
  border: 1px solid rgba(32, 198, 240, 0.22);
  border-radius: 8px;
  background:
    linear-gradient(rgba(32, 198, 240, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 198, 240, 0.08) 1px, transparent 1px),
    rgba(255, 255, 255, 0.05);
  background-size: 100% 25%, 14.28% 100%, auto;
  box-shadow: inset 0 0 44px rgba(32, 198, 240, 0.05);
  perspective: 900px;
}

.chart-bar {
  position: relative;
  height: var(--bar-height);
  min-height: 46px;
  border-radius: 8px 8px 3px 3px;
  background: linear-gradient(180deg, rgba(32, 198, 240, 0.9), rgba(156, 124, 255, 0.28));
  box-shadow: 0 22px 38px rgba(32, 198, 240, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.42);
  transform: rotateX(12deg) translateZ(18px);
  animation: bar-rise 2.8s ease-in-out infinite alternate;

  span {
    position: absolute;
    left: 50%;
    top: -26px;
    color: #dff9ff;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: 800;
  }
}

.security-scene {
  grid-template-columns: minmax(0, 0.9fr) 180px minmax(320px, 1fr);
}

.cipher-cube {
  position: relative;
  width: 150px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  justify-self: center;
  color: #ffffff;
  border: 1px solid rgba(32, 198, 240, 0.34);
  border-radius: 8px;
  background:
    linear-gradient(45deg, transparent 45%, rgba(32, 198, 240, 0.24) 46%, transparent 50%),
    rgba(32, 198, 240, 0.08);
  box-shadow: 0 24px 60px rgba(32, 198, 240, 0.13), inset 0 0 40px rgba(156, 124, 255, 0.12);
  transform: rotateX(58deg) rotateZ(43deg);
  animation: cube-turn 8s linear infinite;

  span,
  small {
    transform: rotateZ(-43deg) rotateX(-58deg);
  }

  span {
    font-weight: 900;
  }

  small {
    position: absolute;
    bottom: 24px;
    color: #9fefff;
    font-weight: 800;
  }
}

@keyframes layer-float {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -10px, 28px); }
}

@keyframes reveal-3d {
  from { opacity: 0; transform: translate3d(0, 80px, -120px) rotateX(8deg); }
  to { opacity: 1; transform: translate3d(0, 0, 0) rotateX(0); }
}

@keyframes model-hover {
  50% { transform: translateY(-8px) rotateX(18deg) rotateY(18deg); }
}

@keyframes data-pulse {
  50% { color: #ffffff; box-shadow: 0 0 22px rgba(32, 198, 240, 0.18); }
}

@keyframes bar-rise {
  to { filter: brightness(1.18); transform: rotateX(8deg) translateZ(26px) translateY(-8px); }
}

@keyframes cube-turn {
  to { transform: rotateX(58deg) rotateZ(403deg); }
}

@media (max-width: 920px) {
  .immersive-hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 112px;
  }

  .hero-content {
    width: min(100%, 680px);
    margin-left: 0;
  }

  .completion-strip {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .hero-visual .hero-insight-card,
  .hero-visual .hero-privacy-card {
    display: none;
  }

  .security-scene {
    grid-template-columns: 1fr;
  }

  .cipher-cube {
    width: 130px;
  }
}

@media (max-width: 560px) {
  .immersive-hero {
    min-height: auto;
    padding: 104px 14px 34px;
  }

  .hero-content {
    padding: 22px;
  }

  .hero-content h1 {
    font-size: 42px;
  }

  .hero-actions .btn {
    min-height: 52px;
    font-size: 17px;
  }

  .chart-stage {
    height: 240px;
    gap: 9px;
    padding: 18px;
  }

  .mini-3d-model {
    width: 62px;
    height: 62px;
  }
}
</style>
