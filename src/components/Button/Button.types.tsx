/**
 * Import Application Types
 */
import type { PressableProps } from 'react-native';

export type ButtonProps = {
  content: string;
  size?: 'regular' | 'small';
} & Pick<PressableProps, 'onPress' | 'disabled' | 'accessibilityLabel'>;