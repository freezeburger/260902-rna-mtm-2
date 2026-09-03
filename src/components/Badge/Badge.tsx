
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Badge.stylesheet';
import type { BadgeProps } from './Badge.types';

const VARIANT_TOKENS = {
  category: { background: 'primaryMuted', text: 'primary' },
  favorite: { background: 'primaryMuted', text: 'primary' },
  ignored: { background: 'surfaceAlt', text: 'textMuted' },
} as const;

const Badge:FC<BadgeProps> = ({ label, variant = 'category' }) => {
  const { colors } = useAppTheme();
  const tokens = VARIANT_TOKENS[variant];

  return (
    <View style={[styles.container, { backgroundColor: colors[tokens.background] }]}>
      <Text style={[styles.label, { color: colors[tokens.text] }]}>{label}</Text>
    </View>
  );
};

/**
 * Memoized version of the Badge component to prevent unnecessary re-renders.
 */
const BadgeMemoized = React.memo(Badge);
BadgeMemoized.displayName = 'BadgeMemoized';

export default BadgeMemoized;