/** Radio button with label. */
export interface RadioProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: any) => void;
  disabled?: boolean;
  name?: string;
  style?: React.CSSProperties;
}
