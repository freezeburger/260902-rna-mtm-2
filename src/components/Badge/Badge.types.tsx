/**
 * Import Application Types
 */
export type Badge_Variant = 'category' | 'favorite' | 'ignored';

export type BadgeProps = {
  label: string;
  variant?: Badge_Variant;
};