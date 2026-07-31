<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const props = defineProps<{
  fullScreen?: boolean;
  variant?: 'home' | 'features' | 'download' | 'privacy';
}>();

const sceneHost = ref<HTMLDivElement | null>(null);
const isLowPower = ref(false);

let renderer: THREE.WebGLRenderer | null = null;
let frameId = 0;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let rootGroup: THREE.Group;
let humanGroup: THREE.Group;
let particles: THREE.Points;
let grid: THREE.LineSegments;
let dataLines: THREE.LineSegments;
let lockGroup: THREE.Group;
let cubeGroup: THREE.Group;
let chartGroup: THREE.Group;
let deviceGroup: THREE.Group;
let keyGroup: THREE.Group;
let pointerX = 0;
let pointerY = 0;
let dragging = false;
let lastX = 0;
let zoom = 1;
let scrollDepth = 0;
let lastTouchDistance = 0;
let objLoader: OBJLoader | null = null;

function getLowPowerMode() {
  const cores = navigator.hardwareConcurrency || 4;
  const smallScreen = window.matchMedia('(max-width: 720px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return cores <= 4 || smallScreen || reducedMotion;
}

function makeLine(points: THREE.Vector3[], color = 0x20c6f0, opacity = 0.45) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Line(geometry, material);
}

function loadObjHumanModel(group: THREE.Group, fallback: THREE.Object3D) {
  objLoader ??= new OBJLoader();
  objLoader.load(
    `${import.meta.env.BASE_URL}FinalBaseMesh.obj`,
    (model) => {
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x20c6f0,
        transparent: true,
        opacity: 0.28,
        wireframe: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      let hasMesh = false;
      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        hasMesh = true;
        child.material = wireMaterial;
        child.visible = true;
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      if (!hasMesh || !Number.isFinite(size.y) || size.y <= 0) {
        fallback.visible = true;
        return;
      }
      const normalizedModel = new THREE.Group();

      model.position.set(-center.x, -center.y, -center.z);
      normalizedModel.scale.setScalar(3.25 / Math.max(size.y, 0.001));
      normalizedModel.position.y = 0.08;
      normalizedModel.add(model);

      fallback.visible = false;
      group.add(normalizedModel);
    },
    undefined,
    () => {
      fallback.visible = true;
    }
  );
}

function createHumanModel() {
  const group = new THREE.Group();
  const body = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({
    color: 0x87e8ff,
    transparent: true,
    opacity: 0.24,
    wireframe: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x20c6f0,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 24, 18), material);
  head.scale.set(0.82, 1.08, 0.72);
  head.position.y = 1.46;

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.18, 12, 4), material);
  neck.position.y = 1.18;

  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.25, 0.9, 24, 12), material);
  chest.scale.set(1.18, 1, 0.58);
  chest.position.y = 0.7;

  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 12), material);
  pelvis.scale.set(1.12, 0.58, 0.48);
  pelvis.position.y = 0.08;

  const leftUpperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.55, 5, 10), material);
  leftUpperArm.position.set(-0.48, 0.78, 0);
  leftUpperArm.rotation.z = -0.2;

  const leftForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.54, 5, 10), material);
  leftForearm.position.set(-0.62, 0.18, 0);
  leftForearm.rotation.z = -0.08;

  const rightUpperArm = leftUpperArm.clone();
  rightUpperArm.position.x = 0.48;
  rightUpperArm.rotation.z = 0.2;

  const rightForearm = leftForearm.clone();
  rightForearm.position.x = 0.62;
  rightForearm.rotation.z = 0.08;

  const leftUpperLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.68, 6, 12), material);
  leftUpperLeg.position.set(-0.16, -0.43, 0);

  const leftLowerLeg = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 0.72, 6, 12), material);
  leftLowerLeg.position.set(-0.16, -1.1, 0);

  const rightUpperLeg = leftUpperLeg.clone();
  rightUpperLeg.position.x = 0.16;

  const rightLowerLeg = leftLowerLeg.clone();
  rightLowerLeg.position.x = 0.16;

  const shoulders = makeLine([new THREE.Vector3(-0.42, 1.05, 0), new THREE.Vector3(0.42, 1.05, 0)], 0x9fefff, 0.5);
  const spine = makeLine([new THREE.Vector3(0, 1.1, 0), new THREE.Vector3(0, 0.08, 0)], 0x9fefff, 0.5);
  const ribs = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const y = 0.92 - i * 0.12;
    const width = 0.26 + i * 0.025;
    ribs.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-width, y, 0.02),
        new THREE.Vector3(0, y - 0.05, 0.04),
        new THREE.Vector3(width, y, 0.02),
      ]),
      lineMaterial
    ));
  }

  body.add(
    head,
    neck,
    chest,
    pelvis,
    leftUpperArm,
    leftForearm,
    rightUpperArm,
    rightForearm,
    leftUpperLeg,
    leftLowerLeg,
    rightUpperLeg,
    rightLowerLeg,
    shoulders,
    spine,
    ribs
  );
  group.add(body);
  loadObjHumanModel(group, body);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.78, 0.01, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0x9c7cff, transparent: true, opacity: 0.55 })
  );
  halo.position.y = 0.5;
  halo.rotation.x = Math.PI / 2.1;
  group.add(halo);

  const labels = [
    { text: 'BP 118/76', x: -1.55, y: 1.0 },
    { text: 'GLU 4.9', x: 1.35, y: 0.45 },
    { text: '52.4kg', x: -1.25, y: -0.75 },
    { text: 'HR 72', x: 1.2, y: 1.25 },
  ];

  labels.forEach((item) => {
    const line = makeLine([
      new THREE.Vector3(item.x > 0 ? 0.42 : -0.42, item.y * 0.55, 0),
      new THREE.Vector3(item.x * 0.72, item.y, 0),
    ]);
    group.add(line);
  });

  return group;
}

function createParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const spreadX = props.fullScreen ? 18 : 9;
  const spreadY = props.fullScreen ? 9 : 5.4;
  const spreadZ = props.fullScreen ? 8 : 5.2;
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * spreadX;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0x20c6f0,
    size: isLowPower.value ? 0.012 : 0.018,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Points(geometry, material);
}

function createGrid() {
  const points: THREE.Vector3[] = [];
  const size = props.fullScreen ? 18 : 8;
  const width = props.fullScreen ? 7.6 : 3;
  const depth = props.fullScreen ? 4.6 : 1.8;
  for (let i = -size; i <= size; i += 1) {
    points.push(new THREE.Vector3(i * 0.38, -1.75, -depth), new THREE.Vector3(i * 0.38, -1.75, depth));
    points.push(new THREE.Vector3(-width, -1.75, i * 0.25), new THREE.Vector3(width, -1.75, i * 0.25));
    if (props.fullScreen && i % 2 === 0) {
      points.push(new THREE.Vector3(width, -1.75, i * 0.25), new THREE.Vector3(width, 2.6, i * 0.25));
    }
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x1b8fab, transparent: true, opacity: 0.24 });
  return new THREE.LineSegments(geometry, material);
}

function createDataLines() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 24; i += 1) {
    const y = -1.2 + i * 0.1;
    points.push(new THREE.Vector3(-2.8, y, -0.9 + Math.sin(i) * 0.22));
    points.push(new THREE.Vector3(2.8, y + Math.sin(i * 0.7) * 0.2, 0.9 + Math.cos(i) * 0.18));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x20c6f0,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.LineSegments(geometry, material);
}

function createLock() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.42, 0.16),
    new THREE.MeshStandardMaterial({ color: 0x162943, metalness: 0.5, roughness: 0.28, emissive: 0x08263a })
  );
  const shackle = makeLine(
    [
      new THREE.Vector3(-0.16, 0.18, 0),
      new THREE.Vector3(-0.16, 0.46, 0),
      new THREE.Vector3(0.16, 0.46, 0),
      new THREE.Vector3(0.16, 0.18, 0),
    ],
    0x20c6f0,
    0.9
  );
  group.add(body, shackle);
  group.position.set(1.9, 0.85, -0.3);
  return group;
}

function createCube() {
  const group = new THREE.Group();
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.55, 0.55),
    new THREE.MeshPhysicalMaterial({
      color: 0x9c7cff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.2,
      metalness: 0.18,
      wireframe: true,
    })
  );
  group.add(cube);
  group.position.set(-1.85, 0.2, -0.2);
  return group;
}

function createChartGroup() {
  const group = new THREE.Group();
  const bars = [0.36, 0.68, 0.52, 0.88, 0.74];
  bars.forEach((height, index) => {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, height, 0.08),
      new THREE.MeshBasicMaterial({ color: 0x20c6f0, transparent: true, opacity: 0.45 })
    );
    bar.position.set(index * 0.18 - 0.36, height / 2 - 0.45, 0);
    group.add(bar);
  });
  group.add(makeLine([
    new THREE.Vector3(-0.5, -0.25, 0.04),
    new THREE.Vector3(-0.25, 0.05, 0.04),
    new THREE.Vector3(0.05, -0.02, 0.04),
    new THREE.Vector3(0.32, 0.32, 0.04),
    new THREE.Vector3(0.55, 0.18, 0.04),
  ], 0x9c7cff, 0.75));
  group.position.set(-2.2, 0.58, -0.3);
  return group;
}

function createDeviceGroup() {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: 0x20c6f0, transparent: true, opacity: 0.3, wireframe: true });
  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.82, 0.04), material);
  const desktop = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.58, 0.04), material);
  const web = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.48, 0.04), material);
  phone.position.set(-0.78, 0.28, 0);
  desktop.position.set(0.18, 0.44, -0.1);
  web.position.set(0.78, -0.16, 0.08);
  group.add(phone, desktop, web);
  group.position.set(1.35, 0.38, -0.2);
  return group;
}

function createKeyGroup() {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.035, 8, 42),
    new THREE.MeshBasicMaterial({ color: 0x9fefff, transparent: true, opacity: 0.62 })
  );
  const shaft = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.055, 0.055),
    new THREE.MeshBasicMaterial({ color: 0x9fefff, transparent: true, opacity: 0.56 })
  );
  shaft.position.x = 0.38;
  group.add(ring, shaft);
  group.position.set(1.74, 0.36, -0.1);
  return group;
}

function applyLayout() {
  const host = sceneHost.value;
  if (!host || !rootGroup) return;
  const mobile = host.clientWidth < 760;
  const variant = props.variant ?? 'home';

  humanGroup.visible = variant === 'home';
  lockGroup.visible = variant === 'home' || variant === 'privacy';
  cubeGroup.visible = variant === 'home' || variant === 'privacy';
  chartGroup.visible = variant === 'features';
  deviceGroup.visible = variant === 'download';
  keyGroup.visible = variant === 'privacy';

  if (props.fullScreen) {
    rootGroup.position.x = mobile ? 0 : variant === 'home' ? 1.75 : 0;
    rootGroup.position.y = mobile ? 0.55 : variant === 'home' ? -0.05 : 0.18;
    rootGroup.scale.setScalar(mobile ? 0.88 : variant === 'home' ? 1.18 : 1.36);
    camera.position.z = mobile ? 5.8 : 5.1;
  } else {
    rootGroup.position.set(0, 0, 0);
    rootGroup.scale.setScalar(1);
    camera.position.z = 5.2;
  }
}

function initScene() {
  const host = sceneHost.value;
  if (!host) return;

  isLowPower.value = getLowPowerMode();
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080a14, 0.08);

  camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(0, 0.18, 5.2);

  renderer = new THREE.WebGLRenderer({ antialias: !isLowPower.value, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower.value ? 1.25 : 1.8));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x8be8ff, 1.1);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(2, 3, 5);
  const accent = new THREE.PointLight(0x9c7cff, 3, 8);
  accent.position.set(-2.8, 1.4, 2);
  scene.add(ambient, key, accent);

  rootGroup = new THREE.Group();
  humanGroup = createHumanModel();
  particles = createParticles(isLowPower.value ? 620 : 1600);
  grid = createGrid();
  dataLines = createDataLines();
  lockGroup = createLock();
  cubeGroup = createCube();
  chartGroup = createChartGroup();
  deviceGroup = createDeviceGroup();
  keyGroup = createKeyGroup();

  rootGroup.add(humanGroup, grid, dataLines, lockGroup, cubeGroup, chartGroup, deviceGroup, keyGroup);
  scene.add(rootGroup, particles);
  applyLayout();
}

function animate(time: number) {
  if (!renderer) return;
  const t = time * 0.001;
  rootGroup.rotation.y += ((pointerX * 0.26) - rootGroup.rotation.y) * 0.035;
  rootGroup.rotation.x += ((-pointerY * 0.12) - rootGroup.rotation.x) * 0.035;
  rootGroup.position.z = Math.sin(t * 0.45) * 0.08 + scrollDepth;
  humanGroup.rotation.y += dragging ? 0 : 0.0035;
  humanGroup.scale.setScalar(zoom);
  particles.rotation.y = t * 0.03;
  particles.position.y = Math.sin(t * 0.8) * 0.05;
  grid.position.z = Math.sin(t * 0.55) * 0.18;
  dataLines.rotation.y = Math.sin(t * 0.6) * 0.08;
  lockGroup.rotation.y = t * 0.75;
  lockGroup.position.y = 0.85 + Math.sin(t * 1.4) * 0.06;
  cubeGroup.rotation.set(t * 0.52, t * 0.38, 0);
  cubeGroup.position.y = 0.2 + Math.cos(t * 1.2) * 0.08;
  chartGroup.rotation.y = Math.sin(t * 0.7) * 0.16;
  deviceGroup.rotation.y = Math.sin(t * 0.5) * 0.18;
  keyGroup.rotation.z = Math.sin(t) * 0.2;
  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
}

function resize() {
  const host = sceneHost.value;
  if (!host || !renderer) return;
  camera.aspect = host.clientWidth / host.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(host.clientWidth, host.clientHeight);
  applyLayout();
}

function setPointer(e: PointerEvent) {
  const host = sceneHost.value;
  if (!host) return;
  const rect = props.fullScreen
    ? { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }
    : host.getBoundingClientRect();
  pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  if (dragging) {
    humanGroup.rotation.y += (e.clientX - lastX) * 0.012;
    lastX = e.clientX;
  }
}

function onWheel(e: WheelEvent) {
  if (props.fullScreen && (window.scrollY > window.innerHeight || e.clientX < window.innerWidth * 0.48)) return;
  zoom = THREE.MathUtils.clamp(zoom + (e.deltaY > 0 ? -0.04 : 0.04), 0.82, 1.25);
}

function startDrag(e: PointerEvent) {
  if (props.fullScreen && (window.scrollY > window.innerHeight || e.clientX < window.innerWidth * 0.48)) return;
  dragging = true;
  lastX = e.clientX;
}

function endDrag() {
  dragging = false;
}

function updateScrollDepth() {
  scrollDepth = props.fullScreen ? Math.min(window.scrollY / window.innerHeight, 2) * -0.22 : 0;
}

function getTouchDistance(e: TouchEvent) {
  const a = e.touches[0];
  const b = e.touches[1];
  if (!a || !b) return 0;
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function onTouchStart(e: TouchEvent) {
  lastTouchDistance = e.touches.length === 2 ? getTouchDistance(e) : 0;
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length !== 2) return;
  const distance = getTouchDistance(e);
  if (lastTouchDistance > 0) {
    zoom = THREE.MathUtils.clamp(zoom + (distance - lastTouchDistance) * 0.002, 0.82, 1.25);
  }
  lastTouchDistance = distance;
}

onMounted(() => {
  initScene();
  frameId = requestAnimationFrame(animate);
  window.addEventListener('resize', resize);
  if (props.fullScreen) {
    window.addEventListener('pointermove', setPointer);
    window.addEventListener('pointerdown', startDrag);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('scroll', updateScrollDepth, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
  }
});

watch(() => props.variant, () => {
  applyLayout();
});

onUnmounted(() => {
  cancelAnimationFrame(frameId);
  window.removeEventListener('resize', resize);
  window.removeEventListener('pointermove', setPointer);
  window.removeEventListener('pointerdown', startDrag);
  window.removeEventListener('pointerup', endDrag);
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('scroll', updateScrollDepth);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchmove', onTouchMove);
  renderer?.dispose();
  renderer?.domElement.remove();
  renderer = null;
});
</script>

<template>
  <div
    ref="sceneHost"
    class="three-health-scene"
    :class="{ 'is-low-power': isLowPower, 'is-full-screen': fullScreen }"
    aria-label="Interactive 3D health data scene"
    @pointermove="setPointer"
    @pointerdown="startDrag"
    @pointerup="endDrag"
    @pointerleave="endDrag"
    @wheel="onWheel"
  >
    <div v-if="variant === 'home'" class="metric-panel panel-left">
      <span>Blood Pressure</span>
      <strong>118/76</strong>
      <small>mmHg</small>
    </div>
    <div v-if="variant === 'home'" class="metric-panel panel-right">
      <span>AES-256-GCM</span>
      <strong>Online data</strong>
      <small>server stores ciphertext only</small>
    </div>
  </div>
</template>

<style lang="less" scoped>
.three-health-scene {
  position: relative;
  min-height: clamp(430px, 56vw, 640px);
  border: 1px solid rgba(32, 198, 240, 0.28);
  border-radius: 8px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 44%, rgba(32, 198, 240, 0.18), transparent 34%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(156, 124, 255, 0.05));
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.36), inset 0 0 50px rgba(32, 198, 240, 0.08);
  touch-action: none;

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.is-full-screen {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  border: 0;
  border-radius: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 68% 38%, rgba(32, 198, 240, 0.2), transparent 28%),
    radial-gradient(circle at 20% 46%, rgba(156, 124, 255, 0.08), transparent 34%),
    linear-gradient(180deg, rgba(8, 10, 20, 0.24), rgba(8, 10, 20, 0.7));
  box-shadow: none;
}

.scene-badge,
.metric-panel,
.orbit-label {
  position: absolute;
  z-index: 2;
  border: 1px solid rgba(32, 198, 240, 0.25);
  background: rgba(8, 10, 20, 0.52);
  backdrop-filter: blur(18px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.13), 0 18px 44px rgba(0, 0, 0, 0.22);
}

.scene-badge {
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  color: #9fefff;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 750;
}

.metric-panel {
  display: grid;
  gap: 3px;
  width: min(190px, 38%);
  padding: 14px;
  border-radius: 8px;
  color: rgba(238, 248, 255, 0.78);

  strong {
    color: #ffffff;
    font-size: clamp(20px, 2.4vw, 30px);
    line-height: 1;
  }

  small {
    color: rgba(159, 239, 255, 0.68);
  }
}

.panel-left {
  left: 18px;
  bottom: 22px;
}

.panel-right {
  right: 18px;
  top: 74px;
}

.orbit-label {
  right: 18px;
  bottom: 24px;
  padding: 9px 12px;
  color: rgba(238, 248, 255, 0.78);
  border-radius: 999px;
  font-size: 12px;
}

.is-low-power {
  min-height: clamp(360px, 72vw, 500px);
}

@media (max-width: 640px) {
  .three-health-scene {
    min-height: 410px;
  }

  .metric-panel {
    width: calc(50% - 26px);
    padding: 12px;
  }

  .panel-right {
    top: auto;
    bottom: 22px;
  }

  .orbit-label {
    display: none;
  }

  .is-full-screen {
    height: 100vh;
    min-height: 100vh;
  }
}
</style>
