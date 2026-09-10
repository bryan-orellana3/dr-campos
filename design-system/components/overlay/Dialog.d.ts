/** Modal dialog, navy scrim, 24px radius. */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Action row, right-aligned */
  footer?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}
