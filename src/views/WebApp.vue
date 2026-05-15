<script setup lang="ts">
import { computed, ref } from 'vue';

const profile = ref({
  age: 42,
  height: 172,
  weight: 82,
  systolic: 138,
  diastolic: 88,
  ldl: 3.6,
  goal: '减脂与血压管理'
});

const tasks = ref([
  { title: '早餐低盐高纤维', time: '07:30', type: '饮食', done: true },
  { title: '午餐前查看菜谱', time: '10:30', type: '提醒', done: false },
  { title: '晚间快走 30 分钟', time: '19:00', type: '运动', done: false },
  { title: '睡前用药确认', time: '21:30', type: '用药', done: false }
]);

const planDays = [
  {
    day: '周一',
    meal: '燕麦牛奶、清蒸鱼、杂粮饭',
    exercise: '快走 30 分钟',
    note: '晚餐控制盐分，避免宵夜'
  },
  {
    day: '周二',
    meal: '鸡蛋蔬菜卷、豆腐青菜、低脂酸奶',
    exercise: '拉伸 15 分钟 + 慢走 20 分钟',
    note: '关注晨起体重和血压'
  },
  {
    day: '周三',
    meal: '全麦面包、鸡胸沙拉、菌菇汤',
    exercise: '低强度骑行 25 分钟',
    note: '保持饮水，减少高油菜品'
  }
];

const bmi = computed(() => {
  const meters = profile.value.height / 100;
  if (!meters || !profile.value.weight) {
    return 0;
  }
  return Number((profile.value.weight / (meters * meters)).toFixed(1));
});

const bmiLevel = computed(() => {
  if (bmi.value >= 28) return '肥胖';
  if (bmi.value >= 24) return '超重';
  if (bmi.value >= 18.5) return '正常';
  return '偏低';
});

const pressureLevel = computed(() => {
  if (profile.value.systolic >= 140 || profile.value.diastolic >= 90) {
    return '偏高';
  }
  if (profile.value.systolic >= 130 || profile.value.diastolic >= 85) {
    return '临界';
  }
  return '平稳';
});

const completionRate = computed(() => {
  const completed = tasks.value.filter((task) => task.done).length;
  return Math.round((completed / tasks.value.length) * 100);
});

const suggestions = computed(() => {
  const result = [
    '优先保持低盐、低脂、高纤维饮食结构',
    '运动以中低强度有氧为主，按体感逐步增加时长'
  ];

  if (pressureLevel.value !== '平稳') {
    result.push('血压偏高时避免突然高强度训练，并按医嘱管理用药');
  }

  if (bmi.value >= 24) {
    result.push('建议记录每日晨起体重，按周观察趋势，不追求短期极端下降');
  }

  return result;
});

function toggleTask(index: number) {
  tasks.value[index].done = !tasks.value[index].done;
}
</script>

<template>
  <section class="webapp-shell">
    <div class="webapp-header">
      <div>
        <span class="eyebrow">Web App Demo</span>
        <h1>健康计划基础体验</h1>
        <p class="webapp-lead">
          <span>本页可完成指标输入与 BMI 估算。</span>
          <span>支持计划预览和今日打卡演示。</span>
        </p>
      </div>
      <div class="completion-card">
        <span>今日完成率</span>
        <strong>{{ completionRate }}%</strong>
      </div>
    </div>

    <div class="webapp-grid">
      <form class="input-panel" @submit.prevent>
        <h2>健康指标</h2>
        <label>
          年龄
          <input v-model.number="profile.age" type="number" min="1" max="120" />
        </label>
        <label>
          身高 cm
          <input v-model.number="profile.height" type="number" min="80" max="230" />
        </label>
        <label>
          体重 kg
          <input v-model.number="profile.weight" type="number" min="20" max="250" step="0.1" />
        </label>
        <label>
          收缩压
          <input v-model.number="profile.systolic" type="number" min="70" max="240" />
        </label>
        <label>
          舒张压
          <input v-model.number="profile.diastolic" type="number" min="40" max="160" />
        </label>
        <label>
          LDL mmol/L
          <input v-model.number="profile.ldl" type="number" min="0" max="12" step="0.1" />
        </label>
        <label class="full-field">
          当前目标
          <select v-model="profile.goal">
            <option>减脂与血压管理</option>
            <option>血脂管理</option>
            <option>规律运动养成</option>
            <option>用药提醒与复盘</option>
          </select>
        </label>
      </form>

      <div class="summary-panel">
        <div class="summary-grid">
          <div>
            <span>BMI</span>
            <strong>{{ bmi }}</strong>
            <small>{{ bmiLevel }}</small>
          </div>
          <div>
            <span>血压</span>
            <strong>{{ pressureLevel }}</strong>
            <small>{{ profile.systolic }}/{{ profile.diastolic }} mmHg</small>
          </div>
          <div>
            <span>LDL</span>
            <strong>{{ profile.ldl }}</strong>
            <small>mmol/L</small>
          </div>
        </div>

        <div class="recommend-card">
          <h2>{{ profile.goal }}建议</h2>
          <ul class="check-list">
            <li v-for="item in suggestions" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="webapp-grid lower">
      <section class="plan-panel">
        <div class="panel-title">
          <h2>三日计划预览</h2>
          <span>示例生成结果</span>
        </div>
        <div class="plan-list">
          <article v-for="day in planDays" :key="day.day">
            <strong>{{ day.day }}</strong>
            <p>{{ day.meal }}</p>
            <span>{{ day.exercise }}</span>
            <small>{{ day.note }}</small>
          </article>
        </div>
      </section>

      <section class="todo-panel">
        <div class="panel-title">
          <h2>今日提醒与打卡</h2>
          <span>点击切换完成状态</span>
        </div>
        <button
          v-for="(task, index) in tasks"
          :key="task.title"
          class="task-button"
          :class="{ done: task.done }"
          type="button"
          @click="toggleTask(index)"
        >
          <span class="task-time">{{ task.time }}</span>
          <span>
            <strong>{{ task.title }}</strong>
            <small>{{ task.type }}</small>
          </span>
          <span class="task-state">{{ task.done ? '已完成' : '待完成' }}</span>
        </button>
      </section>
    </div>

    <p class="medical-note">
      以上内容为官网基础演示，不构成医疗诊断或治疗建议。真实用药、运动强度和饮食限制请遵循医生意见。
    </p>
  </section>
</template>
