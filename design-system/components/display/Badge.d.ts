/** Uppercase status pill. */
export interface BadgeProps {
  tone?: 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'pulse';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
