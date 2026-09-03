
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Pressable, Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/src/hooks';

/** Local Imports */
import { styles } from './Button.stylesheet';
import type { ButtonProps } from './Button.types';

const Button:FC<ButtonProps> = ({
  content,
  size = 'regular',
  onPress,
  disabled = false,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? content}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, styles[size], disabled && styles.disabled]}>
      <Text style={styles.label}>{content}</Text>
    </Pressable>
  );
};

/**
 * Memoized version of the Button component to prevent unnecessary re-renders.
 */
const ButtonMemoized = React.memo(Button, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    return (
      prevProps.content === nextProps.content &&
      prevProps.size === nextProps.size &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.onPress === nextProps.onPress &&
      prevProps.accessibilityLabel === nextProps.accessibilityLabel
    );
});
ButtonMemoized.displayName = 'ButtonMemoized';

export default ButtonMemoized;