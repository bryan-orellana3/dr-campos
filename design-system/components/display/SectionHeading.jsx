import React from 'react';

/** Eyebrow + display heading + optional lede. Core section-opening pattern. */
export function SectionHeading({ eyebrow, title, lede, align = 'left', onDark = false, level = 2, style }) {
  const H = `h${level}`;
  const fonts = { 1: 'var(--type-h1)', 2: 'var(--type-h2)', 3: 'var(--type-h3)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, ...style }}>
      {eyebrow && (
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: onDark ? 'var(--dc-pulse-400)' : 'var(--dc-royal-600)' }}>
          {eyebrow}
        </span>
      )}
      <H style={{ font: fonts[level] || fonts[2], letterSpacing: 'var(--tracking-display)', color: onDark ? '#fff' : 'var(--text-display)', margin: 0 }}>
        {title}
      </H>
      {lede && (
        <p style={{ font: 'var(--type-body-lg)', color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)', margin: 0, maxWidth: '58ch' }}>
          {lede}
        </p>
      )}
    </div>
  );
}
