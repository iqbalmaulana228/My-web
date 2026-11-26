import { useState } from 'react';
import Lanyard from './components/Lanyard.jsx';

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

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [['Tentang', '#about'], ['Pengalaman', '#experience'], ['Keahlian', '#skills'], ['Pendidikan', '#education']];
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
      <div className="fact-item fact-location"><span className="fact-index">04</span><div><strong>Cikarang, Indonesia</strong><small>On-site · Hybrid</small></div></div>
    </div>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-inner about-layout">
        <SectionHeading kicker="01 / ABOUT" title={<>Organized by nature.<br /><span>Driven to improve.</span></>} />
        <div className="about-content">
          <p className="about-lead">Saya adalah pribadi yang adaptif dan terbiasa bekerja dengan dokumen, data, serta koordinasi operasional.</p>
          <p>Berpengalaman dalam pengelolaan dokumen menggunakan Microsoft Excel, penyusunan dokumen inventaris, pengorganisasian arsip, pembuatan laporan, dan pemrosesan invoice. Saya mengandalkan kemampuan organisasi, interpersonal, dan adaptasi untuk berkontribusi dalam tim, sekaligus terus mengembangkan keterampilan di lingkungan kerja yang dinamis.</p>
          <div className="about-tags"><span>Document Management</span><span>Data Processing</span><span>Process Improvement</span><span>Continuous Learning</span></div>
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
  return (
    <section className="section skills-section" id="skills">
      <div className="section-inner">
        <SectionHeading kicker="03 / CAPABILITIES" title="Skills with practical context." description="Kekuatan utama dibangun dari pekerjaan operasional dan pengalaman belajar." />
        <div className="capability-grid">
          {capabilities.map(([title, description], index) => (
            <article className="capability-card" key={title}>
              <span className="capability-number">0{index + 1}</span>
              <span className="capability-rule" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="skill-strip"><span className="skill-strip-label">SKILL SET</span><div className="skill-chips">{skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section education-section" id="education">
      <div className="section-inner education-layout">
        <SectionHeading kicker="04 / EDUCATION" title="Learning in progress." description="Fondasi akademik dan pengalaman belajar yang membentuk cara berpikir analitis." />
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
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
