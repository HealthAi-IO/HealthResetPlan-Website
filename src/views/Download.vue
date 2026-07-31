<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { http } from '@/utils/http';

const { t } = useI18n();

interface ReleaseInfo {
  available: boolean;
  version?: string;
  sizeMb?: number;
  downloadUrl?: string;
  updatedAt?: string;
}

interface PlatformCard {
  name: string;
  code: string;
  desc: string;
  status: string;
  available: boolean;
  downloadUrl?: string;
  downloadLabel?: string;
  secondaryDownloadUrl?: string;
  secondaryDownloadLabel?: string;
  downloadHint?: string;
  openInNewTab?: boolean;
}

const androidRelease = ref<ReleaseInfo | null>(null);
const windowsRelease = ref<ReleaseInfo | null>(null);
const webRelease = ref<ReleaseInfo | null>(null);
const androidReleaseLoading = ref(true);
const windowsReleaseLoading = ref(true);
const webReleaseLoading = ref(true);

onMounted(async () => {
  const [android, windows, web] = await Promise.all([
    http
      .get<ReleaseInfo>('/releases/latest?platform=android&channel=official')
      .catch(() => null),
    http
      .get<ReleaseInfo>('/releases/latest?platform=windows&channel=official')
      .catch(() => null),
    http
      .get<ReleaseInfo>('/releases/latest?platform=web&channel=official')
      .catch(() => null),
  ]);
  androidRelease.value = android;
  windowsRelease.value = windows;
  webRelease.value = web;
  androidReleaseLoading.value = false;
  windowsReleaseLoading.value = false;
  webReleaseLoading.value = false;
});

const windowsPortableUrl = computed(() => {
  const version = windowsRelease.value?.version;
  if (!version) return undefined;
  const filename = encodeURIComponent(`健康重启计划-Windows-${version}.zip`);
  return `https://jkcqplan.com/downloads/windows/${filename}`;
});

const platforms = computed<PlatformCard[]>(() => [
  {
    name: t('download.android'),
    code: 'Android',
    desc: t('download.androidDesc'),
    status: androidReleaseLoading.value
      ? t('download.loading')
      : androidRelease.value?.available
        ? `v${androidRelease.value.version} · ${androidRelease.value.sizeMb} MB`
        : t('download.androidStatus'),
    available: androidRelease.value?.available === true,
    downloadUrl: androidRelease.value?.downloadUrl,
    downloadLabel: t('download.downloadAndroid'),
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
    status: windowsReleaseLoading.value
      ? t('download.loading')
      : windowsRelease.value?.available
        ? `v${windowsRelease.value.version} · ${windowsRelease.value.sizeMb} MB`
        : t('download.windowsStatus'),
    available: windowsRelease.value?.available === true,
    downloadUrl: windowsRelease.value?.downloadUrl,
    downloadLabel: t('download.downloadWindows'),
    secondaryDownloadUrl: windowsPortableUrl.value,
    secondaryDownloadLabel: t('download.downloadWindowsPortable'),
    downloadHint: t('download.windowsPath'),
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
    status: webReleaseLoading.value
      ? t('download.loading')
      : webRelease.value?.available
        ? `v${webRelease.value.version}`
        : t('download.webStatus'),
    available: webRelease.value?.available === true,
    downloadUrl: webRelease.value?.downloadUrl,
    downloadLabel: t('download.openWeb'),
    openInNewTab: true,
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
  <main class="page">
    <section class="page-hero download-hero">
      <div class="download-hero-copy">
        <span class="eyebrow">{{ t('download.eyebrow') }}</span>
        <h1>{{ t('download.title') }}</h1>
        <p>{{ t('download.desc') }}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="mailto:87103978@qq.com?subject=Android Beta">
            {{ t('download.ctaPrimary') }}
          </a>
          <a class="btn btn-secondary" href="mailto:87103978@qq.com?subject=Beta Access">
            {{ t('download.ctaSecondary') }}
          </a>
        </div>
      </div>

      <div class="download-hero-art" aria-label="客户端下载插画">
        <div class="art-phone">
          <span class="phone-speaker"></span>
          <div class="download-icon">
            <span></span>
          </div>
          <strong>Android</strong>
          <small>健康数据随手记录</small>
        </div>
        <div class="art-card art-card-left">
          <span>Web</span>
          <strong>趋势复盘</strong>
        </div>
        <div class="art-card art-card-right">
          <span>7天</span>
          <strong>养护方案</strong>
        </div>
        <div class="art-leaf leaf-one"></div>
        <div class="art-leaf leaf-two"></div>
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
          <div v-if="platform.downloadUrl" class="download-actions">
            <a
              class="btn btn-primary"
              :href="platform.downloadUrl"
              :target="platform.openInNewTab ? '_blank' : undefined"
              :rel="platform.openInNewTab ? 'noopener noreferrer' : undefined"
            >
              {{ platform.downloadLabel }}
            </a>
            <a
              v-if="platform.secondaryDownloadUrl"
              class="btn btn-secondary"
              :href="platform.secondaryDownloadUrl"
            >
              {{ platform.secondaryDownloadLabel }}
            </a>
            <small v-if="platform.downloadHint">{{ platform.downloadHint }}</small>
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
  </main>
</template>

<style lang="less" scoped>
.download-hero {
  display: grid;
  grid-template-columns: minmax(360px, 0.46fr) minmax(520px, 0.54fr);
  gap: clamp(40px, 6vw, 88px);
  align-items: center;
  min-height: 520px;
  padding-top: clamp(76px, 9vw, 118px);
}

.download-hero-copy {
  max-width: 620px;
}

.download-actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;

  small {
    flex-basis: 100%;
    color: var(--text-muted);
  }
}

.download-hero-art {
  position: relative;
  min-height: 420px;
  border-radius: 42px;
  background:
    radial-gradient(circle at 28% 20%, rgba(255, 200, 162, 0.22), transparent 28%),
    radial-gradient(circle at 72% 70%, rgba(143, 211, 185, 0.3), transparent 34%),
    rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(143, 211, 185, 0.28);
  box-shadow: 0 28px 78px rgba(143, 211, 185, 0.16);
  overflow: hidden;
}

.art-phone {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 220px;
  height: 330px;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 16px;
  padding: 24px;
  color: #3a4240;
  border-radius: 38px;
  background: linear-gradient(180deg, #fff9f0 0%, #f0faf5 100%);
  border: 12px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 34px 82px rgba(92, 159, 134, 0.24);
  transform: translate(-50%, -50%) rotate(-7deg);
}

.phone-speaker {
  width: 70px;
  height: 7px;
  border-radius: 999px;
  background: rgba(58, 66, 64, 0.18);
}

.download-icon {
  width: 116px;
  height: 116px;
  display: grid;
  place-items: center;
  margin-top: 22px;
  border-radius: 36px;
  background: #8fd3b9;
  box-shadow: 0 18px 42px rgba(143, 211, 185, 0.32);

  span {
    width: 38px;
    height: 50px;
    border-radius: 999px 999px 10px 10px;
    border: solid #fff;
    border-width: 0 8px 8px 0;
    transform: rotate(45deg) translate(-4px, -8px);
  }
}

.art-phone strong {
  margin-top: 6px;
  font-size: 24px;
  font-weight: 900;
}

.art-phone small {
  color: #525b59;
  font-weight: 750;
}

.art-card {
  position: absolute;
  display: grid;
  gap: 4px;
  min-width: 150px;
  padding: 18px 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(143, 211, 185, 0.34);
  box-shadow: 0 22px 54px rgba(143, 211, 185, 0.16);
}

.art-card span {
  color: #5c9f86;
  font-weight: 900;
}

.art-card strong {
  color: #3a4240;
  font-size: 20px;
  font-weight: 900;
}

.art-card-left {
  left: 10%;
  top: 28%;
}

.art-card-right {
  right: 9%;
  bottom: 24%;
}

.art-leaf {
  position: absolute;
  width: 58px;
  height: 32px;
  border-radius: 58px 58px 58px 6px;
  background: rgba(143, 211, 185, 0.7);
}

.leaf-one {
  left: 18%;
  bottom: 18%;
  transform: rotate(28deg);
}

.leaf-two {
  right: 18%;
  top: 18%;
  transform: rotate(-28deg);
}

:global(body.theme-night .download-hero-art) {
  background:
    radial-gradient(circle at 58% 38%, rgba(32, 198, 240, 0.18), transparent 34%),
    rgba(8, 10, 20, 0.58);
  border-color: rgba(32, 198, 240, 0.28);
  box-shadow: 0 28px 86px rgba(0, 0, 0, 0.28);
}

@media (max-width: 980px) {
  .download-hero {
    grid-template-columns: 1fr;
  }

  .download-hero-art {
    min-height: 380px;
  }
}

@media (max-width: 560px) {
  .download-hero {
    min-height: auto;
  }

  .download-hero-art {
    min-height: 330px;
  }

  .art-card {
    display: none;
  }
}
</style>
