/** Eyebrow + heading + lede section opener. */
export interface SectionHeadingProps {
  /** Short uppercase label, e.g. "MÉTODO 4C" */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: 'left' | 'center';
  onDark?: boolean;
  /** Heading level 1-3 (maps to type scale) */
  level?: 1 | 2 | 3;
  style?: React.CSSProperties;
}
