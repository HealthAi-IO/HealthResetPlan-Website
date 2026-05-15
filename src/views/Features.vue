<script setup lang="ts">
const featureGroups = [
  {
    code: '01',
    title: '健康档案与报告识别',
    summary: '从基础信息、病史、用药到体检报告指标，建立可持续更新的个人健康底座。',
    points: [
      '支持身高、体重、年龄、性别、既往病史和用药信息录入',
      '体检报告图片 OCR 识别，自动提取血压、血脂、血糖等关键指标',
      '所有识别结果均支持人工校对，避免因报告质量造成误填'
    ]
  },
  {
    code: '02',
    title: 'AI 个性化计划',
    summary: '围绕三高与肥胖人群的安全边界，生成更适合长期执行的饮食和运动建议。',
    points: [
      '7 天饮食计划覆盖三餐、加餐、热量、低盐低脂低糖原则',
      '7 天运动计划强调循序渐进，避免不适合三高人群的高风险强度',
      '支持按口味、时间安排和实际执行情况进行手动微调'
    ]
  },
  {
    code: '03',
    title: '提醒与打卡',
    summary: '把计划拆成可执行的日常动作，并把执行过程沉淀为可复盘的数据。',
    points: [
      '饮食、运动、用药、称重四类提醒覆盖完整日常场景',
      '饮食和运动可记录照片、备注与完成状态',
      '按日、周、月查看完成率和连续执行情况'
    ]
  },
  {
    code: '04',
    title: '设备联动与趋势',
    summary: '通过体脂秤、血压计和可穿戴设备减少手动录入，提升数据连续性。',
    points: [
      '支持蓝牙体脂秤、血压计、心率手环等设备接入方案',
      '数据来源标记、异常值校验和手动录入兜底并行',
      '体重、体脂、血压、血脂趋势用于后续计划迭代'
    ]
  },
  {
    code: '05',
    title: '端到端加密',
    summary: '健康数据在客户端加密后再同步，服务端无法读取敏感明文。',
    points: [
      '采用 AES-256-GCM 加密敏感字段',
      '主密钥保存在 Keychain、Keystore 或系统凭据管理器',
      '支持助记词或 keystore 文件备份，降低换机恢复风险'
    ]
  }
];

const scenarios = [
  {
    title: '高血压管理',
    desc: '控制盐分摄入、提醒用药和规律低强度运动，持续观察血压趋势。'
  },
  {
    title: '高血脂管理',
    desc: '聚焦低脂高纤维饮食、运动计划和血脂四项复盘。'
  },
  {
    title: '体重与体脂管理',
    desc: '结合热量缺口、称重提醒、体脂秤同步和执行率统计。'
  }
];
</script>

<template>
  <section class="page-hero">
    <span class="eyebrow">Features</span>
    <h1>从指标到行动的完整功能体系</h1>
    <p>
      官网展示的功能体系与产品需求文档保持一致：健康档案、报告识别、AI 计划、提醒打卡、设备联动和加密同步。
    </p>
  </section>

  <section class="section feature-detail-list">
    <article v-for="group in featureGroups" :key="group.title" class="detail-card">
      <div class="detail-code">{{ group.code }}</div>
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
      <span class="eyebrow">User Scenarios</span>
      <h2>围绕三类核心场景设计</h2>
    </div>
    <div class="card-grid three">
      <article v-for="scenario in scenarios" :key="scenario.title" class="feature-card">
        <span class="feature-mark">场景</span>
        <h3>{{ scenario.title }}</h3>
        <p>{{ scenario.desc }}</p>
      </article>
    </div>
  </section>
</template>
