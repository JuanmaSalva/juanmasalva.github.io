(function () {
  'use strict';

  // ─── CSV PARSER ──────────────────────────────────────────────
  // Reads from globals defined by data/data.js (shared with Game Dev theme)
  function parseCSV(text) {
    const lines = (text || '').replace(/\r/g, '').trim().split('\n');
    if (lines.length < 2) return [];
    const headers = parseLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const vals = parseLine(lines[i]);
      const obj = {};
      headers.forEach((h, j) => { obj[h.trim()] = (vals[j] ?? '').trim(); });
      rows.push(obj);
    }
    return rows;
  }

  function parseLine(line) {
    const result = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
        else inQ = !inQ;
      } else if (c === ',' && !inQ) {
        result.push(cur); cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  }

  // ─── FALLBACK DATA ───────────────────────────────────────────
  // Used when CSVs can't be fetched (e.g. opened as file://)
  const FALLBACK = {
    profile: {
      name: 'Juan Manuel Salvá',
      title: 'Software Developer',
      location: 'Palma de Mallorca — open to relocation',
      email: 'juanma.salva.work@gmail.com',
      linkedin: 'https://www.linkedin.com/in/juan-manuel-salva/',
      github: 'https://github.com/JuanmaSalva',
      bio: 'Game developer with 5+ years of experience building high-performance real-time systems, now targeting motorsport software engineering. Passionate about Formula 1, I have built telemetry libraries, data visualization pipelines, and custom game engines from scratch — applying the same performance-first mindset that defines F1 engineering.',
    },
    projects: [
      {
        id: 'f1-telemetry',
        name: 'F1 Telemetry',
        category: 'Motorsport Software',
        short_desc: 'System and library for processing real-time F1 telemetry data.',
        tech: 'C++|Unity|C#|UDP Networking|Custom Graphs',
        github: 'https://github.com/JuanmaSalva/F12020TelemetryLibrary',
        demo: '',
        featured: 'true',
        year: '2020',
      },
      {
        id: 'f1-data',
        name: 'F1 Data',
        category: 'Motorsport Software',
        short_desc: 'Visualisation and analysis tool for Formula 1 data.',
        tech: 'Python|FastF1|Matplotlib|Manim|Data Pipelines',
        github: 'https://github.com/JuanmaSalva',
        demo: '',
        featured: 'true',
        year: '2023',
      },
      {
        id: 'quack-engine',
        name: 'Quack Engine',
        category: 'Engine Development',
        short_desc: 'Custom game engine built from scratch: own renderer, physics and ECS.',
        tech: 'C++|OpenGL|GLSL|CMake|ECS',
        github: 'https://github.com/JuanmaSalva',
        demo: '',
        featured: 'true',
        year: '2023',
      },
      {
        id: 'histera',
        name: 'Histera',
        category: 'Game Development',
        short_desc: 'Action video game developed as a team project.',
        tech: 'Unreal Engine|C++|Blueprint|Networking',
        github: '',
        demo: '',
        featured: 'false',
        year: '2023',
      },
      {
        id: 'robopacman',
        name: 'RoboPacMan',
        category: 'Game Development',
        short_desc: 'A reimagining of the classic PacMan arcade game with a robotic theme.',
        tech: 'C++|SDL2|Pathfinding|AI',
        github: '',
        demo: '',
        featured: 'false',
        year: '2023',
      },
      {
        id: 'tanks',
        name: 'Tanks Showdown',
        category: 'Game Development',
        short_desc: 'Tank combat game with realistic physics and real-time tactical action.',
        tech: 'Unity|C#|Networking|Procedural Generation',
        github: '',
        demo: '',
        featured: 'false',
        year: '2021',
      },
    ],
    skills: [
      { name: 'C++',                  level: '90', category: 'Programming' },
      { name: 'C#',                   level: '85', category: 'Programming' },
      { name: 'Python',               level: '80', category: 'Programming' },
      { name: 'Unity',                level: '90', category: 'Engines & Frameworks' },
      { name: 'Unreal Engine',        level: '70', category: 'Engines & Frameworks' },
      { name: 'OpenGL',               level: '72', category: 'Engines & Frameworks' },
      { name: 'Data Visualization',   level: '85', category: 'Data & Systems' },
      { name: 'Telemetry Systems',    level: '80', category: 'Data & Systems' },
      { name: 'UDP Networking',       level: '75', category: 'Data & Systems' },
      { name: 'Real-time Systems',    level: '82', category: 'Data & Systems' },
      { name: 'Git',                  level: '85', category: 'Tools' },
      { name: 'Performance Profiling',level: '78', category: 'Tools' },
    ],
    experience: [
      {
        company: 'Independent',
        role: 'Game Developer & Tools Engineer',
        period: '2020 — Present',
        desc: 'Built and shipped multiple games and developer tools independently. Developed open-source F1 telemetry systems, a custom game engine, and automated data visualization pipelines. All projects published on GitHub.',
        type: 'Work',
      },
      {
        company: 'CITM — UPC',
        role: 'BSc Game Design & Development',
        period: '2019 — 2023',
        desc: "Bachelor's degree focused on real-time systems, graphics programming, game architecture, and software engineering. Built a custom engine, networked multiplayer games, and bespoke tooling throughout the programme.",
        type: 'Education',
      },
    ],
  };

  // ─── RENDER: PROFILE ─────────────────────────────────────────
  function renderProfile(p) {
    const bioEl = document.getElementById('bio-text');
    const locEl = document.getElementById('bio-location');
    const nameEl = document.getElementById('footer-name');
    if (bioEl) bioEl.textContent = p.bio;
    if (locEl) locEl.textContent = p.location;
    if (nameEl) nameEl.textContent = p.name;

    const linksEl = document.getElementById('contact-links');
    if (linksEl) {
      linksEl.innerHTML = `
        <a href="mailto:${p.email}" class="contact-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
          Email
        </a>
        <a href="${p.linkedin}" class="contact-link" target="_blank" rel="noopener">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <a href="${p.github}" class="contact-link" target="_blank" rel="noopener">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      `;
    }
  }

  // ─── RENDER: PROJECTS ────────────────────────────────────────
  function renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    projects.forEach((p, idx) => {
      const techs = (p.tech || '').split('|').filter(Boolean);
      const techHTML = techs.map(t => `<span class="tech-tag">${t.trim()}</span>`).join('');
      const links = [];
      if (p.github) links.push(`<a href="${p.github}" class="project-link" target="_blank" rel="noopener">GitHub</a>`);
      if (p.demo)   links.push(`<a href="${p.demo}"   class="project-link" target="_blank" rel="noopener">Demo</a>`);

      const card = document.createElement('div');
      card.className = 'project-card reveal' + (p.featured === 'true' ? ' featured' : '');
      card.dataset.cat = p.category;
      card.style.transitionDelay = (idx * 0.06) + 's';
      card.innerHTML = `
        <div class="project-meta">
          <span class="project-cat">${p.category}</span>
          <span class="project-year">${p.year}</span>
        </div>
        <div class="project-title">${p.name}</div>
        <div class="project-desc">${p.short_desc}</div>
        <div class="project-tech">${techHTML}</div>
        ${links.length ? `<div class="project-links">${links.join('')}</div>` : ''}
      `;
      grid.appendChild(card);
    });

    initTilt();
    initReveal();
  }

  // ─── RENDER: SKILLS ──────────────────────────────────────────
  function renderSkills(skills) {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    const cats = {};
    skills.forEach(s => {
      if (!cats[s.category]) cats[s.category] = [];
      cats[s.category].push(s);
    });

    grid.innerHTML = '';
    Object.entries(cats).forEach(([cat, items]) => {
      const col = document.createElement('div');
      col.className = 'skills-category reveal';
      col.innerHTML = `<div class="skills-cat-title">${cat}</div>` +
        items.map(s => `
          <div class="skill-row">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-bar-wrap">
              <div class="skill-bar-fill" data-level="${s.level}"></div>
            </div>
          </div>
        `).join('');
      grid.appendChild(col);
    });

    initReveal();
  }

  // ─── RENDER: EXPERIENCE ──────────────────────────────────────
  function renderExperience(experience) {
    const tl = document.getElementById('timeline');
    if (!tl) return;
    tl.innerHTML = '';

    experience.forEach((e, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal';
      item.style.transitionDelay = (idx * 0.12) + 's';
      item.innerHTML = `
        <div class="timeline-type">${e.type}</div>
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-date">${e.period}</div>
        <div class="timeline-desc">${e.desc}</div>
      `;
      tl.appendChild(item);
    });

    initReveal();
  }

  // ─── SCROLL REVEAL + SKILL BAR TRIGGER ───────────────────────
  let observer = null;

  function initReveal() {
    if (observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 120);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ─── TILT EFFECT ─────────────────────────────────────────────
  function initTilt() {
    document.querySelectorAll('.project-card, .stat-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 14;
        card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ─── PROJECT FILTER ──────────────────────────────────────────
  function initFilter() {
    document.getElementById('filter-bar').addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.project-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  }

  // ─── TELEMETRY SIMULATION ────────────────────────────────────
  // Physics-based: speed drives gear selection, gear drives RPM.
  // Throttle/brake are coherent — you can't have both, and RPM
  // drops on upshift and rises on downshift exactly as in a real car.
  function animateTelemetry() {
    const els = {
      speed:    document.getElementById('hud-speed'),
      rpm:      document.getElementById('hud-rpm'),
      gear:     document.getElementById('hud-gear'),
      throttle: document.getElementById('hud-throttle'),
      brake:    document.getElementById('hud-brake'),
      drs:      document.getElementById('hud-drs'),
      speedBar: document.getElementById('hud-speed-bar'),
      rpmBar:   document.getElementById('hud-rpm-bar'),
    };
    if (!els.speed) return;

    // ── Gear ratios ──────────────────────────────────────────────
    // Max speed (km/h) in each gear at the RPM limiter (15 000 RPM).
    // Index 0 unused; gears 1-7.
    const GEAR_TOP   = [0, 82, 132, 178, 218, 260, 298, 345];
    // RPM = speed × ratio  →  ratio = RPM_LIMIT / top_speed
    const GEAR_RATIO = GEAR_TOP.map(s => s > 0 ? 15000 / s : 0);
    const RPM_LIMIT  = 15000;
    const RPM_IDLE   = 6800;
    const RPM_UP     = 13800;   // upshift threshold
    const RPM_DOWN   = 9200;    // downshift threshold

    // ── Lap profile ──────────────────────────────────────────────
    // Each segment: target speed (km/h) to reach, duration (ms).
    // The car applies throttle or brake to reach the target.
    const LAP = [
      { t: 338, d: 4500 },   // DRS straight
      { t: 72,  d: 2400 },   // T1 heavy brake
      { t: 100, d: 1600 },   // T2 apex
      { t: 245, d: 3000 },   // short straight
      { t: 88,  d: 2200 },   // hairpin brake
      { t: 82,  d: 1400 },   // hairpin apex
      { t: 185, d: 2600 },   // acceleration zone
      { t: 310, d: 4000 },   // long straight (DRS)
      { t: 135, d: 2200 },   // medium corner brake
      { t: 148, d: 1800 },   // medium corner exit
      { t: 278, d: 3200 },   // fast exit straight
      { t: 82,  d: 2100 },   // tight corner brake
      { t: 195, d: 2800 },   // sweeping exit
    ];

    // ── State ────────────────────────────────────────────────────
    let speed    = 280;
    let rpm      = 13000;
    let gear     = 7;
    let throttle = 1;
    let brake    = 0;
    let segIdx   = 0;
    let segMs    = 0;

    // Shift state — during a shift, RPM briefly dips (torque cut)
    let shifting   = false;
    let shiftMs    = 0;
    let nextGear   = 7;
    const SHIFT_DUR_UP   = 100; // ms
    const SHIFT_DUR_DOWN =  70; // ms

    const TICK = 50; // ms per frame

    setInterval(() => {
      const seg = LAP[segIdx];
      const err = seg.t - speed;

      // ── Pedal logic (mutually exclusive) ─────────────────────
      // F1 throttle is essentially binary on straights: flat to the floor.
      // Partial throttle only happens at corner apex / traction limit.
      if (err > 4) {
        // Need to accelerate — hit the gas hard, reach 100% with any meaningful gap
        throttle = Math.min(1, 0.55 + err / 18);
        brake    = 0;
      } else if (err < -8) {
        // Need to slow down — trail brake from 30 % up to 100 %
        throttle = 0;
        brake    = Math.min(1, 0.30 + (-err - 8) / 55);
      } else {
        // Corner exit / mid-corner: driver feeding in 30–75 % throttle
        throttle = 0.30 + Math.random() * 0.45;
        brake    = 0;
      }

      // ── Speed physics ─────────────────────────────────────────
      // Drag-limited acceleration: strong pull at low speed, tapering off
      const maxAccel = Math.max(3, 18 * (1 - speed / 375)); // km/h per second
      const maxDecel = 48;                                   // km/h per second (full brake)
      speed += throttle * maxAccel * (TICK / 1000);
      speed -= brake    * maxDecel * (TICK / 1000);
      speed  = Math.max(55, Math.min(345, speed));

      // ── Gear selection ────────────────────────────────────────
      if (!shifting) {
        const currentRPM = speed * GEAR_RATIO[gear];
        if (currentRPM > RPM_UP && gear < 7) {
          nextGear   = gear + 1;
          shifting   = true;
          shiftMs    = SHIFT_DUR_UP;
        } else if (currentRPM < RPM_DOWN && gear > 1) {
          nextGear   = gear - 1;
          shifting   = true;
          shiftMs    = SHIFT_DUR_DOWN;
        }
      } else {
        shiftMs -= TICK;
        if (shiftMs <= 0) {
          gear    = nextGear;
          shifting = false;
        }
      }

      // ── RPM from gear + speed ─────────────────────────────────
      let rawRPM = speed * GEAR_RATIO[gear];

      if (shifting) {
        // Torque cut during shift: RPM dips toward idle before next gear bites
        const progress = 1 - shiftMs / (nextGear > gear ? SHIFT_DUR_UP : SHIFT_DUR_DOWN);
        rawRPM = rawRPM * (0.6 + 0.4 * progress);
      }

      // Throttle lift also blips RPM slightly below the gear curve
      if (throttle < 0.15 && brake === 0) rawRPM *= 0.97;

      rawRPM  = Math.max(RPM_IDLE, Math.min(RPM_LIMIT, rawRPM));
      rawRPM += (Math.random() - 0.5) * 120; // engine noise
      rpm    += (rawRPM - rpm) * 0.4;        // smooth display

      // ── DRS ───────────────────────────────────────────────────
      const drsOpen = speed > 195 && throttle > 0.75 && brake < 0.02;

      // ── RPM bar colour: white → red as limiter approaches ─────
      const rpmPct  = (rpm - RPM_IDLE) / (RPM_LIMIT - RPM_IDLE);
      const barR    = Math.round(80  + rpmPct * 175);
      const barG    = Math.round(80  - rpmPct * 74);
      const barB    = Math.round(80  - rpmPct * 80);
      if (els.rpmBar) {
        els.rpmBar.style.width      = Math.round(rpmPct * 100) + '%';
        els.rpmBar.style.background = `rgb(${barR},${barG},${barB})`;
      }

      // ── Advance lap profile ───────────────────────────────────
      segMs += TICK;
      if (segMs >= seg.d) {
        segMs   = 0;
        segIdx  = (segIdx + 1) % LAP.length;
      }

      // ── DOM update ────────────────────────────────────────────
      els.speed.textContent    = Math.round(speed);
      els.rpm.textContent      = Math.round(rpm).toLocaleString();
      els.gear.textContent     = gear;
      els.throttle.textContent = Math.round(throttle * 100) + '%';
      els.brake.textContent    = Math.round(brake    * 100) + '%';
      if (els.speedBar) els.speedBar.style.width = Math.round(speed / 345 * 100) + '%';
      if (els.drs) {
        els.drs.textContent   = drsOpen ? 'OPEN' : 'CLOSED';
        els.drs.className     = drsOpen ? 'drs-indicator' : 'drs-indicator drs-off';
      }
    }, TICK);
  }

  // ─── LAP TIME COUNTER ────────────────────────────────────────
  function animateLapTime() {
    const el = document.getElementById('lap-display');
    if (!el) return;
    // Count up like a real timer with occasional flash for "new fastest"
    let ms = 0;
    let laps = 0;
    const lapTarget = 78234; // 1:18.234

    setInterval(() => {
      ms += 90;
      if (ms > lapTarget) {
        ms = 0;
        laps++;
        el.style.color = '#00e676'; // green flash for new lap
        setTimeout(() => { el.style.color = ''; }, 600);
      }
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const millis  = Math.floor((ms % 1000) / 10);
      el.textContent = `${minutes}:${String(seconds).padStart(2,'0')}.${String(millis).padStart(2,'0')}`;
    }, 90);
  }

  // ─── NAV SCROLL STYLE ────────────────────────────────────────
  function initNav() {
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 60
        ? 'rgba(7,7,7,0.95)'
        : 'rgba(7,7,7,0.75)';
    });
  }

  // ─── BOOT ────────────────────────────────────────────────────
  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    initNav();
    initFilter();
    animateTelemetry();
    animateLapTime();
    initReveal(); // reveal hero-level elements immediately

    // Load from globals defined by data/data.js (shared with Game Dev theme)
    const profile    = parseCSV(window.PROFILE_CSV    || '');
    const projects   = parseCSV(window.PROJECTS_CSV   || '');
    const skills     = parseCSV(window.SKILLS_CSV     || '');
    const experience = parseCSV(window.EXPERIENCE_CSV || '');

    renderProfile(profile.length    ? profile[0]  : FALLBACK.profile);
    renderProjects(projects.length   ? projects    : FALLBACK.projects);
    renderSkills(skills.length     ? skills      : FALLBACK.skills);
    renderExperience(experience.length ? experience : FALLBACK.experience);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
