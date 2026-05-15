<script setup lang="ts">
import { RouterLink } from 'vue-router';

const valueCards = [
  {
    label: '01',
    title: '个性化 7 天计划',
    desc: '结合身高、体重、年龄、血压、血脂和用药信息，生成饮食、运动、提醒建议。'
  },
  {
    label: '02',
    title: '体检报告识别',
    desc: '上传报告图片后自动提取关键指标，支持用户校对，减少手动录入负担。'
  },
  {
    label: '03',
    title: '提醒与打卡闭环',
    desc: '覆盖饮食、运动、用药、称重，配合打卡记录形成可复盘的执行数据。'
  },
  {
    label: '04',
    title: '端到端加密同步',
    desc: '敏感健康数据在客户端加密，主密钥由用户掌握，云端只保存密文。'
  }
];

const journey = [
  '录入档案',
  '识别报告',
  '生成计划',
  '提醒执行',
  '打卡复盘'
];

const metrics = [
  { value: '7 天', label: '饮食与运动计划周期' },
  { value: '4 类', label: '饮食/运动/用药/称重提醒' },
  { value: '5 端', label: '移动端、桌面端和 Web 覆盖' }
];
</script>

<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="eyebrow">AI 健康管理 · 本地优先 · 端到端加密</div>
      <h1>健康重启计划</h1>
      <p class="hero-lead">
        面向高血压、高血脂、糖尿病前期和体重管理人群，把健康档案、报告识别、AI 计划、提醒打卡和趋势复盘整合到一个可持续执行的工具里。
      </p>
      <div class="hero-actions">
        <RouterLink to="/app" class="btn btn-primary">体验 Web 版</RouterLink>
        <RouterLink to="/privacy" class="btn btn-secondary">了解加密机制</RouterLink>
      </div>
      <div class="trust-row" aria-label="平台能力摘要">
        <span>本地优先</span>
        <span>AES-256 加密</span>
        <span>多端同步</span>
      </div>
    </div>

    <div class="hero-visual" aria-label="健康重启计划产品场景">
      <img src="/hero-health-dashboard.png" alt="平板健康数据看板、可穿戴手环和血压计组成的健康管理桌面场景" />
      <div class="hero-insight-card">
        <span>今日计划执行率</span>
        <strong>82%</strong>
      </div>
      <div class="hero-privacy-card">
        <strong>密文同步</strong>
        <span>服务端不持有用户主密钥</span>
      </div>
    </div>
  </section>

  <section class="section compact-section">
    <div class="metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-item">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <span class="eyebrow">Core Capabilities</span>
      <h2>把健康管理做成一条闭环</h2>
      <p>不是简单记录，而是围绕真实指标持续生成计划、提醒执行、沉淀数据并支持后续调整。</p>
    </div>
    <div class="card-grid">
      <article v-for="card in valueCards" :key="card.title" class="feature-card">
        <span class="feature-mark">{{ card.label }}</span>
        <h3>{{ card.title }}</h3>
        <p>{{ card.desc }}</p>
      </article>
    </div>
  </section>

  <section class="section flow-section">
    <div class="section-heading">
      <span class="eyebrow">Workflow</span>
      <h2>五步完成一次健康节奏重启</h2>
    </div>
    <div class="journey">
      <div v-for="(item, index) in journey" :key="item" class="journey-item">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ item }}</strong>
      </div>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <span class="eyebrow">Privacy First</span>
      <h2>健康数据默认属于用户本人</h2>
      <p>
        平台设计采用本地优先和端到端加密同步。开启云同步时，敏感字段会在客户端加密，服务端仅负责保存和同步密文。
      </p>
      <RouterLink to="/privacy" class="text-link">查看隐私与加密说明</RouterLink>
    </div>
    <div class="security-list">
      <div>
        <strong>AES-256-GCM</strong>
        <span>健康档案、报告、打卡记录加密存储。</span>
      </div>
      <div>
        <strong>Keychain / Keystore</strong>
        <span>主密钥保存在用户设备安全区。</span>
      </div>
      <div>
        <strong>用户可删除</strong>
        <span>支持账号注销和云端数据删除流程。</span>
      </div>
    </div>
  </section>

  <section class="section cta-section">
    <div>
      <h2>从 Web 版开始体验基础流程</h2>
      <p>浏览器内即可完成指标输入、BMI 估算、计划预览和今日打卡演示。</p>
    </div>
    <div class="cta-actions">
      <RouterLink to="/app" class="btn btn-primary">立即体验</RouterLink>
      <RouterLink to="/download" class="btn btn-secondary">查看客户端下载</RouterLink>
    </div>
  </section>
</template>
