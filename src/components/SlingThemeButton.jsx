import { useRef, useState } from 'react';
import './SlingButton.css';

function SunIcon(){return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
function MoonIcon(){return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 15.1A8.6 8.6 0 0 1 8.9 3.8 8.8 8.8 0 1 0 20.2 15.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}

export default function SlingThemeButton({isDark,onToggle}){
 const [offset,setOffset]=useState({x:0,y:0}); const [held,setHeld]=useState(false); const [armed,setArmed]=useState(false);
 const drag=useRef(null); const [burst,setBurst]=useState(false); const timer=useRef(null);
 const down=e=>{if(e.button!==0)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};setHeld(true)};
 const move=e=>{if(!drag.current||drag.current.id!==e.pointerId)return;let dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;const d=Math.hypot(dx,dy),max=90;if(d>max){dx*=max/d;dy*=max/d;}if(Math.hypot(dx,dy)>8)drag.current.moved=true;setOffset({x:dx,y:dy});setArmed(Math.hypot(dx,dy)>48)};
 const end=e=>{if(!drag.current||drag.current.id!==e.pointerId)return;const moved=drag.current.moved,fire=moved&&Math.hypot(offset.x,offset.y)>48;drag.current=null;setHeld(false);setArmed(false);setOffset({x:0,y:0});if(fire){setBurst(true);onToggle();clearTimeout(timer.current);timer.current=setTimeout(()=>setBurst(false),500)}};
 const click=e=>{if(e.detail===0){onToggle();setBurst(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setBurst(false),500)}};
 return <div className="sling-theme-dock"><span className="sling-theme-hint">DRAG &amp; RELEASE TO SWITCH</span>
 <SlingButton padColor={isDark?'#dbeafe':'#f5f5f5'} iconColor={isDark?'#111827':'#18181b'} accentColor="#ffc72c" wellColor={isDark?'#140a9a':'#27272a'} bandColor={isDark?'#a6a1ff':'#52525b'} size={56} strokeWidth={3} armAt={48} maxPull={160} launchSpeed={2600} recoil={0.2} flight={120} particles={14} spread={60} axis="any" tapSends={false} disabled={false} onSend={onToggle} held={held} armed={armed} offset={offset} onPointerDown={down} onPointerMove={move} onPointerUp={end} onClick={click} burst={burst}>{isDark?<SunIcon/>:<MoonIcon/>}</SlingButton></div>;
}
function SlingButton({children,padColor,iconColor,accentColor,wellColor,bandColor,size,strokeWidth,disabled,onSend,held,armed,offset,onPointerDown,onPointerMove,onPointerUp,onClick,burst}){
 return <span className="sling-button" style={{'--sl-size':size+'px','--sl-svg':'90px','--sl-pad':padColor,'--sl-icon':iconColor,'--sl-accent':accentColor,'--sl-well':wellColor,'--sl-band':bandColor,'--sl-stroke':strokeWidth+'px'}}>
 <svg className="sling-button__fx" viewBox="0 0 90 90" aria-hidden="true"><circle className="sling-button__well" cx="45" cy="45" r="33"/><path className="sling-button__band" d={held? 'M45 45 Q 30 60 45 45':''}/><circle className="sling-button__arc" cx="45" cy="45" r="36"/></svg>
 {Array.from({length:14},(_,i)=><span key={i} className={'sling-button__dot'+(burst?' sling-button__dot--burst':'')} style={{'--dot-angle':(i*360/14)+'deg'}}/> )}
 <span className="sling-button__move" style={{transform:held?'translate('+offset.x+'px,'+offset.y+'px)':'translate(0,0)'}}><button type="button" className="sling-button__pad" aria-label={children.type===SunIcon?'Aktifkan tema terang':'Aktifkan tema gelap'} aria-disabled={disabled} data-held={held||undefined} data-armed={armed||undefined} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClick={onClick}><span className="sling-button__face"><span className="sling-button__icon">{children}</span></span></button></span></span>;
}