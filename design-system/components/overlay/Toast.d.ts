/** Toast notification. */
export interface ToastProps {
  tone?: 'info' | 'success' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  style?: React.CSSProperties;
}
