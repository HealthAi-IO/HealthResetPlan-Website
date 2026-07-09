<script setup lang="ts">
import { onErrorCaptured, onMounted, shallowRef, ref } from 'vue';
import type { Component } from 'vue';

defineProps<{
  fullScreen?: boolean;
  variant?: 'home' | 'features' | 'download' | 'privacy';
}>();

const hasSceneError = ref(false);
const ThreeHealthScene = shallowRef<Component | null>(null);

onMounted(async () => {
  try {
    ThreeHealthScene.value = (await import('@/components/ThreeHealthScene.vue')).default;
  } catch {
    hasSceneError.value = true;
  }
});

onErrorCaptured(() => {
  hasSceneError.value = true;
  return false;
});
</script>

<template>
  <div class="lazy-three-scene" :class="{ 'is-full-screen': fullScreen }">
    <div class="scene-fallback" :class="{ 'is-error': hasSceneError }">
      <div class="fallback-orb"></div>
      <div class="fallback-grid"></div>
      <div class="fallback-copy">
        <span>HealthResetPlan 3D Scene</span>
        <strong>{{ hasSceneError ? '3D 场景加载失败，请刷新重试' : '正在加载黑夜 3D 人体场景' }}</strong>
      </div>
    </div>
    <ThreeHealthScene
      v-if="ThreeHealthScene && !hasSceneError"
      :full-screen="fullScreen"
      :variant="variant"
    />
  </div>
</template>

<style lang="less" scoped>
.lazy-three-scene {
  position: relative;
  min-height: 420px;
  border-radius: 32px;
  overflow: hidden;
  background:
    radial-gradient(circle at 68% 38%, rgba(32, 198, 240, 0.18), transparent 28%),
    linear-gradient(180deg, #080a14 0%, #0a1020 100%);
}

.is-full-screen {
  position: fixed !important;
  inset: 0 !important;
  z-index: 0;
  width: 100vw !important;
  height: 100vh !important;
  min-width: 100vw;
  min-height: 100vh !important;
  pointer-events: none;
}

.scene-fallback {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 70% 38%, rgba(32, 198, 240, 0.2), transparent 30%),
    radial-gradient(circle at 22% 48%, rgba(156, 124, 255, 0.1), transparent 34%),
    linear-gradient(180deg, #080a14 0%, #0a1020 100%);
}

.is-full-screen .scene-fallback {
  width: 100vw;
  height: 100vh;
}

.fallback-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(32, 198, 240, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(32, 198, 240, 0.07) 1px, transparent 1px);
  background-size: 42px 42px;
}

.fallback-orb {
  position: absolute;
  right: 20%;
  top: 22%;
  width: min(360px, 34vw);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(32, 198, 240, 0.24);
  box-shadow: 0 0 90px rgba(32, 198, 240, 0.18), inset 0 0 40px rgba(32, 198, 240, 0.08);
  animation: fallback-breathe 3.6s ease-in-out infinite;
}

.fallback-copy {
  position: absolute;
  left: clamp(24px, 5vw, 80px);
  bottom: clamp(36px, 8vw, 110px);
  display: grid;
  gap: 8px;
  max-width: 360px;
  padding: 18px 20px;
  color: rgba(238, 248, 255, 0.82);
  border: 1px solid rgba(32, 198, 240, 0.22);
  border-radius: 8px;
  background: rgba(8, 10, 20, 0.56);
  backdrop-filter: blur(16px);
}

.fallback-copy span {
  color: #9fefff;
  font-size: 12px;
  font-weight: 800;
}

.fallback-copy strong {
  color: #eef8ff;
  font-size: 18px;
}

.is-error .fallback-copy {
  border-color: rgba(232, 154, 154, 0.42);
}

@keyframes fallback-breathe {
  50% {
    transform: scale(1.04);
    opacity: 0.76;
  }
}

</style>
