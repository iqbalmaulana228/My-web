import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Lanyard from './components/Lanyard.jsx';

const CircularCarousel = lazy(() => import('./components/reactbits/CircularCarousel.jsx'));
const SpotlightCard = lazy(() => import('./components/reactbits/SpotlightCard.jsx'));
const FlipCard = lazy(() => import('./components/reactbits/FlipCard.jsx'));
const Folder = lazy(() => import('./components/reactbits/Folder.jsx'));
const OptionWheel = lazy(() => import('./components/reactbits/OptionWheel.jsx'));

const profileUrl = 'https://www.linkedin.com/in/muhammad-iqbal-maulana228';

const experiences = [
  {
    period: 'Oct 2025 — Present',
    role: 'Tax & Document Center Synergy',
    company: 'Komatsu Indonesia, PT',
    type: 'Full-time · On-site',
    current: true,
    detail: 'Peran saat ini dalam sinergi fungsi Tax dan Document Center di lingkungan Komatsu Indonesia.',
  },
  {
    period: 'Jun 2024 — Oct 2025',
    role: 'Document Center Clerk',
    company: 'Komatsu Indonesia, PT',
    type: 'Full-time · Cilincing, Jakarta',
    detail: 'Melanjutkan pengalaman operasional Document Center dengan fokus pada pengelolaan dokumen dan administrasi.',
  },
  {
    period: 'Jun 2023 — May 2024',
    role: 'Document Center (2nd Contract)',
    company: 'Komatsu Indonesia, PT',
    type: 'Contract · Cilincing, Jakarta',
    detail: 'Cakupan Document Center tidak hanya terpusat pada PT Komatsu Indonesia, tetapi juga mendukung Komatsu Group Indonesia, termasuk PT Komatsu Undercarriage Indonesia.',
  },
  {
    period: 'Jun 2022 — May 2023',
    role: 'Document Center',
    company: 'Komatsu Indonesia, PT',
    type: 'Contract · Cilincing, Jakarta',
    detail: 'Memproses invoice supplier, memasukkan data invoice ke sistem perusahaan, menjaga kerapian arsip, berkoordinasi dengan departemen internal untuk menyelesaikan perbedaan dokumen, serta mengusulkan peluang perbaikan proses.',
  },
  {
    period: 'Feb 2021 — Apr 2021',
    role: 'Online Internship',
    company: 'PPTIK · Institut Teknologi Bandung',
    type: 'Internship · Remote',
    detail: 'Mengembangkan sistem IoT Smart Watering menggunakan Arduino, menyusun ringkasan diskusi workshop, mengikuti seminar integrasi Smart Watering dengan Flutter, serta menganalisis aplikasi dan membuat Use Case diagram untuk tugas E-Learning.',
  },
];

const capabilities = [
  ['Document administration', 'Pengelolaan, pemeriksaan, dan pengarsipan dokumen'],
  ['Invoice processing', 'Pemeriksaan kelengkapan dan pemrosesan invoice supplier'],
  ['Microsoft Excel', 'Pengolahan data, penyusunan dokumen, dan laporan'],
  ['Internal coordination', 'Koordinasi lintas departemen untuk penyelesaian perbedaan dokumen'],
  ['Process improvement', 'Mengidentifikasi peluang efisiensi dan usulan peningkatan proses'],
  ['Technical foundation', 'IoT Arduino, Flutter seminar, dan analisis sistem'],
];

const skills = ['Microsoft Excel', 'Document Control', 'Invoice Processing', 'Data Entry', 'Data Processing', 'Report Preparation', 'IoT Integration', 'Software Analysis', 'Use Case Diagram'];

const focusOptions = [
  { label: 'Document Center', detail: 'Mengelola dokumen operasional agar lengkap, terstruktur, dan mudah ditelusuri.' },
  { label: 'Tax Coordination', detail: 'Mendukung sinergi fungsi Tax dan Document Center dalam alur administrasi.' },
  { label: 'Invoice Processing', detail: 'Memeriksa kelengkapan invoice supplier, melakukan pencatatan, dan berkoordinasi saat ada perbedaan.' },
  { label: 'Excel & Reporting', detail: 'Menggunakan Microsoft Excel untuk pengolahan data, penyusunan dokumen, dan laporan.' },
  { label: 'Process Improvement', detail: 'Mengidentifikasi peluang efisiensi dan menyampaikan usulan peningkatan proses.' },
  { label: 'IoT & Analysis', detail: 'Fondasi teknis dari proyek Smart Watering berbasis Arduino dan analisis Use Case E-Learning.' },
];

const skillArtwork = [
  { title: 'Microsoft Excel', colors: ['#140A9A', '#0E1271', '#FFC72C'] },
  { title: 'Document Control', colors: ['#102A73', '#140A9A', '#86C9FC'] },
  { title: 'Invoice Processing', colors: ['#203B69', '#0E1271', '#FFC72C'] },
  { title: 'Data Processing', colors: ['#172554', '#140A9A', '#86C9FC'] },
  { title: 'Process Improvement', colors: ['#0E1271', '#253A83', '#FFC72C'] },
  { title: 'IoT Integration', colors: ['#142E61', '#140A9A', '#86C9FC'] },
  { title: 'Software Analysis', colors: ['#0B1647', '#253A83', '#FFC72C'] },
].map((item, index) => {
  const title = item.title.toUpperCase();
  const colors = item.colors;
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900">',
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + colors[0] + '"/><stop offset="1" stop-color="' + colors[1] + '"/></linearGradient>',
    '<pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#ffffff" stroke-opacity=".12"/></pattern></defs>',
    '<rect width="720" height="900" rx="42" fill="url(#bg)"/><rect width="720" height="900" rx="42" fill="url(#grid)"/>',
    '<circle cx="580" cy="168" r="92" fill="none" stroke="' + colors[2] + '" stroke-width="2" stroke-opacity=".75"/>',
    '<circle cx="580" cy="168" r="61" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity=".36"/>',
    '<path d="M70 360H650M70 383H430" stroke="#ffffff" stroke-opacity=".22" stroke-width="2"/>',
    '<path d="M70 610H650" stroke="' + colors[2] + '" stroke-width="5" stroke-linecap="round"/>',
    '<text x="72" y="130" fill="#ffffff" fill-opacity=".72" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5">PROFESSIONAL SKILL</text>',
    '<text x="70" y="282" fill="' + colors[2] + '" font-family="Arial,sans-serif" font-size="96" font-weight="800">0' + (index + 1) + '</text>',
    '<text x="70" y="500" fill="#ffffff" font-family="Arial,sans-serif" font-size="42" font-weight="800">' + title + '</text>',
    '<text x="72" y="560" fill="#ffffff" fill-opacity=".7" font-family="Arial,sans-serif" font-size="18" letter-spacing="4">IQBAL MAULANA</text>',
    '<text x="72" y="720" fill="#ffffff" fill-opacity=".54" font-family="Arial,sans-serif" font-size="16" letter-spacing="3">KOMATSU · FINANCE · TECHNOLOGY</text>',
    '<path d="M560 750l46 46m0-46l-46 46" stroke="' + colors[2] + '" stroke-width="6" stroke-linecap="round"/>',
    '</svg>'
  ].join('');
  return {
    src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg),
    alt: 'Visual skill card for ' + item.title,
    title: item.title,
    subtitle: ['Data & reporting', 'Document operations', 'Finance workflow', 'Information handling', 'Operational efficiency', 'Arduino · Smart Watering', 'Use Case · E-Learning'][index]
  };
});

function Icon({ name, size = 18 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    external: <><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
    graduation: <><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c4 3 8 3 12 0v-5M22 10v6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Deferred({ children, className = '', minHeight = 320 }) {
  const host = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) { setReady(true); return undefined; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '260px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className={'deferred-mount' + (className ? ' ' + className : '')}>
    {ready ? children : <div className="deferred-placeholder" style={{ minHeight }} aria-hidden="true"><span /></div>}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Tentang', '#about'], ['Pengalaman', '#experience'], ['Keahlian', '#skills'], ['Koleksi', '#files'], ['Pendidikan', '#education']];
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Kembali ke beranda">
        <span className="brand-mark">IM</span>
        <span className="brand-copy"><strong>IQBAL MAULANA</strong><small>PROFESSIONAL PORTFOLIO</small></span>
      </a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={open}>
        <Icon name={open ? 'close' : 'menu'} size={21} />
      </button>
      <nav className={open ? 'main-nav is-open' : 'main-nav'}>
        {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Hubungi saya <Icon name="arrow" size={15} /></a>
      </nav>
    </header>
  );
}

function SectionHeading({ kicker, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? ' light' : ''}`}>
      <span className="eyebrow"><i />{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-copy">
        <div className="availability"><span className="availability-dot" /> OPEN TO OPPORTUNITIES <span className="availability-note">· Recruiters only</span></div>
        <p className="hero-kicker">DOCUMENT CENTER STAFF <span>·</span> TAX <span>·</span> PT KOMATSU INDONESIA <span>·</span> UNDERGRADUATE</p>
        <h1>Precision in every document. <em>Progress</em> in every process.</h1>
        <p className="hero-intro">Saya mengelola dokumen dan proses invoice di lingkungan industri, dengan ketertarikan pada pengolahan data, perbaikan proses, dan teknologi informasi.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={profileUrl} target="_blank" rel="noreferrer">Connect on LinkedIn <Icon name="external" size={16} /></a>
          <a className="button button-quiet" href="#experience">Lihat pengalaman <Icon name="arrow" size={16} /></a>
        </div>
        <div className="hero-meta">
          <span><Icon name="pin" size={16} /> Cikarang Barat, West Java</span>
          <span className="meta-divider" />
          <span>Indonesia</span>
        </div>
      </div>
      <div className="hero-visual" aria-label="Kartu profil interaktif">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <span className="visual-label">INTERACTIVE PROFILE CARD <b>01 / 05</b></span>
        <div className="lanyard-stage">
          <Lanyard
            frontImage="/card-front.svg"
            backImage="/card-back.svg"
            strapImage="/band.svg"
            imageFit="cover"
            cardColor="#140a9a"
            orientation="portrait"
            finish="matte"
            cornerRadius={0.3}
            size={0.6}
            anchor="center"
            strapLength={0.5}
            strapColor="#140a9a"
            strapWidth={0.65}
            metal="graphite"
            gravity={1}
            damping={0.5}
            elasticity={0.5}
            breeze={0.5}
            interactive
            intro
          />
        </div>
        <div className="visual-caption"><span className="caption-line" /> DRAG TO INTERACT <span className="caption-line" /></div>
      </div>
      <div className="hero-bottom-mark"><span>01</span><i /> A PROFILE BUILT ON EXPERIENCE</div>
    </section>
  );
}

function QuickFacts() {
  return (
    <div className="quick-facts">
      <div className="fact-item"><span className="fact-index">01</span><div><strong>Since 2022</strong><small>Komatsu experience</small></div></div>
      <div className="fact-item"><span className="fact-index">02</span><div><strong>Finance &amp; Document</strong><small>Operational focus</small></div></div>
      <div className="fact-item"><span className="fact-index">03</span><div><strong>Teknik Informatika</strong><small>Universitas Esa Unggul</small></div></div>
      <div className="fact-item fact-location"><span className="fact-index">04</span><div><strong>85 followers · 67 connections</strong><small>LinkedIn profile</small></div></div>
    </div>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-inner">
        <div className="about-layout">
          <SectionHeading kicker="01 / ABOUT" title={<>Organized by nature.<br /><span>Driven to improve.</span></>} />
          <div className="about-content">
            <p className="about-lead">Saya adalah pribadi yang adaptif dan terbiasa bekerja dengan dokumen, data, serta koordinasi operasional.</p>
            <p>Berpengalaman dalam pengelolaan dokumen menggunakan Microsoft Excel, penyusunan dokumen inventaris, pengorganisasian arsip, pembuatan laporan, dan pemrosesan invoice. Saya mengandalkan kemampuan organisasi, interpersonal, dan adaptasi untuk berkontribusi dalam tim, sekaligus terus mengembangkan keterampilan di lingkungan kerja yang dinamis.</p>
            <div className="about-tags"><span>Document Management</span><span>Data Processing</span><span>Process Improvement</span><span>Continuous Learning</span></div>
          </div>
          <div className="about-flip-wrap">
            <div className="flip-wrap-heading"><span className="eyebrow"><i /> BEYOND THE JOB TITLE</span><small>INTERACTIVE PROFILE</small></div>
            <Deferred minHeight={390}>
              <Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 390 }} />}>
                <FlipCard width={330} height={390} radius={18} background="#140a9a" color="#ffffff" shadowColor="#140a9a" shadowOpacity={0.16} glare glareOpacity={0.12} tilt tiltMax={7} hoverScale={1.015} ariaLabel="Balik kartu untuk melihat latar belakang teknis" className="profile-flip-card"
                  front={
                    <div className="profile-flip-face profile-flip-front">
                      <div className="flip-face-top"><span>PROFILE / 01</span><i /></div>
                      <div className="flip-monogram">IM<span>.</span></div>
                      <div className="flip-front-copy"><span>DOCUMENT CENTER · TAX</span><strong>Muhammad Iqbal Maulana</strong><small>PT Komatsu Indonesia</small></div>
                      <div className="flip-card-hint">TAP TO EXPLORE <b>↻</b></div>
                    </div>
                  }
                  back={
                    <div className="profile-flip-face profile-flip-back">
                      <div className="flip-face-top"><span>PROFILE / 02</span><i /></div>
                      <span className="flip-back-kicker">TECHNICAL FOUNDATION</span>
                      <strong>Technology meets administration.</strong>
                      <p>Undergraduate student in Teknik Informatika at Universitas Esa Unggul, with learning experience in IoT Smart Watering and software analysis.</p>
                      <div className="flip-back-tags"><span>Arduino</span><span>IoT</span><span>Use Case</span></div>
                      <div className="flip-card-hint">FLIP BACK <b>↻</b></div>
                    </div>
                  }
                />
              </Suspense>
            </Deferred>
          </div>
        </div>
        <div className="spotlight-grid">
          <Deferred minHeight={190}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 190 }} />}>
            <SpotlightCard theme="light" spotlightColor="#140a9a" intensity={0.18} spotlightSize={250} borderGlow={0.42} proximity={90} className="spotlight-profile-card">
              <div className="spotlight-card-content"><span className="spotlight-index">01 / EXPERIENCE</span><strong className="spotlight-stat">4 yrs 6 mos</strong><h3>Komatsu Indonesia</h3><p>Perjalanan profesional di Document Center dan sinergi Tax.</p></div>
            </SpotlightCard>
          </Suspense></Deferred>
          <Deferred minHeight={190}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 190 }} />}>
            <SpotlightCard theme="light" spotlightColor="#0e1271" intensity={0.16} spotlightSize={250} borderGlow={0.38} proximity={90} className="spotlight-profile-card">
              <div className="spotlight-card-content"><span className="spotlight-index">02 / OPERATIONS</span><strong className="spotlight-stat">Tax + Document</strong><h3>Operational synergy</h3><p>Dokumen, data, invoice, dan koordinasi lintas departemen.</p></div>
            </SpotlightCard>
          </Suspense></Deferred>
          <Deferred minHeight={190}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 190 }} />}>
            <SpotlightCard theme="light" spotlightColor="#0e1271" intensity={0.15} spotlightSize={250} borderGlow={0.38} proximity={90} className="spotlight-profile-card">
              <div className="spotlight-card-content"><span className="spotlight-index">03 / LEARNING</span><strong className="spotlight-stat">IT foundation</strong><h3>Informatics engineering</h3><p>IoT Smart Watering, Arduino, Flutter seminar, dan software analysis.</p></div>
            </SpotlightCard>
          </Suspense></Deferred>
        </div>
      </div>
    </section>
  );
}


function Experience() {
  return (
    <section className="section experience-section" id="experience">
      <div className="section-inner">
        <div className="experience-top">
          <SectionHeading kicker="02 / EXPERIENCE" title="Experience that compounds." description="Perjalanan profesional di lingkungan industri, document center, dan pengembangan teknologi." />
          <div className="experience-years"><strong>2022</strong><span>—</span><strong>NOW</strong><small>PROFESSIONAL JOURNEY</small></div>
        </div>
        <div className="timeline">
          {experiences.map((item, index) => (
            <article className={`timeline-item${item.current ? ' current' : ''}`} key={item.role}>
              <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
              <div className="timeline-period">{item.period}</div>
              <div className="timeline-detail">
                <div className="role-heading"><h3>{item.role}</h3>{item.current && <span className="current-badge">CURRENT</span>}</div>
                <p className="timeline-company">{item.company}</p>
                <span className="timeline-type">{item.type}</span>
                <p className="timeline-description">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [focused, setFocused] = useState(2);
  const focus = focusOptions[focused] || focusOptions[0];
  return (
    <section className="section skills-section" id="skills">
      <div className="section-inner">
        <SectionHeading kicker="03 / CAPABILITIES" title="Skills with practical context." description="Jelajahi kombinasi kemampuan operasional, pengolahan data, dan fondasi teknologi." />
        <div className="skills-showcase-grid">
          <article className="skill-carousel-panel">
            <div className="interaction-panel-heading"><div><span>01 / SKILL ORBIT</span><h3>Capabilities in motion.</h3></div><small>DRAG · FOCUS · EXPLORE</small></div>
            <Deferred minHeight={445}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 445 }} />}>
              <CircularCarousel items={skillArtwork} preset="cylinder" intro="assemble" cardWidth={205} aspectRatio={0.82} gap={18} curve={0.75} tilt={-7} autoplay="drift" speed={9} momentum={0.55} draggable snap pauseOnHover focusOnClick parallax={0.2} stretch={0.32} depthFade={0.38} fadeColor="#ffffff" innerShade={0.22} cornerRadius={16} captions style={{ height: '445px' }} />
            </Suspense></Deferred>
          </article>
          <article className="skill-wheel-panel">
            <div className="interaction-panel-heading"><div><span>02 / FOCUS SELECTOR</span><h3>Explore focus areas.</h3></div></div>
            <p className="wheel-intro">Putar pilihan untuk melihat konteks kemampuan yang digunakan dalam pekerjaan dan proses belajar.</p>
            <div className="option-wheel-stage">
              <Deferred minHeight={340}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 340 }} />}>
                <OptionWheel items={focusOptions.map(item => item.label)} defaultSelected={2} onChange={index => setFocused(index)} textColor="#94a3b8" activeColor="#140a9a" side="left" fontSize={1.24} spacing={1.65} curve={1.12} tilt={9} blur={1.2} fade={0.3} minOpacity={0.1} smoothing={190} inset={22} loop draggable className="portfolio-option-wheel" />
              </Suspense></Deferred>
            </div>
            <div className="focus-detail" aria-live="polite"><span>SELECTED FOCUS</span><strong>{focus.label}</strong><p>{focus.detail}</p></div>
          </article>
        </div>
        <div className="capability-grid">
          {capabilities.map(([title, description], index) => (
            <article className="capability-card" key={title}><span className="capability-number">{String(index + 1).padStart(2, '0')}</span><span className="capability-rule" /><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
        <div className="skill-strip"><span className="skill-strip-label">SKILL SET</span><div className="skill-chips">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>
      </div>
    </section>
  );
}


function WorkFiles() {
  const komatsuFiles = [
    { title: 'Supplier invoice processing', description: 'Pemeriksaan kelengkapan, input data, dan pencatatan invoice supplier.' },
    { title: 'Document center operations', description: 'Pengorganisasian dokumen dan pemeliharaan arsip yang terstruktur.' },
    { title: 'Internal coordination', description: 'Koordinasi dengan departemen terkait untuk menyelesaikan perbedaan dokumen.' },
  ];
  const pptikFiles = [
    { title: 'IoT Smart Watering', description: 'Pengembangan sistem Smart Watering menggunakan Arduino.' },
    { title: 'Flutter integration seminar', description: 'Seminar integrasi Smart Watering dengan pengembangan aplikasi Flutter.' },
    { title: 'E-Learning use case', description: 'Analisis aplikasi dan penyusunan Use Case diagram untuk tugas E-Learning.' },
  ];
  return (
    <section className="section files-section" id="files">
      <div className="section-inner">
        <div className="files-heading-row"><SectionHeading kicker="04 / WORK FILES" title="Work, organized." description="Ringkasan pengalaman operasional dan pembelajaran yang membentuk perjalanan profesional." /><span className="files-aside-note">INTERACTIVE FILES</span></div>
        <div className="folder-grid">
          <article className="folder-card">
            <div className="folder-card-head"><span className="folder-card-index">01</span><div><h3>Komatsu operations</h3><p>Document Center · Tax synergy</p></div></div>
            <div className="folder-component-stage"><Deferred minHeight={285}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 285 }} />}>
              <Folder items={komatsuFiles} label="KOMATSU" mode="book" variant="solid" color="#140a9a" paperColor="#ffffff" tabPosition="right" layout="spread" size={0.76} openOn="click" draggable={false} zoomOnClick peek intro tilt={0.35} bounce={0.35} speed={0.9} theme="light" />
            </Suspense></Deferred></div>
            <p className="folder-card-foot">Operational experience since June 2022</p>
          </article>
          <article className="folder-card">
            <div className="folder-card-head"><span className="folder-card-index">02</span><div><h3>PPTIK internship</h3><p>Institut Teknologi Bandung · 2021</p></div></div>
            <div className="folder-component-stage"><Deferred minHeight={285}><Suspense fallback={<div className="deferred-placeholder" style={{ minHeight: 285 }} />}>
              <Folder items={pptikFiles} label="PPTIK / ITB" mode="book" variant="solid" color="#0e1271" paperColor="#ffffff" tabPosition="left" layout="spread" size={0.76} openOn="click" draggable={false} zoomOnClick peek intro tilt={0.35} bounce={0.35} speed={0.9} theme="light" />
            </Suspense></Deferred></div>
            <p className="folder-card-foot">Online internship · February — April 2021</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section education-section" id="education">
      <div className="section-inner education-layout">
        <SectionHeading kicker="05 / EDUCATION" title="Learning in progress." description="Fondasi akademik dan pengalaman belajar yang membentuk cara berpikir analitis." />
        <div className="education-cards">
          <article className="education-card">
            <div className="education-icon"><Icon name="graduation" size={24} /></div>
            <div><span className="education-label">UNDERGRADUATE</span><h3>Universitas Esa Unggul</h3><p>Teknik Informatika</p><small>Fakultas Ilmu Komputer</small></div>
            <span className="education-arrow">↗</span>
          </article>
          <article className="education-card education-card-secondary">
            <div className="education-icon"><Icon name="briefcase" size={24} /></div>
            <div><span className="education-label">ONLINE INTERNSHIP · 2021</span><h3>PPTIK — Institut Teknologi Bandung</h3><p>IoT Smart Watering · Arduino · Software Analysis</p><small>Remote · February — April 2021</small></div>
            <span className="education-arrow">↗</span>
          </article>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-grid" />
      <div className="section-inner contact-content">
        <span className="eyebrow"><i /> 05 / CONTACT</span>
        <h2>Let’s make work <em>flow better.</em></h2>
        <p>Terbuka untuk terhubung, bertukar pengalaman, dan menjajaki peluang profesional yang relevan.</p>
        <a className="button button-yellow" href={profileUrl} target="_blank" rel="noreferrer">Connect on LinkedIn <Icon name="external" size={16} /></a>
        <div className="contact-foot"><span>Muhammad Iqbal Maulana</span><span>Cikarang Barat · West Java · Indonesia</span></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="section-inner"><a className="footer-brand" href="#top">IM<span>.</span></a><p>© {new Date().getFullYear()} Muhammad Iqbal Maulana. Built with purpose.</p><a href={profileUrl} target="_blank" rel="noreferrer">LinkedIn <Icon name="external" size={13} /></a></div></footer>;
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickFacts />
        <About />
        <Experience />
        <Skills />
        <WorkFiles />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
