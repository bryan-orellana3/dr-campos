/** Styled native select. */
export interface SelectProps {
  label?: string;
  hint?: string;
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
