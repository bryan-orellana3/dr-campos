/** Selectable/removable content tag. */
export interface TagProps {
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
