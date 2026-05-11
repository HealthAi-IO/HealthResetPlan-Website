<script setup lang="ts">
const sections = [
  {
    title: '健康档案与体检报告',
    points: [
      '一键录入身高、体重、年龄、性别、既往病史、用药',
      '上传体检报告图片，自动 OCR + 大模型抽取血压、血脂、血糖',
      '健康数据全部本地 SQLite 存储，可选端到端加密同步'
    ]
  },
  {
    title: 'AI 个性化计划',
    points: [
      '7 天饮食计划：低盐 / 低脂 / 低糖 / 优质蛋白 / 高纤维',
      '7 天运动计划：循序渐进，照顾三高人群安全',
      '用药 / 称重 / 饮水 / 睡眠提醒一站式安排'
    ]
  },
  {
    title: '智能提醒与打卡',
    points: [
      '饮食提醒：饭前 2 小时',
      '运动提醒：运动前 1 小时',
      '用药提醒：按用户自定义时间',
      '称重提醒：每日晨起空腹',
      '打卡溯源：拍照、备注、地理位置'
    ]
  },
  {
    title: '可穿戴设备',
    points: [
      '蓝牙：体脂秤 / 血压计 / 心率手环',
      '厂商 SDK：小米 / 华为 / 苹果 / Google',
      '数据归一化、异常校验、来源标记'
    ]
  }
];
</script>

<template>
  <section class="container">
    <h1>功能介绍</h1>
    <div v-for="s in sections" :key="s.title" class="block">
      <h2>{{ s.title }}</h2>
      <ul>
        <li v-for="p in s.points" :key="p">{{ p }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section { padding: 64px 32px; max-width: 960px; }
h1 { font-size: 36px; }
.block { margin-top: 40px; }
.block h2 { font-size: 22px; color: var(--hrp-green); }
ul { line-height: 2; }
</style>
