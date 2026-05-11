<script setup lang="ts">
import { RouterLink } from 'vue-router';

const features = [
  { icon: '🧠', title: 'AI 个性化计划', desc: '结合 DeepSeek / 豆包 / 通义千问，生成专属饮食、运动、用药方案。' },
  { icon: '🩺', title: '报告自动识别', desc: '上传体检报告，OCR + 大模型抽取血压、血脂、血糖等关键指标。' },
  { icon: '🔔', title: '智能提醒打卡', desc: '饮食、运动、用药、称重全流程提醒，打卡溯源，养成健康习惯。' },
  { icon: '⌚', title: '可穿戴设备', desc: '兼容小米、华为、苹果、Google 等品牌，蓝牙 / SDK 自动采集数据。' },
  { icon: '🔐', title: '端到端加密', desc: 'AES-256 加密，私钥仅存于您的设备，云端只见密文。' },
  { icon: '📱', title: '多端覆盖', desc: 'macOS / iOS / Windows / Android / Web / 微信小程序。' }
];

const scenes = [
  { title: '高血压人群', body: '盐分摄入、运动强度精准控制，按时用药与提醒，趋势可视化。' },
  { title: '高血脂人群', body: '低脂高纤维饮食 + 有氧运动，AI 跟踪血脂四项变化。' },
  { title: '肥胖人群', body: '热量缺口、营养比例科学配置，体重 / 体脂 / BMI 自动归档。' }
];
</script>

<template>
  <section class="hero">
    <div class="container">
      <h1>让健康，从今天「重启」。</h1>
      <p class="lead">针对三高与肥胖人群的 AI 智能健康管理平台。<br />个性化计划 · 智能提醒 · 设备联动 · 端到端加密。</p>
      <div class="cta-row">
        <RouterLink to="/app" class="btn btn-primary">进入 Web 版</RouterLink>
        <RouterLink to="/download" class="btn btn-outline">下载客户端</RouterLink>
      </div>
    </div>
  </section>

  <section class="features container">
    <h2>核心能力</h2>
    <div class="grid">
      <div v-for="f in features" :key="f.title" class="card">
        <div class="icon">{{ f.icon }}</div>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </div>
    </div>
  </section>

  <section class="scenes">
    <div class="container">
      <h2>典型场景</h2>
      <div class="scene-row">
        <div v-for="s in scenes" :key="s.title" class="scene">
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="privacy-cta container">
    <div class="card highlight">
      <h2>您的健康数据，只有您能看见。</h2>
      <p>开通云同步时，客户端会生成 AES-256 主密钥，保存到您本机的 Keychain / Keystore。<br />服务端只见密文，连开发者也无法解密。</p>
      <RouterLink to="/privacy" class="btn btn-primary">了解加密方案</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 96px 0 64px;
  background:
    radial-gradient(1200px 600px at 20% -10%, rgba(43, 190, 122, 0.18), transparent 60%),
    radial-gradient(1000px 600px at 100% 10%, rgba(30, 136, 229, 0.15), transparent 60%),
    #fff;
}
.hero h1 {
  font-size: 48px;
  line-height: 1.1;
  margin: 0 0 16px;
}
.hero .lead {
  font-size: 18px;
  color: var(--hrp-muted);
}
.cta-row {
  display: flex;
  gap: 12px;
  margin-top: 32px;
}
.features {
  padding: 80px 32px;
}
.features h2 {
  font-size: 32px;
  margin-bottom: 32px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
}
.card .icon {
  font-size: 28px;
  margin-bottom: 12px;
}
.card h3 {
  margin: 0 0 8px;
  font-size: 18px;
}
.card p {
  color: var(--hrp-muted);
  margin: 0;
  line-height: 1.6;
}
.scenes {
  background: #fff;
  padding: 80px 0;
}
.scenes h2 {
  font-size: 32px;
  margin-bottom: 24px;
}
.scene-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.scene {
  padding: 24px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}
.scene h3 {
  margin: 0 0 8px;
  color: var(--hrp-green);
}
.privacy-cta {
  padding: 64px 32px 96px;
}
.privacy-cta .card.highlight {
  background: linear-gradient(135deg, rgba(43, 190, 122, 0.08), rgba(30, 136, 229, 0.08));
  text-align: center;
}
.privacy-cta h2 {
  margin: 0 0 12px;
  font-size: 28px;
}
.privacy-cta p {
  color: var(--hrp-muted);
  margin: 0 0 24px;
}
</style>
