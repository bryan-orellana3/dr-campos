/** Circular icon-only button. */
export interface IconButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Accessible label (also tooltip) */
  label: string;
  /** Icon node, 16-20px */
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
