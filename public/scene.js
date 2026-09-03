// Full-width layered audio waveform for the Frontdesk hero.
import * as THREE from "three";
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from "postprocessing";

const STRANDS_PER_LAYER = 22;
const WAVE_LAYER_COUNT = 3;
const STRAND_COUNT = STRANDS_PER_LAYER * WAVE_LAYER_COUNT;
const SEGMENTS = 360;
const PARTICLE_COUNT = 1500;
const WORLD_HALF_WIDTH = 4.2;

const waveformVertexShader = `
  uniform float uTime;
  uniform float uPointerX;
  uniform float uPhase;
  uniform float uFreqA;
  uniform float uFreqB;
  uniform float uAmp;
  uniform float uHalfWidth;
  uniform float uStrandOffset;
  uniform float uDetailSeed;
  uniform float uDepth;
  uniform float uLayer;
  varying float vIntensity;
  varying float vPosition;

  float envelope(float x) {
    float t = x / uHalfWidth;
    float e = 0.12;
    e += 0.72 * exp(-pow((t + 0.68) / 0.14, 2.0));
    e += 1.05 * exp(-pow((t + 0.25) / 0.18, 2.0));
    e += 0.72 * exp(-pow((t - 0.14) / 0.17, 2.0));
    e += 1.12 * exp(-pow((t - 0.56) / 0.15, 2.0));
    return e;
  }

  void main() {
    float x = position.x;
    float env = envelope(x);
    float dPointer = x - uPointerX;
    env += 0.45 * exp(-pow(dPointer / 0.55, 2.0));

    float waveA = sin(x * uFreqA + uTime * 0.62 + uPhase) * 0.50
                + sin(x * uFreqB - uTime * 0.38 + uPhase * 1.35) * 0.30
                + sin(x * 0.72 + uTime * 0.18 - uPhase) * 0.20;
    float waveB = sin(x * (uFreqA * 0.72) - uTime * 0.44 - uPhase * 0.8) * 0.58
                + sin(x * (uFreqB * 1.22) + uTime * 0.52 + uPhase * 1.7) * 0.27
                + cos(x * 0.48 - uTime * 0.2 + uPhase) * 0.15;
    float waveC = cos(x * (uFreqA * 0.88) + uTime * 0.35 + uPhase * 1.2) * 0.46
                + sin(x * (uFreqB * 0.62) - uTime * 0.58 - uPhase) * 0.38
                + sin(x * 4.8 + uTime * 0.25 + uPhase * 2.0) * 0.16;
    float wave = mix(waveA, waveB, step(0.5, uLayer));
    wave = mix(wave, waveC, step(1.5, uLayer));
    float detail = sin(x * (7.0 + uDetailSeed * 3.0) + uTime * 1.4 + uDetailSeed * 6.0) * 0.14
                 + sin(x * (11.0 - uDetailSeed * 2.0) - uTime * 1.1) * 0.08;

    float layerDrift = sin(x * (0.34 + uLayer * 0.08) + uTime * 0.16 + uLayer * 2.1)
                     * (0.08 + uLayer * 0.025);
    float y = env * (wave + detail * env) * uAmp + uStrandOffset + layerDrift;
    vIntensity = clamp(env, 0.0, 1.4);
    vPosition = x / uHalfWidth * 0.5 + 0.5;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, uDepth, 1.0);
  }
`;

const waveformFragmentShader = `
  precision mediump float;
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  uniform vec3 uColorAccent;
  uniform float uOpacity;
  varying float vIntensity;
  varying float vPosition;

  void main() {
    float t = pow(clamp(vIntensity, 0.0, 1.0), 1.6);
    vec3 color = mix(uColorLow, uColorHigh, t);
    float cyanBand = smoothstep(0.08, 0.45, sin(vPosition * 15.0) * 0.5 + 0.5);
    color = mix(color, uColorAccent, cyanBand * (0.18 + 0.35 * t));
    gl_FragColor = vec4(color, (0.22 + 0.54 * t) * uOpacity);
  }
`;

const particleVertexShader = `
  uniform float uTime;
  uniform float uHalfWidth;
  attribute float aSeed;
  varying float vAlpha;

  float envelope(float x) {
    float t = x / uHalfWidth;
    return 0.12
      + 0.55 * exp(-pow((t + 0.68) / 0.18, 2.0))
      + 0.9 * exp(-pow((t + 0.25) / 0.22, 2.0))
      + 0.62 * exp(-pow((t - 0.14) / 0.2, 2.0))
      + 0.95 * exp(-pow((t - 0.56) / 0.18, 2.0));
  }

  void main() {
    float x = position.x;
    float env = envelope(x);
    float wave = sin(x * (1.75 + aSeed * 0.5) + uTime * 0.42 + aSeed * 8.0)
               + sin(x * 2.9 - uTime * 0.28 + aSeed * 5.0) * 0.45;
    float y = wave * env * 0.31 + position.y;
    vec4 mvPosition = modelViewMatrix * vec4(x, y, position.z, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (1.0 + aSeed * 1.8) * (6.0 / -mvPosition.z);
    vAlpha = (0.16 + env * 0.25) * (0.55 + aSeed * 0.45);
  }
`;

const particleFragmentShader = `
  precision mediump float;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = 1.0 - smoothstep(0.08, 0.5, d);
    vec3 color = mix(vec3(0.16, 0.76, 1.0), vec3(0.73, 0.18, 1.0), gl_PointCoord.x);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;

function buildStrandGeometry() {
  const positions = new Float32Array((SEGMENTS + 1) * 3);
  for (let i = 0; i <= SEGMENTS; i++) {
    positions[i * 3] = (i / SEGMENTS * 2 - 1) * WORLD_HALF_WIDTH;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

function detectWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function initHeroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  if (!detectWebgl()) {
    canvas.classList.add("ai-core-fallback");
    return;
  }

  const container = canvas.parentElement;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduced = reducedMotionQuery.matches;
  reducedMotionQuery.addEventListener("change", (event) => {
    reduced = event.matches;
  });

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 5;

  const sharedGeometry = buildStrandGeometry();
  const strandMaterials = [];

  for (let i = 0; i < STRAND_COUNT; i++) {
    const layer = Math.floor(i / STRANDS_PER_LAYER);
    const layerIndex = i % STRANDS_PER_LAYER;
    const spread = layerIndex / (STRANDS_PER_LAYER - 1);
    const centered = spread - 0.5;
    const layerColorLow = [
      new THREE.Color("#263de5"),
      new THREE.Color("#6921e8"),
      new THREE.Color("#1b74e8"),
    ][layer];
    const layerColorHigh = [
      new THREE.Color("#ae3cff"),
      new THREE.Color("#e331ff"),
      new THREE.Color("#8558ff"),
    ][layer];
    const layerColorAccent = [
      new THREE.Color("#45ddff"),
      new THREE.Color("#5e8bff"),
      new THREE.Color("#7af2ff"),
    ][layer];
    const material = new THREE.ShaderMaterial({
      vertexShader: waveformVertexShader,
      fragmentShader: waveformFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPointerX: { value: 0 },
        uPhase: { value: centered * (1.05 + layer * 0.38) + layer * 1.7 },
        uFreqA: { value: 1.78 + layer * 0.24 + centered * 0.42 },
        uFreqB: { value: 2.85 + layer * 0.31 - centered * 0.34 },
        uAmp: { value: 0.38 + layer * 0.035 + Math.sin(spread * Math.PI) * 0.07 },
        uHalfWidth: { value: WORLD_HALF_WIDTH },
        uStrandOffset: { value: centered * (0.16 + layer * 0.035) },
        uDetailSeed: { value: spread + layer * 0.37 },
        uDepth: { value: layer * -0.12 + Math.sin(spread * Math.PI) * 0.12 },
        uLayer: { value: layer },
        uOpacity: { value: layer === 0 ? 1 : 0.78 },
        uColorLow: { value: layerColorLow },
        uColorHigh: { value: layerColorHigh },
        uColorAccent: { value: layerColorAccent },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    strandMaterials.push(material);
    scene.add(new THREE.Line(sharedGeometry, material));
  }

  const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
  const particleSeeds = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlePositions[i * 3] = THREE.MathUtils.randFloatSpread(WORLD_HALF_WIDTH * 2);
    particlePositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(0.55);
    particlePositions[i * 3 + 2] = THREE.MathUtils.randFloat(-0.4, 0.25);
    particleSeeds[i] = Math.random();
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particleGeometry.setAttribute("aSeed", new THREE.BufferAttribute(particleSeeds, 1));
  const particleMaterial = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uHalfWidth: { value: WORLD_HALF_WIDTH },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  scene.add(new THREE.Points(particleGeometry, particleMaterial));

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, new BloomEffect({
    luminanceThreshold: 0.08,
    luminanceSmoothing: 0.75,
    intensity: 2.05,
    radius: 0.72,
    mipmapBlur: true,
  })));

  function resize() {
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
    const aspect = width / height;
    // The animated strand envelope can reach roughly +/-1.4 world units.
    // Keeping this extra vertical headroom prevents wide viewports from
    // clipping the tallest peaks while retaining the edge-to-edge width.
    const verticalFit = Math.max(WORLD_HALF_WIDTH / aspect, 1.7);
    camera.left = -WORLD_HALF_WIDTH;
    camera.right = WORLD_HALF_WIDTH;
    camera.top = verticalFit;
    camera.bottom = -verticalFit;
    camera.updateProjectionMatrix();
  }

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(resize).observe(container);
  }
  window.addEventListener("resize", resize);
  resize();

  let pointerTargetX = 0;
  window.addEventListener("pointermove", (event) => {
    const rect = container.getBoundingClientRect();
    pointerTargetX = (((event.clientX - rect.left) / rect.width) * 2 - 1) * WORLD_HALF_WIDTH;
  });

  let inView = true;
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { threshold: 0.05 }).observe(container);
  }

  const clock = new THREE.Clock();
  let pointerX = 0;
  renderer.setAnimationLoop(() => {
    if (!inView) return;
    const delta = clock.getDelta();
    if (!reduced) {
      pointerX = THREE.MathUtils.lerp(pointerX, pointerTargetX, 0.05);
      for (const material of strandMaterials) {
        material.uniforms.uTime.value += delta;
        material.uniforms.uPointerX.value = pointerX;
      }
      particleMaterial.uniforms.uTime.value += delta;
    }
    composer.render();
  });
}

initHeroScene();
