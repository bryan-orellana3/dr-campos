import React from 'react';

/** Hover tooltip. Wraps its child; shows navy bubble above. */
export function Tooltip({ text, children, style }) {
  const [show, setShow] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
    >
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--dc-navy-800)', color: '#fff', font: 'var(--type-caption)',
          padding: '7px 12px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap',
          boxShadow: 'var(--shadow-md)', zIndex: 100, pointerEvents: 'none',
        }}>
          {text}
        </span>
      )}
    </span>
  );
}
