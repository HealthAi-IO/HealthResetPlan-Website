<script setup lang="ts">
import { RouterLink } from 'vue-router';

const platforms = [
  { name: 'Android', code: 'APK', desc: '适配 API 24 及以上，支持华为、小米、OPPO、vivo 等主流机型。', status: '内测准备中' },
  { name: 'iOS', code: 'iOS', desc: '适配 iOS 14 及以上，计划通过 TestFlight 开放测试。', status: '即将开放' },
  { name: 'Windows', code: 'WIN', desc: '面向桌面复盘与长期数据查看，支持 Windows 10/11。', status: '规划中' },
  { name: 'macOS', code: 'MAC', desc: '适配 Apple Silicon 与 Intel 设备，支持本地安全存储。', status: '规划中' },
  { name: 'Web', code: 'WEB', desc: '无需安装，浏览器即可体验基础指标录入和计划预览。', status: '可体验' },
  { name: '微信小程序', code: 'MP', desc: '适合轻量提醒、打卡和报告上传场景。', status: '规划中' }
];

const releaseSteps = [
  '完成 Android 真机内测包与签名流程',
  '完成隐私合规审查和应用市场资料',
  '开放小范围邀请测试并收集反馈'
];
</script>

<template>
  <section class="page-hero">
    <span class="eyebrow">Download</span>
    <h1>多端客户端下载</h1>
    <p>当前官网提供 Web 版基础体验入口，移动端和桌面端安装包会随内测节奏逐步开放。</p>
    <div class="hero-actions">
      <RouterLink to="/app" class="btn btn-primary">打开 Web 版</RouterLink>
      <a class="btn btn-secondary" href="mailto:hello@jkcqplan.com?subject=申请健康重启计划内测">申请内测</a>
    </div>
  </section>

  <section class="section">
    <div class="download-grid">
      <article v-for="platform in platforms" :key="platform.name" class="download-card">
        <div class="platform-code">{{ platform.code }}</div>
        <div>
          <h2>{{ platform.name }}</h2>
          <p>{{ platform.desc }}</p>
        </div>
        <span class="status-pill" :class="{ available: platform.status === '可体验' }">
          {{ platform.status }}
        </span>
      </article>
    </div>
  </section>

  <section class="section split-section">
    <div>
      <span class="eyebrow">Release Plan</span>
      <h2>发布节奏</h2>
      <p>正式下载链接上线前，官网会优先承载产品说明、隐私合规说明和 Web 版基础体验。</p>
    </div>
    <ol class="timeline-list">
      <li v-for="step in releaseSteps" :key="step">{{ step }}</li>
    </ol>
  </section>
</template>
