
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { View } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Card.stylesheet';
import type { CardProps } from './Card.types';

const Card:FC<CardProps> = ({ children, style }) => {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        style,
      ]}>
      {children}
    </View>
  );
};

/**
 * Memoized version of the Card component to prevent unnecessary re-renders.
 */
const CardMemoized = React.memo(Card);
CardMemoized.displayName = 'CardMemoized';

export default CardMemoized;