/**
 * Import Application Types
 */
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type ContentCardProps = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};