import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './DarkSidePortfolio.css';

const BranchedMenu = lazy(() => import('./reactbits/BranchedMenu.jsx'));
const FolderFloat = lazy(() => import('./reactbits/FolderFloat.jsx'));
const ThoughtLine = lazy(() => import('./reactbits/ThoughtLine.jsx'));
const PromptBar = lazy(() => import('./reactbits/PromptBar.jsx'));
const RubberSegment = lazy(() => import('./reactbits/RubberSegment.jsx'));

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
      timer=setTimeout(typeProfile,650);
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
          <div className="ds-sidebar-card"><small>CURRENT STATE</small><b>Always learning.</b><span>Shipping practical digital tools.</span><div className="ds-side-progress"><i/></div><small>BUILD / TEST / ITERATE</small></div>
          <a className="ds-back-link" href={LINKEDIN} target="_blank" rel="noreferrer">PROFESSIONAL PROFILE ↗</a>
        </aside>

        <main className="ds-main">
          <section className="ds-hero" id="ds-profile">
            <div className="ds-hero-copy">
              <div className="ds-eyebrow"><b>01</b> WHOAMI <i>·</i> DEVELOPER PROFILE</div>
              <h1>HELLO,<br/><span>WORLD_</span></h1>
              <div className="ds-role">MUHAMMAD IQBAL MAULANA</div>
              <p className="ds-description">Informatics Engineering student exploring software development, web applications, automation, OCR, and AI-assisted workflows. I build practical tools to turn everyday problems into usable software.</p>
              <div className="ds-type-line"><b>~/</b><span>{typing.area === 'hero' ? typing.text : ''}</span>{typing.area === 'hero' && typing.text && <i className="ds-caret"/>}</div>
              <div className="ds-actions">
                <button onClick={()=>goTo('projects')} className="ds-primary">EXPLORE REPOSITORIES <b>↘</b></button>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="ds-secondary">GITHUB PROFILE ↗</a>
              </div>
              <div className="ds-thought">
                <Suspense fallback={<span className="ds-loading">INDEXING PROFILE DATA...</span>}>
                  <ThoughtLine label="INDEXING LOCAL PROFILE DATA" doneLabel="PROFILE SNAPSHOT READY" glyph="dot" steps={['Profile README mapped','Selected repositories indexed','Technology stack categorized']} working={indexing} collapseOnSettle={false} showTimer={false} color="#9aaebe" glyphColor="#86c9fc" fontSize={11} shimmer settleDuration={420} className="ds-thought-line"/>
                </Suspense>
              </div>
            </div>
            <div className="ds-hero-visual">
              <div className="ds-pixel-orbit"><i/><i/><i/></div><div className="ds-code-tag">PROFILE OBJECT // TS</div>
              <CodeWindow typing={typing} profileProgress={profileProgress}/>
              <div className="ds-sticker"><b>01</b><span>BUILD<br/>MODE</span><i>ON</i></div>
            </div>
          </section>

          <section className="ds-section" id="ds-stack">
            <div className="ds-section-heading"><div><small>02 / STACK.JSON</small><h2>TOOLS OF THE TRADE<span>_</span></h2></div><p>Technologies and platforms listed in my GitHub profile README.</p></div>
            <div className="ds-stack-controls"><span>SELECT NODE</span>
              <Suspense fallback={<div className="ds-loading">Loading selector...</div>}>
                <RubberSegment items={[{value:'languages',label:'LANGUAGES'},{value:'web',label:'WEB'},{value:'tooling',label:'TOOLING'}]} value={stackGroup} onChange={setStackGroup} trackColor="#101a25" thumbColor="#86c9fc" textColor="#8ca0b2" activeTextColor="#0a1534" size="sm" radius={5} stretch={115} squash={4} className="ds-rubber-segment" aria-label="Technology categories"/>
              </Suspense>
            </div>
            <div className="ds-tech-grid" key={stackGroup}>
              {stacks[stackGroup].map((item,i)=><div className="ds-tech-chip" key={item} style={{'--chip-index':i}}><i/>{item}</div>)}
            </div>
            <p className="ds-stack-note"><b>package.json</b> // Familiar tools. New combinations. Constant iteration.</p>
          </section>

          <section className="ds-section" id="ds-projects">
            <div className="ds-section-heading"><div><small>03 / REPOSITORIES</small><h2>SELECTED BUILDS<span>_</span></h2></div><p>A sample of public projects and experiments from my GitHub account.</p></div>
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
            <div className="ds-section-heading"><div><small>04 / BUILD.LOG</small><h2>LEARNING IN PUBLIC<span>_</span></h2></div><p>Curiosity moves between application development, data, automation, and intelligent tools.</p></div>
            <div className="ds-journey-grid">
              <article><small>TRACK_01</small><h3>APPLICATIONS</h3><p>Building browser-based tools, productivity apps, and full-stack workspaces.</p><code>web / mobile / full-stack</code></article>
              <article><small>TRACK_02</small><h3>AUTOMATION</h3><p>Reducing manual work through document processing, OCR, data transformation, and workflow automation.</p><code>ocr / extraction / workflow</code></article>
              <article><small>TRACK_03</small><h3>AI EXPERIMENTS</h3><p>Exploring AI-assisted media workflows, transcript processing, computer vision, and useful integrations.</p><code>gemini / opencv / ai tools</code></article>
            </div>
            <div className="ds-build-prompt"><b>~/build.log $</b><span>{typing.area === 'journey' ? typing.text : ''}</span>{typing.area === 'journey' && typing.text && <i className="ds-caret"/>}</div>
            <div className="ds-principle"><b>{'<>'}</b><div><strong>BUILD • LEARN • ITERATE</strong><p>Start with a problem. Build a working version. Test it. Improve the next one.</p></div><small>EOF</small></div>
          </section>

          <section className="ds-section" id="ds-contact">
            <div className="ds-section-heading"><div><small>05 / ENDPOINTS</small><h2>CONNECT TO THE REPO<span>_</span></h2></div><p>Open source work, technical discussions, or opportunities to build something useful.</p></div>
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
