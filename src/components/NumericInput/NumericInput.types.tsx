/**
 * Import Application Types
 */
export type NumericInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  accessibilityLabel?: string;
};