import { useRef, useState } from 'react';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56m11.02 11.02 1.56 1.56M2 12h2.2m15.6 0H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2 15.1A8.6 8.6 0 0 1 8.9 3.8 8.8 8.8 0 1 0 20.2 15.1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m16.7 3.3.45 1.45 1.45.45-1.45.45-.45 1.45-.45-1.45-1.45-.45 1.45-.45.45-1.45Z" fill="currentColor" />
    </svg>
  );
}

export default function SlingThemeButton({ isDark, onToggle }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPulling, setIsPulling] = useState(false);
  const dragRef = useRef(null);

  const pullCenterX = 75 + offset.x;
  const pullCenterY = 75 + offset.y;
  const controlX = 75 + offset.x * 0.42 - offset.y * 0.12;
  const controlY = 75 + offset.y * 0.42 + offset.x * 0.12 + 14;

  const handlePointerDown = event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsPulling(true);
  };

  const handlePointerMove = event => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const rawX = event.clientX - drag.startX;
    const rawY = event.clientY - drag.startY;
    const distance = Math.hypot(rawX, rawY);
    const scale = distance > 76 ? 76 / distance : 1;
    setOffset({
      x: Math.max(-76, Math.min(0, rawX * scale)),
      y: Math.max(-76, Math.min(0, rawY * scale)),
    });
  };

  const finishPull = shouldFire => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsPulling(false);
    setOffset({ x: 0, y: 0 });
    if (shouldFire) onToggle();
  };

  const handlePointerUp = event => {
    if (dragRef.current?.pointerId === event.pointerId) finishPull(true);
  };

  const handlePointerCancel = event => {
    if (dragRef.current?.pointerId === event.pointerId) finishPull(false);
  };

  const handleClick = event => {
    if (event.detail === 0) onToggle();
  };

  return (
    <div className="sling-theme-dock">
      <svg className="sling-theme-tether" viewBox="0 0 150 150" aria-hidden="true">
        {isPulling && (
          <>
            <path d={`M75 75 Q ${controlX} ${controlY} ${pullCenterX} ${pullCenterY}`} />
            <circle cx="75" cy="75" r="3.2" />
            <circle cx={pullCenterX} cy={pullCenterY} r="2.2" />
          </>
        )}
      </svg>
      <span className="sling-theme-hint">PULL &amp; RELEASE TO SWITCH</span>
      <button
        type="button"
        className="sling-theme-button"
        data-pulling={isPulling}
        aria-label={isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
        aria-pressed={isDark}
        title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
      >
        <span className="sling-theme-icon">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </span>
      </button>
    </div>
  );
}
