
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Switch as RNSwitch, Text, View } from 'react-native';

/** External Libraries Imports */
import { Ionicons } from '@expo/vector-icons';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Switch.stylesheet';
import type { SwitchProps } from './Switch.types';

const Switch:FC<SwitchProps> = ({ label, value, onValueChange, icon, accessibilityLabel }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && <Ionicons name={icon} size={20} color={colors.icon} style={styles.icon} />}
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </View>
      <RNSwitch
        accessibilityLabel={accessibilityLabel ?? label}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
};

/**
 * Memoized version of the Switch component to prevent unnecessary re-renders.
 */
const SwitchMemoized = React.memo(Switch);
SwitchMemoized.displayName = 'SwitchMemoized';

export default SwitchMemoized;