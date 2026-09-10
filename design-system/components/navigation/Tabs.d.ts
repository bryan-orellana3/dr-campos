/** Underline tabs. */
export interface TabsProps {
  items: Array<{ id: string; label: string }>;
  activeId: string;
  onChange?: (id: string) => void;
  onDark?: boolean;
  style?: React.CSSProperties;
}
