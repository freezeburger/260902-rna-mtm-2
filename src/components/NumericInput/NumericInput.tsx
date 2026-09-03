
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Pressable, Text, View } from 'react-native';

/** External Libraries Imports */
import { Ionicons } from '@expo/vector-icons';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './NumericInput.stylesheet';
import type { NumericInputProps } from './NumericInput.types';

const NumericInput:FC<NumericInputProps> = ({ value, onChange, min = 1, max, step = 1, accessibilityLabel }) => {
  const { colors } = useAppTheme();

  const canDecrease = value - step >= min;
  const canIncrease = max === undefined || value + step <= max;

  const decrease = () => canDecrease && onChange(value - step);
  const increase = () => canIncrease && onChange(value + step);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityLabel={`Decrease ${accessibilityLabel ?? 'quantity'}`}
        accessibilityRole="button"
        disabled={!canDecrease}
        onPress={decrease}
        style={[styles.button, { borderColor: colors.border }, !canDecrease && styles.disabled]}>
        <Ionicons name="remove" size={20} color={colors.text} />
      </Pressable>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Pressable
        accessibilityLabel={`Increase ${accessibilityLabel ?? 'quantity'}`}
        accessibilityRole="button"
        disabled={!canIncrease}
        onPress={increase}
        style={[styles.button, { borderColor: colors.border }, !canIncrease && styles.disabled]}>
        <Ionicons name="add" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
};

/**
 * Memoized version of the NumericInput component to prevent unnecessary re-renders.
 */
const NumericInputMemoized = React.memo(NumericInput);
NumericInputMemoized.displayName = 'NumericInputMemoized';

export default NumericInputMemoized;