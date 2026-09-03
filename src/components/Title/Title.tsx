
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import { styles } from './Title.stylesheet';
import type { TitleProps } from './Title.types';

const Title:FC<TitleProps> = ({ content }) => {
  const { colors } = useAppTheme();

  return (
    <Text style={[styles.title, { color: colors.text }]}>{content}</Text>
  );
};

/**
 * Memoized version of the Title component to prevent unnecessary re-renders.
 */
const TitleMemoized = React.memo(Title);
TitleMemoized.displayName = 'TitleMemoized';

export default TitleMemoized;