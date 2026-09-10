import React from 'react';

/** Removable/selectable content tag (sentence case, unlike Badge). */
export function Tag({ selected = false, onClick, onRemove, children, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        font: 'var(--type-body-sm)', fontWeight: 600,
        color: selected ? '#fff' : 'var(--dc-royal-600)',
        background: selected ? 'var(--accent-primary)' : hover && onClick ? 'var(--surface-wash)' : 'var(--dc-white)',
        border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-pill)', padding: '7px 14px',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--duration-fast) var(--ease-out)',
        ...style,
      }}
    >
      {children}
      {onRemove && (
        <svg onClick={(e) => { e.stopPropagation(); onRemove(); }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 12, height: 12, cursor: 'pointer' }}>
          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </span>
  );
}
