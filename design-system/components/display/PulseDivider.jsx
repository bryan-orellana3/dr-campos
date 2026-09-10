import React from 'react';

/** The brand's EKG heartbeat rule — one blip on a thin line. Use as section divider. */
export function PulseDivider({ onDark = false, width = '100%', align = 'center', style }) {
  const id = React.useId().replace(/:/g, '');
  const blipX = { left: 120, center: 300, right: 480 }[align];
  const p = blipX;
  return (
    <svg viewBox="0 0 640 24" fill="none" preserveAspectRatio="none"
      style={{ width, height: 24, display: 'block', filter: onDark ? 'drop-shadow(0 0 6px rgba(62,205,232,0.7))' : 'none', ...style }}>
      <path
        d={`M0 12 H${p - 20} L${p - 4} 12 ${p + 4} 3 ${p + 16} 21 ${p + 26} 12 H640`}
        stroke={onDark ? 'var(--dc-pulse-400)' : `url(#${id})`}
        strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
      ></path>
      <defs>
        <linearGradient id={id} x1="0" x2="640" gradientUnits="userSpaceOnUse">
          <stop stopColor="#02325A"></stop><stop offset="1" stopColor="#4FA8E0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}
