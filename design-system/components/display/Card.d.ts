/** Surface card, 16px radius, navy-tinted shadow. */
export interface CardProps {
  variant?: 'default' | 'wash' | 'dark';
  /** Hover raises shadow */
  interactive?: boolean;
  padding?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
