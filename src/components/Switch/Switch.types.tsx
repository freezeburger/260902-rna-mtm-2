/**
 * Import Application Types
 */
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type SwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: ComponentProps<typeof Ionicons>['name'];
  accessibilityLabel?: string;
};