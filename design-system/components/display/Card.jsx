import React from 'react';

/** Surface card. Variants: default | wash | dark. Set interactive for hover lift. */
export function Card({ variant = 'default', interactive = false, padding = 24, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-body)' },
    wash: { background: 'var(--surface-wash)', border: '1px solid transparent', color: 'var(--text-body)' },
    dark: { background: 'var(--surface-dark)', border: '1px solid var(--border-on-dark)', color: 'var(--text-on-dark)' },
  };
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 'var(--radius-lg)', padding,
        boxShadow: interactive && hover ? 'var(--shadow-md)' : variant === 'wash' ? 'none' : 'var(--shadow-sm)',
        transition: 'box-shadow var(--duration-base) var(--ease-out)',
        cursor: interactive ? 'pointer' : undefined,
        ...variants[variant], ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
