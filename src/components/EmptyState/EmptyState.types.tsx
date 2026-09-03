/**
 * Import Application Types
 */
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type EmptyStateProps = {
  icon?: ComponentProps<typeof Ionicons>['name'];
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};