
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
import * as Hooks from '@/hooks';

/** Local Imports */
import { styles } from './LongPressButton.stylesheet';
import type { LongPressButtonProps } from './LongPressButton.types';

/** Duration (in ms) required to hold the button before the action is validated. */
const VALIDATION_DURATION = 2000;

const LongPressButton:FC<LongPressButtonProps> = ({ content, action, validatedColor = '#4CAF50' }) => {
  /** Progress of the hold, from 0 (idle) to 1 (validated). */
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', validatedColor],
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
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      delayLongPress={VALIDATION_DURATION}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text>{content}</Text>
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
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
LongPressButtonMemoized.displayName = 'LongPressButtonMemoized';

export default LongPressButtonMemoized;
