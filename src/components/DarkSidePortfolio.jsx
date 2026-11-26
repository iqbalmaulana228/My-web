import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './DarkSidePortfolio.css';

const BranchedMenu = lazy(() => import('./reactbits/BranchedMenu.jsx'));
const FolderFloat = lazy(() => import('./reactbits/FolderFloat.jsx'));
const ThoughtLine = lazy(() => import('./reactbits/ThoughtLine.jsx'));
const PromptBar = lazy(() => import('./reactbits/PromptBar.jsx'));
const RubberSegment = lazy(() => import('./reactbits/RubberSegment.jsx'));

const SpotlightCard = lazy(() => import('./reactbits/SpotlightCard.jsx'));
const Magnet = lazy(() => import('./reactbits/Magnet.jsx'));
const StarBorder = lazy(() => import('./reactbits/StarBorder.jsx'));
const ClickSpark = lazy(() => import('./reactbits/ClickSpark.jsx'));
const CountUp = lazy(() => import('./reactbits/CountUp.jsx'));
const DecryptedText = lazy(() => import('./reactbits/DecryptedText.jsx'));
const GlareHover = lazy(() => import('./reactbits/GlareHover.jsx'));
const LogoLoop = lazy(() => import('./reactbits/LogoLoop.jsx'));
const ScrollVelocity = lazy(() => import('./reactbits/ScrollVelocity.jsx'));
const AnimatedContent = lazy(() => import('./reactbits/AnimatedContent.jsx'));

const GITHUB = 'https://github.com/iqbalmaulana228';
const LINKEDIN = 'https://www.linkedin.com/in/muhammad-iqbal-maulana228';
const AVATAR = 'https://avatars.githubusercontent.com/u/128332877?v=4';

const menu = [
  { label: 'IDENTITY', children: [
    { value: 'profile', label: 'README.md', icon: '{}' },
    { value: 'stack', label: 'stack.json', icon: '◇' }
  ]},
  { label: 'WORKSPACE', children: [
    { value: 'projects', label: 'repositories', icon: '▤' },
    { value: 'journey', label: 'build.log', icon: '//' }
  ]},
  { label: 'NETWORK', children: [
    { value: 'github', label: 'GitHub profile', icon: '↗' },
    { value: 'contact', label: 'connect', icon: '@' }
  ]}
];

const projects = [
  { id:'docuflow', name:'DocuFlow', kind:'DOCUMENT WORKSPACE', url:GITHUB+'/DocuFlow', live:'https://docuflow-document.hatchable.site', summary:'Browser-local PDF and document workspace with merge, split, page organization, conversion, thumbnails, and live page reordering.', stack:['PDF tools','Browser processing','JavaScript'] },
  { id:'ourplans', name:'OurPlans', kind:'FULL-STACK WORKSPACE', url:GITHUB+'/OurPlans', live:'https://ourplans-git-main-iqbals-projects-2357f242.vercel.app', summary:'Wedding-planning workspace and mobile-first guest concierge with checklist, budget, vendors, RSVP, seating, timeline, calendar, and Gemini-assisted planning.', stack:['Supabase','PostgreSQL','Vercel Functions','Gemini'] },
  { id:'gemclip', name:'Gemclip', kind:'AI MEDIA TOOL', url:GITHUB+'/gemclip', summary:'Local YouTube-to-short-clips workflow. Gemini selects highlights while OpenCV and FFmpeg render vertical, square, and landscape clips.', stack:['Python','Gemini API','OpenCV','FFmpeg'] },
  { id:'wa-extractor', name:'WhatsApp Document Extractor', kind:'DOCUMENT AUTOMATION', url:GITHUB+'/wa-dokumen-extractor-bot', summary:'WhatsApp bot that extracts structured data from Indonesian identity and education documents, with TXT and JSON output.', stack:['Python','OCR','Google Apps Script','JSON'] },
  { id:'finance', name:'Daily Financial Tracker', kind:'MOBILE APP', url:GITHUB+'/daily-financial-tracker', summary:'Offline-first finance app with transaction logs, spending charts, monthly budgets, savings goals, and local device storage.', stack:['React Native','Expo','TypeScript','AsyncStorage'] },
  { id:'handtracking', name:'Hand Tracking Simulation', kind:'COMPUTER VISION LAB', url:GITHUB+'/handtrackingTest', summary:'Real-time hand tracking and anti-gravity experiment using hand landmarks, rubber-band physics, and audiovisual effects.', stack:['Python','OpenCV','MediaPipe','Pygame'] }
];

const stacks = {
  languages:['JavaScript','TypeScript','Python','C++','SQL'],
  web:['HTML','CSS','React','Node.js','Next.js'],
  tooling:['Git','GitHub','VS Code','Vercel','MongoDB']
};


const technologyLoopItems = [
  ...stacks.languages,
  ...stacks.web,
  ...stacks.tooling
].map(label => ({
  title: label,
  ariaLabel: label,
  node: <span className="ds-loop-token"><i>{label.slice(0, 2).toUpperCase()}</i>{label}</span>
}));

const commands = [
  {key:'whoami',name:'/whoami',description:'Show developer profile'},
  {key:'projects',name:'/projects',description:'Jump to selected repositories'},
  {key:'stack',name:'/stack',description:'Inspect the technology stack'},
  {key:'journey',name:'/journey',description:'Open the learning log'},
  {key:'github',name:'/github',description:'Open GitHub profile'},
  {key:'contact',name:'/contact',description:'Show contact links'},
  {key:'help',name:'/help',description:'List available commands'}
];

function goTo(id) {
  document.getElementById('ds-' + id)?.scrollIntoView({behavior:'smooth',block:'start'});
}

function TypewriterText({
  text,
  active = true,
  speed = 48,
  startDelay = 0,
  accentSuffix = '',
  className = ''
}) {
  const elementRef = useRef(null);
  const progressRef = useRef(0);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = elementRef.current;
    if (!active || started || !node) return undefined;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      progressRef.current = text.length + accentSuffix.length;
      setProgress(progressRef.current);
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setStarted(true);
      observer.disconnect();
    }, { threshold: 0.15, rootMargin: '0px 0px -14% 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, started, text, accentSuffix]);

  useEffect(() => {
    const fullLength = text.length + accentSuffix.length;
    if (!active || !started || progressRef.current >= fullLength) return undefined;

    let timer;
    const typeNext = () => {
      const next = Math.min(progressRef.current + 1, fullLength);
      progressRef.current = next;
      setProgress(next);
      if (next < fullLength) timer = setTimeout(typeNext, speed);
    };

    timer = setTimeout(typeNext, startDelay);
    return () => clearTimeout(timer);
  }, [active, started, text, accentSuffix, speed, startDelay]);

  const visible = (text + accentSuffix).slice(0, progress);
  const plainVisible = visible.slice(0, text.length);
  const accentVisible = visible.slice(text.length);
  const complete = progress >= text.length + accentSuffix.length;

  return (
    <span ref={elementRef} className={`ds-typewriter ${className}`.trim()} aria-label={text + accentSuffix}>
      <span className="ds-typewriter-measure" aria-hidden="true">
        {text}<span className="ds-typewriter-accent">{accentSuffix}</span>
      </span>
      <span className="ds-typewriter-output" aria-hidden="true">
        {plainVisible}<span className="ds-typewriter-accent">{accentVisible}</span>
        {started && !complete && <i className="ds-typewriter-caret" />}
      </span>
    </span>
  );
}

const profileLines = [
  {
    text: 'export const developer = {',
    content: <><span className="ds-purple">export const</span> <span className="ds-cyan">developer</span> = {'{'}</>
  },
  {
    text: "  name: 'Muhammad Iqbal Maulana',",
    content: <><span className="ds-key">  name:</span> <span className="ds-string">'Muhammad Iqbal Maulana'</span>,</>
  },
  {
    text: "  github: 'iqbalmaulana228',",
    content: <><span className="ds-key">  github:</span> <span className="ds-string">'iqbalmaulana228'</span>,</>
  },
  {
    text: "  role: 'Informatics Engineering Student',",
    content: <><span className="ds-key">  role:</span> <span className="ds-string">'Informatics Engineering Student'</span>,</>
  },
  {
    text: "  focus: ['Web Apps', 'Automation',",
    content: <><span className="ds-key">  focus:</span> [<span className="ds-string">'Web Apps'</span>, <span className="ds-string">'Automation'</span>,</>
  },
  {
    text: "           'OCR', 'AI Workflows'],",
    content: <>           <span className="ds-string">'OCR'</span>, <span className="ds-string">'AI Workflows'</span>],</>
  },
  {
    text: "  languages: ['JavaScript', 'TypeScript',",
    content: <><span className="ds-key">  languages:</span> [<span className="ds-string">'JavaScript'</span>, <span className="ds-string">'TypeScript'</span>,</>
  },
  {
    text: "               'Python', 'C++', 'SQL'],",
    content: <>               <span className="ds-string">'Python'</span>, <span className="ds-string">'C++'</span>, <span className="ds-string">'SQL'</span>],</>
  },
  {
    text: "  motto: 'Build • Learn • Iterate'",
    content: <><span className="ds-key">  motto:</span> <span className="ds-string">'Build • Learn • Iterate'</span></>
  },
  {
    text: '};',
    content: <>{"}"};</>
  }
];
const profileText = profileLines.map(line => line.text).join('\n');

function CodeWindow({typing, profileProgress}) {
  let offset = 0;
  return (
    <div className="ds-code-window">
      <div className="ds-window-bar">
        <div className="ds-window-lights"><i/><i/><i/></div>
        <span>profile.ts</span><span className="ds-read-only">READ ONLY</span>
      </div>
      <div className="ds-code-content">
        {profileLines.map((line,i)=>{
          const lineStart = offset;
          const visible = Math.min(line.text.length, Math.max(0, profileProgress - lineStart));
          const isTypingLine = profileProgress >= lineStart && profileProgress < lineStart + line.text.length;
          offset += line.text.length + (i < profileLines.length - 1 ? 1 : 0);
          return (
            <div className="ds-code-line" key={i}>
              <span className="ds-line-number">{String(i+1).padStart(2,'0')}</span>
              <span className="ds-code-typing-clip" style={{width:`${visible + (isTypingLine ? 1 : 0)}ch`}}>
                <code>{line.content}</code>
                {isTypingLine && <i className="ds-profile-caret"/>}
              </span>
            </div>
          );
        })}
      </div>
      <div className="ds-code-terminal"><b>iqbal@github:~$</b><span>{typing.area === 'code' ? typing.text : ''}</span>{typing.area === 'code' && typing.text && <i className="ds-caret"/>}</div>
    </div>
  );
}

export default function DarkSidePortfolio({active = true}) {
  const [typing,setTyping]=useState({area:'',text:''});
  const [profileProgress,setProfileProgress]=useState(0);
  const profileProgressRef=useRef(0);
  const [indexing,setIndexing]=useState(true);
  const [stackGroup,setStackGroup]=useState('languages');
  const [selected,setSelected]=useState(null);
  const [output,setOutput]=useState('Type /help and press Enter to inspect available commands.');

  useEffect(()=>{
    if(!active) return undefined;
    const sequence=[
      {area:'hero',text:'I build tools that solve real problems.'},
      {area:'code',text:'git status --short'},
      {area:'journey',text:'build -> test -> iterate'}
    ];
    let sequenceIndex=0,position=0,deleting=false,timer;

    const tickSequence=()=>{
      const current=sequence[sequenceIndex];
      if(!deleting){
        position=Math.min(position+1,current.text.length);
        setTyping({area:current.area,text:current.text.slice(0,position)});
        if(position===current.text.length){deleting=true;timer=setTimeout(tickSequence,1900);return;}
        timer=setTimeout(tickSequence,78);
        return;
      }
      position=Math.max(0,position-1);
      setTyping({area:current.area,text:current.text.slice(0,position)});
      if(position===0){
        deleting=false;
        sequenceIndex=(sequenceIndex+1)%sequence.length;
        timer=setTimeout(tickSequence,1050);
        return;
      }
      timer=setTimeout(tickSequence,38);
    };

    const typeProfile=()=>{
      const currentProgress=profileProgressRef.current;
      if(currentProgress>=profileText.length){
        timer=setTimeout(tickSequence,1400);
        return;
      }
      const nextProgress=currentProgress+1;
      profileProgressRef.current=nextProgress;
      setProfileProgress(nextProgress);
      const typedCharacter=profileText[currentProgress];
      timer=setTimeout(typeProfile,typedCharacter==='\n'?380:42);
    };

    if(profileProgressRef.current<profileText.length){
      setTyping({area:'',text:''});
      timer=setTimeout(typeProfile,3200);
    }else{
      timer=setTimeout(tickSequence,700);
    }
    return ()=>clearTimeout(timer);
  },[active]);

  useEffect(()=>{
    if(!active) return undefined;
    setIndexing(true);
    const timer=setTimeout(()=>setIndexing(false),1700);
    return ()=>clearTimeout(timer);
  },[active]);

  const chooseMenu=value=>{
    if(value==='github'){window.open(GITHUB,'_blank','noopener,noreferrer');return;}
    goTo(value);
  };

  const runCommand=command=>{
    const token=command.trim().toLowerCase().split(/\s+/)[0].replace(/^\/+/, '');
    const sections={whoami:'profile',profile:'profile',projects:'projects',stack:'stack',journey:'journey',contact:'contact'};
    if(token==='github'||token==='gh'){setOutput('Opening github.com/iqbalmaulana228 ...');window.open(GITHUB,'_blank','noopener,noreferrer');return;}
    if(token==='help'){setOutput('Commands: /whoami  /projects  /stack  /journey  /github  /contact');return;}
    if(sections[token]){setOutput('OK: navigating to /ds-'+sections[token]);goTo(sections[token]);return;}
    setOutput('Command not found: '+(token||'(empty)')+'. Try /help.');
  };

  const folderActions=[{value:'source',label:'OPEN SOURCE ↗'},{value:'details',label:'PROJECT NOTES'}];

  return (
    <div className="dark-side-portfolio">
      <div className="ds-background-grid" aria-hidden="true"/>
      <div className="ds-scanlines" aria-hidden="true"/>
      <header className="ds-topbar">
        <a className="ds-logo" href="#ds-profile" onClick={e=>{e.preventDefault();goTo('profile');}}>
          <span className="ds-logo-mark">IM</span><span>IQBAL<span className="ds-logo-suffix">.EXE</span></span>
        </a>
        <div className="ds-topbar-center"><i/> ALTERNATE PROFILE // GITHUB SIDE</div>
        <a className="ds-github-link" href={GITHUB} target="_blank" rel="noreferrer"><span>GH</span>@iqbalmaulana228<b>↗</b></a>
      </header>

      <div className="ds-shell">
        <aside className="ds-sidebar">
          <div className="ds-sidebar-profile">
            <div className="ds-avatar-frame"><img src={AVATAR} alt="GitHub avatar for Muhammad Iqbal Maulana"/><i/><b/></div>
            <div className="ds-side-identity"><strong>iqbalmaulana228</strong><span>USER / 001</span></div>
          </div>
          <div className="ds-sidebar-label">FILE TREE <span>~/portfolio</span></div>
          <Suspense fallback={<div className="ds-loading">Loading navigation...</div>}>
            <BranchedMenu items={menu} defaultOpen={0} color="#b8c5d5" accentColor="#86c9fc" lineColor="#24374a" width={230} rowHeight={35} indent={45} fontSize={12} className="ds-branched-menu" onSelect={chooseMenu}/>
          </Suspense>
          <div className="ds-sidebar-card">
            <small>CURRENT STATE</small>
            <b className="ds-decrypted-host">
              {active ? <Suspense fallback="Always learning."><DecryptedText text="Always learning." speed={42} maxIterations={11} sequential animateOn="view" scrambleColor="#86c9fc" className="ds-decrypted-visible" encryptedClassName="ds-decrypted-scramble"/></Suspense> : "Always learning."}
            </b>
            <span>Shipping practical digital tools.</span>
            <div className="ds-side-progress"><i/></div>
            <small>BUILD / TEST / ITERATE</small>
          </div>
          <a className="ds-back-link" href={LINKEDIN} target="_blank" rel="noreferrer">PROFESSIONAL PROFILE ↗</a>
        </aside>

        <main className="ds-main">
          <section className="ds-hero" id="ds-profile">
            <div className="ds-hero-copy">
              <div className="ds-eyebrow"><b>01</b> <TypewriterText text="WHOAMI · DEVELOPER PROFILE" active={active} speed={48} startDelay={120}/></div>
              <h1><TypewriterText text="HELLO," active={active} speed={68} startDelay={1050}/><br/><span><TypewriterText text="WORLD_" active={active} speed={68} startDelay={1740}/></span></h1>
              <div className="ds-role">MUHAMMAD IQBAL MAULANA</div>
              <p className="ds-description">Informatics Engineering student exploring software development, web applications, automation, OCR, and AI-assisted workflows. I build practical tools to turn everyday problems into usable software.</p>
              <div className="ds-type-line"><b>~/</b><span>{typing.area === 'hero' ? typing.text : ''}</span>{typing.area === 'hero' && typing.text && <i className="ds-caret"/>}</div>
              {active ? (
                <div className="ds-actions">
                  <Suspense fallback={<button onClick={()=>goTo('projects')} className="ds-primary">EXPLORE REPOSITORIES <b>↘</b></button>}>
                    <ClickSpark
                      sparkColor={['#86c9fc','#7286ff']}
                      sparkSize={8}
                      sparkRadius={24}
                      sparkCount={9}
                      duration={460}
                      shape="star"
                      ring
                      glow={0.38}
                      className="ds-primary-spark"
                      style={{display:'inline-flex',width:'auto',height:'auto',overflow:'visible'}}
                    >
                      <StarBorder
                        as="button"
                        onClick={()=>goTo('projects')}
                        className="ds-star-cta"
                        color="#86c9fc"
                        trailColor="#7286ff"
                        duration={3.8}
                        thickness={1}
                        radius={7}
                        trailLength={0.27}
                        stars={2}
                        glow={0.45}
                        sparkle
                        hover="brighten"
                        theme="dark"
                        backgroundColor="#101b31"
                        textColor="#e4f2ff"
                        borderColor="#30466b"
                      >
                        EXPLORE REPOSITORIES <b>↘</b>
                      </StarBorder>
                    </ClickSpark>
                  </Suspense>
                  <Suspense fallback={<a href={GITHUB} target="_blank" rel="noreferrer" className="ds-secondary">GITHUB PROFILE ↗</a>}>
                    <Magnet padding={42} magnetStrength={4} maxOffset={8} tilt={2.2} scale={1.025} wrapperClassName="ds-magnet-wrap" innerClassName="ds-magnet-inner">
                      <a href={GITHUB} target="_blank" rel="noreferrer" className="ds-secondary">GITHUB PROFILE ↗</a>
                    </Magnet>
                  </Suspense>
                </div>
              ) : (
                <div className="ds-actions">
                  <button onClick={()=>goTo('projects')} className="ds-primary">EXPLORE REPOSITORIES <b>↘</b></button>
                  <a href={GITHUB} target="_blank" rel="noreferrer" className="ds-secondary">GITHUB PROFILE ↗</a>
                </div>
              )}
              {active ? (
                <Suspense fallback={null}>
                  <div className="ds-stat-strip" aria-label="Portfolio summary">
                    <div className="ds-stat-card"><strong><CountUp to={projects.length} duration={1.7} suffix=""/></strong><span>SELECTED BUILDS</span></div>
                    <div className="ds-stat-card"><strong><CountUp to={stacks.languages.length} duration={1.8} suffix=""/></strong><span>LANGUAGES</span></div>
                    <div className="ds-stat-card"><strong><CountUp to={Object.keys(stacks).length} duration={1.9} suffix=""/></strong><span>STACK GROUPS</span></div>
                  </div>
                </Suspense>
              ) : null}
              <div className="ds-thought">
                <Suspense fallback={<span className="ds-loading">INDEXING PROFILE DATA...</span>}>
                  <ThoughtLine label="INDEXING LOCAL PROFILE DATA" doneLabel="PROFILE SNAPSHOT READY" glyph="dot" steps={['Profile README mapped','Selected repositories indexed','Technology stack categorized']} working={indexing} collapseOnSettle={false} showTimer={false} color="#9aaebe" glyphColor="#86c9fc" fontSize={11} shimmer settleDuration={420} className="ds-thought-line"/>
                </Suspense>
              </div>
            </div>
            <div className="ds-hero-visual">
              <div className="ds-pixel-orbit"><i/><i/><i/></div><div className="ds-code-tag">PROFILE OBJECT // TS</div>
              {active ? (
                <Suspense fallback={<CodeWindow typing={typing} profileProgress={profileProgress}/>}>
                  <SpotlightCard
                    className="ds-code-spotlight"
                    spotlightColor="#86c9fc"
                    intensity={0.23}
                    spotlightSize={205}
                    softness={0.72}
                    proximity={65}
                    smoothing={0.28}
                    borderGlow={0.45}
                    flare
                    theme="dark"
                  >
                    <CodeWindow typing={typing} profileProgress={profileProgress}/>
                  </SpotlightCard>
                </Suspense>
              ) : <CodeWindow typing={typing} profileProgress={profileProgress}/>}
              <div className="ds-sticker"><b>01</b><span>BUILD<br/>MODE</span><i>ON</i></div>
            </div>
          </section>

          <section className="ds-section" id="ds-stack">
            <div className="ds-section-heading"><div><small><TypewriterText text="02 / STACK.JSON" active={active} speed={42}/></small><h2><TypewriterText text="TOOLS OF THE TRADE" accentSuffix="_" active={active} speed={52} startDelay={420}/></h2></div><p><TypewriterText text="Technologies and platforms listed in my GitHub profile README." active={active} speed={24} startDelay={930}/></p></div>
            <div className="ds-stack-controls"><span>SELECT NODE</span>
              <Suspense fallback={<div className="ds-loading">Loading selector...</div>}>
                <RubberSegment items={[{value:'languages',label:'LANGUAGES'},{value:'web',label:'WEB'},{value:'tooling',label:'TOOLING'}]} value={stackGroup} onChange={setStackGroup} trackColor="#101a25" thumbColor="#86c9fc" textColor="#8ca0b2" activeTextColor="#0a1534" size="sm" radius={5} stretch={115} squash={4} className="ds-rubber-segment" aria-label="Technology categories"/>
              </Suspense>
            </div>
            <div className="ds-tech-grid" key={stackGroup}>
              {stacks[stackGroup].map((item,i)=><div className="ds-tech-chip" key={item} style={{'--chip-index':i}}><i/>{item}</div>)}
            </div>
            {active ? (
              <Suspense fallback={null}>
                <div className="ds-tech-loop-shell">
                  <small>TECH STACK / DRAG OR HOVER TO EXPLORE</small>
                  <LogoLoop
                    logos={technologyLoopItems}
                    speed={42}
                    direction="left"
                    logoHeight={24}
                    gap={30}
                    pauseOnHover
                    fadeOut
                    fadeOutWidth={0.08}
                    scaleOnHover
                    draggable={false}
                    intro={false}
                    ariaLabel="Technology stack"
                    className="ds-tech-loop"
                    style={{color:'#a9cfff'}}
                  />
                </div>
              </Suspense>
            ) : null}
            <p className="ds-stack-note"><b>package.json</b> // Familiar tools. New combinations. Constant iteration.</p>
          </section>

          <section className="ds-section" id="ds-projects">
            <div className="ds-section-heading"><div><small><TypewriterText text="03 / REPOSITORIES" active={active} speed={42}/></small><h2><TypewriterText text="SELECTED BUILDS" accentSuffix="_" active={active} speed={52} startDelay={420}/></h2></div><p><TypewriterText text="A sample of public projects and experiments from my GitHub account." active={active} speed={24} startDelay={930}/></p></div>
            <div className="ds-project-grid">
              {projects.map((project,i)=><article className="ds-project-card" key={project.id} style={{'--project-index':i}}>
                <div className="ds-project-top"><span>{project.kind}</span><b>{String(i+1).padStart(2,'0')}</b></div>
                <Suspense fallback={<div className="ds-loading">Opening repository folder...</div>}>
                  <FolderFloat items={folderActions} label={project.name} sublabel={project.stack.slice(0,2).join(' / ')} trigger="click" closeOnSelect physics={false} folderColor="#14283a" frontColor="#18374a" paperColor="#86c9fc" itemColor="#e1ecff" itemTextColor="#0a142c" labelColor="#e8f1ff" width={188} height={110} spread={105} lift={22} tilt={5} stagger={50} className="ds-folder-float" onSelect={value=>{if(value==='source')window.open(project.url,'_blank','noopener,noreferrer');else setSelected(project);}}/>
                </Suspense>
                <p className="ds-project-summary">{project.summary}</p>
                <div className="ds-project-stack">{project.stack.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div>
              </article>)}
            </div>
            {selected&&<div className="ds-project-detail"><div><small>PROJECT NOTES / {selected.id.toUpperCase()}</small><h3>{selected.name}</h3><p>{selected.summary}</p></div><div className="ds-detail-actions">{selected.live&&<a href={selected.live} target="_blank" rel="noreferrer">LIVE BUILD ↗</a>}<a href={selected.url} target="_blank" rel="noreferrer">SOURCE ↗</a><button onClick={()=>setSelected(null)} aria-label="Close project notes">×</button></div></div>}
            <a className="ds-all-repos" href={GITHUB+'?tab=repositories'} target="_blank" rel="noreferrer">OPEN ALL REPOSITORIES ↗</a>
          </section>

          <section className="ds-section" id="ds-journey">
            <div className="ds-section-heading"><div><small><TypewriterText text="04 / BUILD.LOG" active={active} speed={42}/></small><h2><TypewriterText text="LEARNING IN PUBLIC" accentSuffix="_" active={active} speed={52} startDelay={420}/></h2></div><p><TypewriterText text="Curiosity moves between application development, data, automation, and intelligent tools." active={active} speed={24} startDelay={930}/></p></div>
            {active ? (
              <Suspense fallback={<div className="ds-journey-grid">
                <article><small>TRACK_01</small><h3>APPLICATIONS</h3><p>Building browser-based tools, productivity apps, and full-stack workspaces.</p><code>web / mobile / full-stack</code></article>
                <article><small>TRACK_02</small><h3>AUTOMATION</h3><p>Reducing manual work through document processing, OCR, data transformation, and workflow automation.</p><code>ocr / extraction / workflow</code></article>
                <article><small>TRACK_03</small><h3>AI EXPERIMENTS</h3><p>Exploring AI-assisted media workflows, transcript processing, computer vision, and useful integrations.</p><code>gemini / opencv / ai tools</code></article>
              </div>}>
                <AnimatedContent className="ds-journey-reveal" trigger="scroll" once distance={28} duration={0.78} blur={2} stagger={0.13} threshold={0.12}>
                  <div className="ds-journey-grid">
                    <GlareHover width="100%" height="100%" background="#0b141e" borderColor="#263d56" borderRadius="3px" glareColor="#86c9fc" glareOpacity={0.18} glareSize={25} softness={0.72} variant="sheen" className="ds-journey-glare">
                      <article><small>TRACK_01</small><h3>APPLICATIONS</h3><p>Building browser-based tools, productivity apps, and full-stack workspaces.</p><code>web / mobile / full-stack</code></article>
                    </GlareHover>
                    <GlareHover width="100%" height="100%" background="#0b141e" borderColor="#263d56" borderRadius="3px" glareColor="#86c9fc" glareOpacity={0.18} glareSize={25} softness={0.72} variant="sheen" className="ds-journey-glare">
                      <article><small>TRACK_02</small><h3>AUTOMATION</h3><p>Reducing manual work through document processing, OCR, data transformation, and workflow automation.</p><code>ocr / extraction / workflow</code></article>
                    </GlareHover>
                    <GlareHover width="100%" height="100%" background="#0b141e" borderColor="#263d56" borderRadius="3px" glareColor="#86c9fc" glareOpacity={0.18} glareSize={25} softness={0.72} variant="sheen" className="ds-journey-glare">
                      <article><small>TRACK_03</small><h3>AI EXPERIMENTS</h3><p>Exploring AI-assisted media workflows, transcript processing, computer vision, and useful integrations.</p><code>gemini / opencv / ai tools</code></article>
                    </GlareHover>
                  </div>
                </AnimatedContent>
              </Suspense>
            ) : (
              <div className="ds-journey-grid" aria-hidden="true"/>
            )}
            <div className="ds-build-prompt"><b>~/build.log $</b><span>{typing.area === 'journey' ? typing.text : ''}</span>{typing.area === 'journey' && typing.text && <i className="ds-caret"/>}</div>
            {active && (
              <Suspense fallback={null}>
                <div className="ds-scroll-velocity-shell" aria-label="Build philosophy ticker">
                  <small>DEVELOPMENT LOOP / CONTINUOUS</small>
                  <ScrollVelocity
                    texts={['BUILD / TEST / ITERATE', 'DOCUMENTS / AUTOMATION / AI']}
                    velocity={34}
                    damping={48}
                    stiffness={360}
                    numCopies={4}
                    pauseOnHover
                    fadeEdges
                    skewWithVelocity={0.35}
                    scaleWithVelocity={0.035}
                    outlineAlternate
                    gap={40}
                    fontSize="clamp(13px, 1.7vw, 21px)"
                    fontWeight={700}
                    color="#86c9fc"
                    className="ds-velocity-text"
                    parallaxClassName="ds-velocity-parallax"
                    scrollerClassName="ds-velocity-scroller"
                  />
                </div>
              </Suspense>
            )}
            <div className="ds-principle"><b>{'<>'}</b><div><strong>BUILD • LEARN • ITERATE</strong><p>Start with a problem. Build a working version. Test it. Improve the next one.</p></div><small>EOF</small></div>
          </section>

          <section className="ds-section" id="ds-contact">
            <div className="ds-section-heading"><div><small><TypewriterText text="05 / ENDPOINTS" active={active} speed={42}/></small><h2><TypewriterText text="CONNECT TO THE REPO" accentSuffix="_" active={active} speed={52} startDelay={420}/></h2></div><p><TypewriterText text="Open source work, technical discussions, or opportunities to build something useful." active={active} speed={24} startDelay={930}/></p></div>
            <div className="ds-contact-links">
              <a href={GITHUB} target="_blank" rel="noreferrer"><b>GH</b><span><small>GITHUB</small><strong>iqbalmaulana228</strong></span><i>↗</i></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer"><b>in</b><span><small>LINKEDIN</small><strong>Professional profile</strong></span><i>↗</i></a>
            </div>
            <div className="ds-terminal">
              <div className="ds-terminal-heading"><span>TERMINAL / COMMAND PALETTE</span><b>● ONLINE</b></div>
              <Suspense fallback={<div className="ds-loading">Loading command prompt...</div>}>
                <PromptBar placeholder="Try /projects, /stack, /github..." commands={commands} sources={[]} models={[]} efforts={[]} onSend={runCommand} background="#08111a" color="#dceaff" menuBackground="#16213e" sparkColor="#86c9fc" width={720} radius={7} maxRows={3} className="ds-prompt-bar"/>
              </Suspense>
              <div className="ds-command-output"><b>↳</b> {output}</div>
            </div>
          </section>

          <footer className="ds-footer"><span>© {new Date().getFullYear()} MUHAMMAD IQBAL MAULANA</span><span>BUILT WITH CURIOSITY <b>◆</b> POWERED BY REACT BITS</span><a href={GITHUB} target="_blank" rel="noreferrer">GITHUB ↗</a></footer>
        </main>
      </div>
    </div>
  );
}
