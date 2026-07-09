<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  src: string;
  label: string;
}>();

const containerEl = ref<HTMLElement | null>(null);
const loaded = ref(false);
let observer: IntersectionObserver | null = null;
let animation: { destroy: () => void; setSubframe: (value: boolean) => void } | null = null;

async function loadAnimation() {
  if (loaded.value || !containerEl.value) return;
  loaded.value = true;

  const [{ default: lottie }, response] = await Promise.all([
    import('lottie-web/build/player/lottie_light'),
    fetch(props.src, { cache: 'force-cache' }),
  ]);
  const animationData = await response.json();

  animation = lottie.loadAnimation({
    container: containerEl.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      progressiveLoad: true,
    },
  });
  animation.setSubframe(false);
}

onMounted(() => {
  if (!containerEl.value) return;

  observer = new IntersectionObserver(
    entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        loadAnimation();
        observer?.disconnect();
      }
    },
    { rootMargin: '120px 0px' }
  );
  observer.observe(containerEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  animation?.destroy();
});
</script>

<template>
  <div
    ref="containerEl"
    class="lottie-box"
    :class="{ loaded }"
    role="img"
    :aria-label="label"
  ></div>
</template>

<style lang="less" scoped>
.lottie-box {
  width: 100%;
  height: 100%;
  min-height: 80px;
  border-radius: 32px;
  background:
    radial-gradient(circle at 32% 28%, rgba(143, 211, 185, 0.22), transparent 34%),
    rgba(255, 249, 240, 0.72);
  opacity: 0.78;
  transition: opacity 0.45s ease;

  &.loaded {
    opacity: 1;
  }
}
</style>
