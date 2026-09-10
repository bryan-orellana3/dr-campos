/**
 * Primary action button — pill-shaped, Montserrat bold.
 */
export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'secondary' | 'ghost' | 'onDark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  /** Optional leading icon node (Lucide, 16-18px) */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
