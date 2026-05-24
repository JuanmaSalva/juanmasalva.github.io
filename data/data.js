// ══════════════════════════════════════════════════════════════
//  PORTFOLIO DATA — shared by F1 & Game Dev themes
//  Edit this ONE file to update both portfolios simultaneously.
//
//  Format rules:
//    Sub-lists (tech, tags, highlights): separated by  |
//    Paragraphs in long_desc:            separated by  ||
//    Tag colours: no suffix = cyan, :pink = magenta, :purple
// ══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// PROJECTS
// Columns: id, num, icon, name, short_desc, long_desc, tags,
//          tech, highlights, year, status, github, demo, image,
//          category, featured
// ─────────────────────────────────────────────────────────────
const PROJECTS_CSV = `id,num,icon,name,short_desc,long_desc,tags,tech,highlights,year,status,github,demo,image,category,featured
histera,01,⚔️,Histera,"Action video game developed as a team project.","Histera is an action video game developed as a team. A multiplayer FPS with a unique historical weapons premise — from swords to rifles in the same arena.||Contributed to core gameplay systems, networking architecture, and performance optimization throughout development.","Game|Action:pink","Unreal Engine|C++|Blueprint|Networking","Designed and implemented core combat systems|Networking architecture for multiplayer sessions|Performance profiling and optimization passes|Level streaming and scene management",2023,In progress,,,,"Game Development",false
robopacman,02,🤖,RoboPacMan,"A reimagining of the classic PacMan arcade game with a robotic theme and renewed mechanics.","RoboPacMan takes the mechanics of the classic 1980 arcade game and reinvents them with a robotic theme. The player controls a robot collector that must dodge autonomous enemy units while completing objectives on each level.||The project explored pathfinding concepts, AI state management, and arcade game loop development in C++.","Arcade|C++:purple","C++|SDL2|Pathfinding|AI","Implemented the complete game loop|Enemy pathfinding system using A*|Collision detection and scoring system|Level progression and difficulty scaling",2023,Completed,,,,"Game Development",false
tanks,03,🎯,Tanks Showdown,"Tank combat game with realistic physics and real-time tactical action.","Tanks Showdown is a tank combat game that emphasises projectile physics and realistic vehicle movement. The player competes in closed arenas against AI-controlled opponents with differentiated behaviours.||The project focused on physics simulation, combat AI, and level design for tactical action experiences.","Shooter|Physics:pink|Tactical:purple","Unity|C#|Networking|Procedural Generation","Projectile and explosion physics simulation|AI system with multiple behaviours (attack, flank, retreat)|Vehicle physics engine|Combat arena design and balancing",2021,Completed,,,,"Game Development",false
quack-engine,04,⚙️,Quack Engine,"Custom game engine built from scratch: own renderer, physics and ECS.","Quack Engine is a game engine developed entirely from scratch in C++ and OpenGL. The goal was to deeply understand the systems that power a modern engine: rendering, memory management, entity-component system, and basic physics.||This is the technical project I am most proud of, as it required researching and solving very low-level problems without relying on external frameworks.","Engine:purple|C++:purple|OpenGL","C++|OpenGL|GLSL|CMake|ECS","Configurable rendering pipeline with GLSL shaders|Custom Entity-Component System (ECS)|Basic physics integration with AABB collisions|Asset loading system for textures and meshes|Basic scene editor with ImGui",2023,In progress,https://github.com/JuanmaSalva,,,,"Engine Development",true
f1-data,05,🏎️,F1 Data,"Visualisation and analysis tool for Formula 1 data.","F1 Data is an analysis and visualisation tool focused on Formula 1. It lets you explore and compare lap time data, pitstop strategies, telemetry, and team performance across a season.||The project combines public data scraping with interactive visualisations to surface insights about driver and team performance.","Data Viz|Python:pink|F1","Python|FastF1|Matplotlib|Manim|Data Pipelines","Extraction and cleaning of historical season data|Comparative race pace visualisations|Pitstop strategy analysis tool|Interactive results dashboard",2023,Completed,https://github.com/JuanmaSalva,,,,"Motorsport Software",true
f1-telemetry,06,📡,F1 Telemetry,"System and library for processing real-time F1 telemetry data.","F1 Telemetry is a C++ library and data processing system for Formula 1 real-time telemetry. It receives and parses data emitted via UDP by the Codemasters F1 game, feeding a Unity visual layer with hundreds of samples per second — zero frame drops.||The focus was on system architecture, efficient data stream processing, and exposing a clean API to consume the information.","Library:purple|Real-time|F1","C++|Unity|C#|UDP Networking|Custom Graphs","Custom C++ UDP packet parser for the Codemasters protocol|High-performance custom graph system for real-time data|Zero frame-drop architecture with data buffering|Public library API with documentation",2020,Completed,https://github.com/JuanmaSalva/F12020TelemetryLibrary,,,,"Motorsport Software",true
espacial,07,🚀,Convivencia Espacial,"Space simulation exploring interaction dynamics in orbital environments.","Convivencia Espacial is a simulation that explores interaction dynamics in space environments. The project investigates how to design coexistence and collaboration systems between agents under microgravity conditions and limited resources.||It was developed as an experimental project, combining simulation with systems design elements.","Simulation|Space:pink","Unity|C#|Physics","Microgravity physics simulation|Cooperative agent behaviour system|Orbital scenario design|Space-adapted UI",2022,Completed,,,,"Game Development",false
mobile,08,📱,Mobile,"Mobile platform development project.","Add your mobile project description here: what it is about, target platform (iOS, Android), genre or app type, and any relevant technical details.||Remember you can separate paragraphs with a double vertical bar.","Mobile|Game:pink","Unity|C#|Android","Add your specific contributions here|Core mechanic implemented|Mobile device optimisation",2023,Completed,,,,"Game Development",false
game-jams,09,🎮,Game Jams,"Collection of prototypes built during game jams under time constraints.","Participation in multiple game jams over the years, creating playable prototypes in 48–72 hours under assigned themes. Each jam is a different challenge: design, code, art, and audio all in record time.||These experiences have been fundamental in learning to work under pressure, iterate fast, and focus on what makes a game mechanic feel right.","Collection|Jam:pink|Prototypes:purple","Unity|C#|Godot|Varied","Rapid prototyping of game mechanics|Complete experiences designed in 48 hours|Working under thematic and time constraints|Accelerated iteration and playtesting",2021,Ongoing,,,,"Game Development",false`;

// ─────────────────────────────────────────────────────────────
// WORK EXPERIENCE
// Columns: company, role, period, location, desc, tags, current, type
// current: true → shows pulsing "CURRENT" badge in Game Dev theme
// type: Work | Education  (used by F1 theme)
// ─────────────────────────────────────────────────────────────
const EXPERIENCE_CSV = `company,role,period,location,desc,tags,current,type
Independent,"Game Developer & Tools Engineer","2020 — Present","Palma de Mallorca","Built and shipped multiple games and developer tools independently. Developed open-source F1 telemetry systems, a custom game engine, and automated data visualization pipelines. All projects published on GitHub.","Unity|C#|C++|Python|OpenGL",true,Work
"CITM — UPC","BSc Game Design & Development","2019 — 2023","Barcelona","Bachelor's degree focused on real-time systems, graphics programming, game architecture, and software engineering. Built a custom engine, networked multiplayer games, and bespoke tooling throughout the programme.","C++|C#|Unity|OpenGL|Algorithms",false,Education`;

// ─────────────────────────────────────────────────────────────
// SKILLS
// Columns: icon, name, level, category
// icon + name used by Game Dev theme
// name + level + category used by F1 theme
// ─────────────────────────────────────────────────────────────
const SKILLS_CSV = `icon,name,level,category
🔧,C++,90,Programming
💻,C#,85,Programming
🐍,Python,80,Programming
🎮,Unity,90,Engines & Frameworks
⚡,Unreal Engine,70,Engines & Frameworks
🌐,OpenGL / GLSL,72,Engines & Frameworks
🎯,Game Design,80,Design & Systems
🔩,Physics Sims,78,Design & Systems
🤖,AI / NavMesh,75,Design & Systems
📊,Data Analysis,85,Data & Tools
📡,Telemetry Systems,80,Data & Tools
🛠️,Git,85,Data & Tools
📱,Mobile Dev,70,Data & Tools
🏎️,Performance Profiling,78,Data & Tools`;

// ─────────────────────────────────────────────────────────────
// STATS  (used by Game Dev theme hero section)
// ─────────────────────────────────────────────────────────────
const STATS_CSV = `value,label
9+,Projects
1,Own Engine
∞,Game Jams
100%,Passion`;

// ─────────────────────────────────────────────────────────────
// PROFILE  (used by F1 theme only)
// ─────────────────────────────────────────────────────────────
const PROFILE_CSV = `name,title,location,email,linkedin,github,bio
"Juan Manuel Salvá","Software Developer","Palma de Mallorca — open to relocation","juanma.salva.work@gmail.com","https://www.linkedin.com/in/juan-manuel-salva/","https://github.com/JuanmaSalva","Game developer with 5+ years of experience building high-performance real-time systems, now targeting motorsport software engineering. Passionate about Formula 1, I have built telemetry libraries, data visualization pipelines, and custom game engines from scratch — applying the same performance-first mindset that defines F1 engineering."`;
