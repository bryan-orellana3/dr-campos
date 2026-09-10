import React from 'react';

/** Primary action button. Variants: primary | secondary | ghost | onDark. Sizes: sm | md | lg. */
export function Button({ variant = 'primary', size = 'md', disabled = false, fullWidth = false, icon = null, children, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: { padding: '9px 18px', fontSize: 13 },
    md: { padding: '13px 26px', fontSize: 15 },
    lg: { padding: '16px 34px', fontSize: 16 },
  };
  const variants = {
    primary: {
      background: active ? 'var(--dc-navy-800)' : hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: '#fff', border: '1px solid transparent',
    },
    secondary: {
      background: hover ? 'var(--surface-wash)' : 'var(--dc-white)',
      color: 'var(--dc-royal-600)', border: '1px solid var(--dc-royal-600)',
    },
    ghost: {
      background: hover ? 'var(--dc-neutral-100)' : 'transparent',
      color: 'var(--dc-royal-600)', border: '1px solid transparent',
    },
    onDark: {
      background: active ? 'var(--dc-sky-200)' : hover ? 'var(--dc-sky-300)' : '#fff',
      color: 'var(--dc-navy-800)', border: '1px solid transparent',
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        font: `700 ${sizes[size].fontSize}px/1 var(--font-display)`,
        letterSpacing: '0.02em',
        borderRadius: 'var(--radius-pill)',
        padding: sizes[size].padding,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: fullWidth ? '100%' : undefined,
        transform: active && !disabled ? 'translateY(1px)' : 'none',
        transition: 'background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {icon}{children}
    </button>
  );
}
