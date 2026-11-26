<div align="center">

# Muhammad Iqbal Maulana

### Interactive Portfolio · Professional Side × Dark Side

A personal portfolio that brings together my professional journey and developer experiments in one interactive experience.

[![Live Portfolio](https://img.shields.io/badge/LIVE_PORTFOLIO-Open-140A9A?style=for-the-badge&logo=vercel&logoColor=white)](https://iqbal-professional-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GITHUB-iqbalmaulana228-181717?style=for-the-badge&logo=github)](https://github.com/iqbalmaulana228)
[![LinkedIn](https://img.shields.io/badge/LINKEDIN-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/muhammad-iqbal-maulana228)

<br/>

![React](https://img.shields.io/badge/React-19.3.1-61DAFB?style=flat-square&logo=react&logoColor=111827)
![Vite](https://img.shields.io/badge/Vite-8.3.8-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=111827)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=flat-square&logo=threedotjs&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-Animations-fff?style=flat-square&logo=framer&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-Scroll_Animations-88CE02?style=flat-square&logo=greensock&logoColor=111827)

</div>

---

## The idea

This is more than a conventional link page. The portfolio has **two distinct sides**, each with its own visual language and purpose.

| Professional Side | Dark Side |
| --- | --- |
| A clean, editorial presentation | A terminal-inspired developer workspace |
| Work experience, capabilities, skills, and education | GitHub projects, technology stack, and build journey |
| Gloria Blue, white, and industrial accents | Deep navy, pixel details, and electric blue |
| Interactive 3D lanyard and focused content sections | Code-editor typing, animated cards, and command palette |

Switch between both experiences using the floating **Sling Button** in the bottom-right corner. The selected side is remembered in the browser.

**Live website:** [iqbal-professional-portfolio.vercel.app](https://iqbal-professional-portfolio.vercel.app)

## What is inside

### 01 · Professional Side

The professional view focuses on my work and academic background.

- **Hero and quick facts** — a concise introduction and profile highlights.
- **About** — background, interests, and personal direction.
- **Experience** — a chronological work timeline.
- **Skills and capabilities** — interactive skill exploration and practical strengths.
- **Work files** — selected work and document-oriented content.
- **Education** — academic background.
- **Explore** — an interactive navigation experience.
- **Contact** — professional contact links.
- **3D lanyard** — an interactive Three.js visual in the hero area.

### 02 · Dark Side

The alternate view presents my developer profile as a small digital workspace.

- **File-tree navigation** for moving between profile sections.
- **Animated `profile.ts` editor** with syntax colors and character-by-character typing.
- **Technology stack selector** for Languages, Web, and Tooling.
- **Repository folders** with source links and project notes.
- **Learning log** for applications, automation, and AI experiments.
- **Build terminal** with a command palette for quick navigation.
- **GitHub and LinkedIn endpoints** for connecting with me.

### React Bits interaction layer

The portfolio uses [React Bits](https://reactbits.dev/) components, adapted and styled to fit the visual system.

**Dark Side additions**

| Component | Where it is used |
| --- | --- |
| `SpotlightCard` | Cursor spotlight around the code editor |
| `Magnet` | Magnetic movement on the GitHub action |
| `StarBorder` | Animated border around the primary call to action |
| `ClickSpark` | Click particles on the repository action |
| `CountUp` | Animated portfolio summary numbers |
| `DecryptedText` | Scramble reveal for the status label |
| `GlareHover` | Light-sweep effect on learning cards |
| `LogoLoop` | Moving technology stack strip |
| `ScrollVelocity` | Kinetic build-log typography |
| `AnimatedContent` | Staggered reveal for learning cards |

**Professional Side interactions**

`CircularCarousel` · `FlipCard` · `Folder` · `OptionWheel` · `FlowingMenu` · `GooeyNav` · `TextLoop` · `TrueFocus` · `VariableProximity` · `TiltedCard`

The Sling Button provides the shared transition between both sides.

## Featured work

A selection of projects represented in the Dark Side portfolio.

| Project | What it does | Main technologies |
| --- | --- | --- |
| [DocuFlow](https://github.com/iqbalmaulana228/DocuFlow) | Browser-based PDF and document workspace | JavaScript, browser APIs |
| [OurPlans](https://github.com/iqbalmaulana228/OurPlans) | Wedding-planning workspace and guest concierge | Supabase, PostgreSQL, Vercel, Gemini |
| [Gemclip](https://github.com/iqbalmaulana228/gemclip) | Local YouTube-to-short-clips workflow | Python, Gemini, OpenCV, FFmpeg |
| [WhatsApp Document Extractor](https://github.com/iqbalmaulana228/wa-dokumen-extractor-bot) | Document data extraction with structured output | Python, OCR, Google Apps Script |
| [Daily Financial Tracker](https://github.com/iqbalmaulana228/daily-financial-tracker) | Offline-first personal finance app | React Native, Expo, TypeScript |
| [Hand Tracking Simulation](https://github.com/iqbalmaulana228/handtrackingTest) | Real-time hand tracking experiment | Python, OpenCV, MediaPipe, Pygame |

> Project details and availability can evolve. Visit the repositories for their current source code and documentation.

## Technology

### Core

- **React** — component-driven user interface.
- **Vite** — development server and production build.
- **JavaScript / JSX** — application logic and UI composition.
- **CSS** — responsive layouts, theme styling, and custom animation details.

### Animation and visuals

- **Three.js** — 3D lanyard scene.
- **Motion for React** — interactive and motion-driven UI.
- **GSAP + ScrollTrigger** — scroll-based content animation.
- **React Bits** — reusable interaction and animation components.

## Run locally

### Requirements

- Node.js **20.19 or newer**
- npm

### Install and start

```bash
git clone https://github.com/iqbalmaulana228/My-web.git
cd My-web
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### Production build

```bash
npm run build
npm run preview
```

The optimized production files are generated in the `dist/` directory.

## Project structure

```text
My-web/
├── public/
│   ├── band.svg
│   ├── card-back.svg
│   ├── card-front.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── reactbits/          # Reusable React Bits components
│   │   ├── DarkSidePortfolio.jsx
│   │   ├── DarkSidePortfolio.css
│   │   ├── Lanyard.jsx
│   │   └── SlingThemeButton.jsx
│   ├── App.jsx                 # Portfolio shell and side switching
│   ├── main.jsx                # React entry point
│   └── styles.css              # Professional-side styles and global tokens
├── index.html
├── package.json
└── vite.config.js
```

## Design notes

- **Professional identity:** Gloria Blue `#140A9A`, white, light neutrals, and industrial accents.
- **Developer identity:** deep navy backgrounds with sky-blue highlights `#86C9FC`.
- **Responsive layout:** content adapts across desktop and smaller screens.
- **Motion preferences:** animation components include reduced-motion handling where supported by their implementation.
- **Lazy loading:** the alternate portfolio and interactive components are loaded on demand.
- **Side persistence:** the selected experience is stored under `iqbal-portfolio-side` in browser local storage.

## Deployment

The repository is connected to **Vercel** for production deployment from the `main` branch.

- **Production:** [iqbal-professional-portfolio.vercel.app](https://iqbal-professional-portfolio.vercel.app)
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Credits

- Interactive component inspiration and source: [React Bits](https://reactbits.dev/) by [DavidHDev](https://github.com/DavidHDev/react-bits).
- 3D rendering: [Three.js](https://threejs.org/).
- Animation tooling: [Motion](https://motion.dev/) and [GSAP](https://gsap.com/).

---

<div align="center">

**Build · Learn · Iterate**

Made by **Muhammad Iqbal Maulana**

[Portfolio](https://iqbal-professional-portfolio.vercel.app) · [GitHub](https://github.com/iqbalmaulana228) · [LinkedIn](https://www.linkedin.com/in/muhammad-iqbal-maulana228)

</div>
