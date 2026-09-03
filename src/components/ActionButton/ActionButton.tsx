
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Pressable, Text, View } from 'react-native';

/** External Libraries Imports */
import { Ionicons } from '@expo/vector-icons';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './ActionButton.stylesheet';
import type { ActionButtonProps } from './ActionButton.types';

const VARIANT_BACKGROUND: Record<NonNullable<ActionButtonProps['variant']>, keyof ReturnType<typeof useAppTheme>['colors']> = {
  default: 'surface',
  primary: 'primary',
  danger: 'danger',
};

const ActionButton:FC<ActionButtonProps> = ({
  icon,
  label,
  accessibilityLabel,
  onPress,
  variant = 'default',
  disabled = false,
}) => {
  const { colors } = useAppTheme();
  const iconColor = variant === 'default' ? colors.text : '#FFFFFF';

  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          { backgroundColor: colors[VARIANT_BACKGROUND[variant]], borderColor: colors.border },
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}>
        <Ionicons name={icon} size={28} color={iconColor} />
      </Pressable>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
    </View>
  );
};

/**
 * Memoized version of the ActionButton component to prevent unnecessary re-renders.
 */
const ActionButtonMemoized = React.memo(ActionButton);
ActionButtonMemoized.displayName = 'ActionButtonMemoized';

export default ActionButtonMemoized;