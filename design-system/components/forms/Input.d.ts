/** Labeled text input. */
export interface InputProps {
  label?: string;
  hint?: string;
  /** Error message; also paints the border red */
  error?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
