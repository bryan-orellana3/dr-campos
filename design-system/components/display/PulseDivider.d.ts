/** EKG heartbeat divider — the logo's underline as a rule. */
export interface PulseDividerProps {
  /** Cyan + glow for navy sections */
  onDark?: boolean;
  width?: number | string;
  /** Where the heartbeat blip sits */
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}
