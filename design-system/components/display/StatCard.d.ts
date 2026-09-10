/** Numeric proof stat (3.9M, 4 pilares…). */
export interface StatCardProps {
  /** The number, e.g. "3.9M" */
  value: string;
  label: string;
  detail?: string;
  /** White numeral for navy sections */
  onDark?: boolean;
  style?: React.CSSProperties;
}
