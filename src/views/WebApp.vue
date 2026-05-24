<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const profile = ref({
  age: 42,
  height: 172,
  weight: 82,
  systolic: 138,
  diastolic: 88,
  ldl: 3.6,
  goalIndex: 0,
});

const taskDone = ref([true, false, false, false]);
const taskTimes = ['07:30', '10:30', '19:00', '21:30'];

const goalOpts = computed(() => tm('webapp.goalOpts') as string[]);
const planDays = computed(() => tm('webapp.planDays') as { day: string; meal: string; exercise: string; note: string }[]);
const tasks = computed(() => tm('webapp.tasks') as { title: string; type: string }[]);

const bmi = computed(() => {
  const m = profile.value.height / 100;
  if (!m || !profile.value.weight) return 0;
  return Number((profile.value.weight / (m * m)).toFixed(1));
});

const bmiKey = computed(() => {
  if (bmi.value >= 28) return 'bmiObese';
  if (bmi.value >= 24) return 'bmiOverweight';
  if (bmi.value >= 18.5) return 'bmiNormal';
  return 'bmiLow';
});

const bmiLevel = computed(() => t(`webapp.${bmiKey.value}`));

const pressureHigh = computed(
  () => profile.value.systolic >= 140 || profile.value.diastolic >= 90
);
const pressureBorder = computed(
  () => !pressureHigh.value && (profile.value.systolic >= 130 || profile.value.diastolic >= 85)
);

const pressureLevel = computed(() => {
  if (pressureHigh.value) return t('webapp.bpHigh');
  if (pressureBorder.value) return t('webapp.bpBorder');
  return t('webapp.bpStable');
});

const completionRate = computed(() => {
  const done = taskDone.value.filter(Boolean).length;
  return Math.round((done / taskDone.value.length) * 100);
});

const suggestions = computed(() => {
  const result = [t('webapp.sug1'), t('webapp.sug2')];
  if (pressureHigh.value || pressureBorder.value) result.push(t('webapp.sug3'));
  if (bmi.value >= 24) result.push(t('webapp.sug4'));
  return result;
});

const currentGoalLabel = computed(() => goalOpts.value[profile.value.goalIndex] ?? '');

function toggleTask(index: number) {
  taskDone.value[index] = !taskDone.value[index];
}
</script>

<template>
  <section class="webapp-shell">
    <div class="webapp-header">
      <div>
        <span class="eyebrow">Web App Demo</span>
        <h1>{{ t('webapp.title') }}</h1>
        <p class="webapp-lead">
          <span>{{ t('webapp.lead1') }}</span>
          <span>{{ t('webapp.lead2') }}</span>
        </p>
      </div>
      <div class="completion-card">
        <span>{{ t('webapp.completionRate') }}</span>
        <strong>{{ completionRate }}%</strong>
      </div>
    </div>

    <div class="webapp-grid">
      <form class="input-panel" @submit.prevent>
        <h2>{{ t('webapp.formTitle') }}</h2>
        <label>
          {{ t('webapp.age') }}
          <input v-model.number="profile.age" type="number" min="1" max="120" />
        </label>
        <label>
          {{ t('webapp.height') }}
          <input v-model.number="profile.height" type="number" min="80" max="230" />
        </label>
        <label>
          {{ t('webapp.weight') }}
          <input v-model.number="profile.weight" type="number" min="20" max="250" step="0.1" />
        </label>
        <label>
          {{ t('webapp.systolic') }}
          <input v-model.number="profile.systolic" type="number" min="70" max="240" />
        </label>
        <label>
          {{ t('webapp.diastolic') }}
          <input v-model.number="profile.diastolic" type="number" min="40" max="160" />
        </label>
        <label>
          LDL mmol/L
          <input v-model.number="profile.ldl" type="number" min="0" max="12" step="0.1" />
        </label>
        <label class="full-field">
          {{ t('webapp.currentGoal') }}
          <select v-model="profile.goalIndex">
            <option v-for="(opt, i) in goalOpts" :key="i" :value="i">{{ opt }}</option>
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
            <span>{{ t('webapp.bpLabel') }}</span>
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
          <h2>{{ t('webapp.goalTitle', { goal: currentGoalLabel }) }}</h2>
          <ul class="check-list">
            <li v-for="item in suggestions" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="webapp-grid lower">
      <section class="plan-panel">
        <div class="panel-title">
          <h2>{{ t('webapp.planTitle') }}</h2>
          <span>{{ t('webapp.planSubtitle') }}</span>
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
          <h2>{{ t('webapp.todoTitle') }}</h2>
          <span>{{ t('webapp.todoSubtitle') }}</span>
        </div>
        <button
          v-for="(task, index) in tasks"
          :key="task.title"
          class="task-button"
          :class="{ done: taskDone[index] }"
          type="button"
          @click="toggleTask(index)"
        >
          <span class="task-time">{{ taskTimes[index] }}</span>
          <span>
            <strong>{{ task.title }}</strong>
            <small>{{ task.type }}</small>
          </span>
          <span class="task-state">{{ taskDone[index] ? t('webapp.done') : t('webapp.pending') }}</span>
        </button>
      </section>
    </div>

    <p class="medical-note">
      {{ t('webapp.medicalNote') }}
    </p>
  </section>
</template>
