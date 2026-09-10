import React from 'react';

/** Horizontal tabs with animated underline. items: [{id, label}] */
export function Tabs({ items = [], activeId, onChange, onDark = false, style }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${onDark ? 'var(--border-on-dark)' : 'var(--border-subtle)'}`, ...style }}>
      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <button
            key={it.id}
            onClick={() => onChange && onChange(it.id)}
            style={{
              font: `${active ? 700 : 500} 15px/1 var(--font-body)`,
              color: active ? (onDark ? '#fff' : 'var(--dc-royal-600)') : (onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)'),
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 16px', position: 'relative',
              transition: 'color var(--duration-fast) var(--ease-out)',
            }}
          >
            {it.label}
            <span style={{
              position: 'absolute', left: 12, right: 12, bottom: -1, height: 2, borderRadius: 2,
              background: active ? (onDark ? 'var(--dc-pulse-400)' : 'var(--accent-primary)') : 'transparent',
              transition: 'background var(--duration-fast) var(--ease-out)',
            }}></span>
          </button>
        );
      })}
    </div>
  );
}
