/**
 * Import Application Types
 */
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type ActionButtonProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  accessibilityLabel: string;
  onPress: () => void;
  label?: string;
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
};