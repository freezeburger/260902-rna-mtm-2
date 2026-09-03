
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Fieldset.stylesheet';
import type { FieldsetProps } from './Fieldset.types';

const Fieldset:FC<FieldsetProps> = ({ label, error, children }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      {children}
      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
};

/**
 * Memoized version of the Fieldset component to prevent unnecessary re-renders.
 */
const FieldsetMemoized = React.memo(Fieldset);
FieldsetMemoized.displayName = 'FieldsetMemoized';

export default FieldsetMemoized;