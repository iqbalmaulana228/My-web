import SlingButton from './reactbits/SlingButton.jsx';
import './SlingThemeButton.css';

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
  return (
    <div className="theme-switcher-dock">
      <span className="theme-switcher-hint" aria-hidden="true">{isDark ? 'RETURN TO LIGHT SIDE' : 'ENTER DARK SIDE'}</span>
      <SlingButton
        onSend={onToggle}
        padColor={isDark ? '#17243c' : '#f5f5f5'}
        iconColor={isDark ? '#ffc72c' : '#140a9a'}
        accentColor="#ffc72c"
        wellColor={isDark ? '#0b1120' : '#e2e8f0'}
        bandColor={isDark ? '#a6a1ff' : '#140a9a'}
        size={56}
        strokeWidth={3}
        armAt={48}
        maxPull={160}
        launchSpeed={2600}
        recoil={0.2}
        flight={120}
        particles={14}
        spread={60}
        axis="any"
        tapSends={false}
        disabled={false}
        ariaLabel={isDark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'}
        className="theme-switcher-sling"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </SlingButton>
    </div>
  );
}
