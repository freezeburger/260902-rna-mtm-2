
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Pressable, Text } from 'react-native';

/** External Libraries Imports */
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './LongPressButton.stylesheet';
import type { LongPressButtonProps } from './LongPressButton.types';

/** Duration (in ms) required to hold the button before the action is validated. */
const VALIDATION_DURATION = 2000;

const LongPressButton:FC<LongPressButtonProps> = ({ content, size = 'regular', action, validatedColor, accessibilityLabel }) => {
  const { colors } = useAppTheme();
  const activeColor = validatedColor ?? colors.danger;

  /** Progress of the hold, from 0 (idle) to 1 (validated). */
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', activeColor],
    ),
  }));

  const handlePressIn = () => {
    progress.value = withTiming(1, {
      duration: VALIDATION_DURATION,
      easing: Easing.linear,
    });
  };

  const handlePressOut = () => {
    cancelAnimation(progress);
    progress.value = withTiming(0, { duration: 200 });
  };

  const handleLongPress = () => {
    action?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? content}
      accessibilityHint="Press and hold to confirm"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      delayLongPress={VALIDATION_DURATION}
    >
      <Animated.View style={[styles.container, styles[size], { borderColor: colors.border }, animatedStyle]}>
        <Text style={{ color: colors.text, fontWeight: '600' }}>{content}</Text>
      </Animated.View>
    </Pressable>
  );
};

/**
 * Memoized version of the LongPressButton component to prevent unnecessary re-renders.
 */
const LongPressButtonMemoized = React.memo(LongPressButton, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    return (
      prevProps.content === nextProps.content &&
      prevProps.size === nextProps.size &&
      prevProps.action === nextProps.action &&
      prevProps.validatedColor === nextProps.validatedColor &&
      prevProps.accessibilityLabel === nextProps.accessibilityLabel
    );
});
LongPressButtonMemoized.displayName = 'LongPressButtonMemoized';

export default LongPressButtonMemoized;