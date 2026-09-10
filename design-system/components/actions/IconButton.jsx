import React from 'react';

/** Circular icon-only button. Variants: solid | outline | ghost. */
export function IconButton({ variant = 'outline', size = 'md', disabled = false, label, children, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const px = { sm: 32, md: 40, lg: 48 }[size];
  const variants = {
    solid: { background: hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)', color: '#fff', border: '1px solid transparent' },
    outline: { background: hover ? 'var(--surface-wash)' : 'var(--dc-white)', color: 'var(--dc-royal-600)', border: '1px solid var(--border-strong)' },
    ghost: { background: hover ? 'var(--dc-neutral-100)' : 'transparent', color: 'var(--dc-royal-600)', border: '1px solid transparent' },
  };
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: px, height: px, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'background var(--duration-fast) var(--ease-out)',
        ...variants[variant], ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
