(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('bg');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // World-space half-extents at z=0
  let halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  let halfW = halfH * camera.aspect;

  // Raw + smoothed mouse in world space
  const mouse = { wx: 0, wy: 0, swx: 0, swy: 0 };

  window.addEventListener('mousemove', e => {
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = -((e.clientY / innerHeight) * 2 - 1);
    mouse.wx = nx * halfW;
    mouse.wy = ny * halfH;
  });

  // ─── PARTICLES ───────────────────────────────────────────────
  const isMobile = innerWidth < 680;
  const COUNT = isMobile ? 1200 : 2800;
  const REPEL_R = 1.4;
  const REPEL_F = 0.1;
  const SPRING  = 0.032;
  const DAMPING = 0.86;

  const pos  = new Float32Array(COUNT * 3);
  const home = new Float32Array(COUNT * 3);
  const vel  = new Float32Array(COUNT * 3);
  const col  = new Float32Array(COUNT * 3);
  const sz   = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * halfW * 2.4;
    const y = (Math.random() - 0.5) * halfH * 2.4;
    const z = (Math.random() - 0.5) * 1.5;

    pos[i3] = home[i3] = x;
    pos[i3+1] = home[i3+1] = y;
    pos[i3+2] = home[i3+2] = z;

    const isRed = Math.random() < 0.10;
    if (isRed) {
      col[i3] = 0.88; col[i3+1] = 0.024; col[i3+2] = 0.0;
    } else {
      const b = 0.10 + Math.random() * 0.28;
      col[i3] = col[i3+1] = col[i3+2] = b;
    }

    sz[i] = 0.5 + Math.random() * 1.8;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));

  // Custom shader for round, soft particles
  const mat = new THREE.ShaderMaterial({
    uniforms: { opacity: { value: 0.9 } },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float opacity;
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = (1.0 - smoothstep(0.2, 0.5, d)) * opacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    vertexColors: true,
  });

  scene.add(new THREE.Points(geo, mat));

  // ─── CIRCUIT DECORATION ──────────────────────────────────────
  // Silhouette inspired by Monaco/Spa, sized to right side of screen
  function addCircuit(pts, opacity, scale = 1) {
    const curve = new THREE.CatmullRomCurve3(
      pts.map(([x, y]) => new THREE.Vector3(x * scale, y * scale, -0.8)),
      true
    );
    const points3D = curve.getPoints(300);
    const g = new THREE.BufferGeometry().setFromPoints(points3D);
    const m = new THREE.LineBasicMaterial({
      color: 0xe10600,
      transparent: true,
      opacity,
    });
    const line = new THREE.Line(g, m);
    scene.add(line);
    return line;
  }

  const circuitPts = [
    [1.5, -3.8], [2.5, -3.4], [3.2, -2.6], [3.4, -1.2],
    [3.1,  0.2], [2.2,  1.2], [1.0,  1.8], [-0.5, 2.1],
    [-1.8, 1.9], [-2.8, 2.5], [-3.6, 1.6], [-3.8, 0.3],
    [-3.4,-1.2], [-2.6,-2.0], [-1.6,-2.8], [-0.3,-3.4],
    [ 1.0,-3.8], [ 1.5,-3.8],
  ];

  const outerLine = addCircuit(circuitPts, 0.10, 1.0);
  const innerLine = addCircuit(circuitPts, 0.05, 0.82);

  // ─── SPEED LINES ─────────────────────────────────────────────
  // Subtle horizontal streaks that animate across the screen
  const speedLineGeo = new THREE.BufferGeometry();
  const slCount = 18;
  const slPos = new Float32Array(slCount * 6); // 2 vertices per line, 3 floats each

  for (let i = 0; i < slCount; i++) {
    const y = (Math.random() - 0.5) * halfH * 2;
    const x0 = -halfW * 1.5;
    const x1 = halfW * 1.5;
    const base = i * 6;
    slPos[base]   = x0; slPos[base+1] = y; slPos[base+2] = -0.5;
    slPos[base+3] = x1; slPos[base+4] = y; slPos[base+5] = -0.5;
  }

  speedLineGeo.setAttribute('position', new THREE.BufferAttribute(slPos, 3));
  const slMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.03,
  });
  const speedLines = new THREE.LineSegments(speedLineGeo, slMat);
  scene.add(speedLines);

  // ─── RESIZE ──────────────────────────────────────────────────
  function onResize() {
    const w = innerWidth, h = innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    halfW = halfH * camera.aspect;
  }
  window.addEventListener('resize', onResize);
  onResize();

  // ─── SCROLL PARALLAX ─────────────────────────────────────────
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // ─── ANIMATION LOOP ──────────────────────────────────────────
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse
    mouse.swx += (mouse.wx - mouse.swx) * 0.07;
    mouse.swy += (mouse.wy - mouse.swy) * 0.07;

    // Update particles
    const p = geo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const px = p[i3], py = p[i3+1];
      const hx = home[i3], hy = home[i3+1];

      // Spring toward home
      vel[i3]   += (hx - px) * SPRING;
      vel[i3+1] += (hy - py) * SPRING;

      // Mouse repulsion
      const dx = px - mouse.swx;
      const dy = py - mouse.swy;
      const dist2 = dx*dx + dy*dy;
      if (dist2 < REPEL_R * REPEL_R && dist2 > 0.0001) {
        const dist = Math.sqrt(dist2);
        const force = ((REPEL_R - dist) / REPEL_R) * REPEL_F;
        vel[i3]   += (dx / dist) * force;
        vel[i3+1] += (dy / dist) * force;
      }

      // Gentle organic drift
      vel[i3]   += Math.sin(t * 0.25 + i * 0.0073) * 0.00015;
      vel[i3+1] += Math.cos(t * 0.18 + i * 0.0091) * 0.00015;

      // Dampen and apply
      vel[i3]   *= DAMPING;
      vel[i3+1] *= DAMPING;
      p[i3]   += vel[i3];
      p[i3+1] += vel[i3+1];
    }
    geo.attributes.position.needsUpdate = true;

    // Slowly rotate circuit decoration
    const prog = scrollY * 0.0003;
    outerLine.rotation.z = t * 0.018 + prog;
    innerLine.rotation.z = t * 0.014 - prog * 0.5;

    // Shift speed lines based on time (left to right flow)
    const slP = speedLineGeo.attributes.position.array;
    for (let i = 0; i < slCount; i++) {
      // Shift x values
      const base = i * 6;
      slP[base]   += 0.018;
      slP[base+3] += 0.018;
      // Wrap when past right edge
      if (slP[base] > halfW * 1.5) {
        const span = slP[base+3] - slP[base];
        slP[base]   = -halfW * 1.5;
        slP[base+3] = slP[base] + span;
      }
    }
    speedLineGeo.attributes.position.needsUpdate = true;

    // Subtle camera parallax
    camera.position.x += (mouse.swx * 0.04 - camera.position.x) * 0.05;
    camera.position.y += (mouse.swy * 0.025 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
  }

  animate();
})();
