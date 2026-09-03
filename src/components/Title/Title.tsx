
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/hooks';

/** Local Imports */
import { styles } from './Title.stylesheet';
import type { TitleProps } from './Title.types';

const Title:FC<TitleProps> = ({ content }) => {
  return (
    <Text style={styles.title}>{content}</Text>
  );
};

/**
 * Memoized version of the Title component to prevent unnecessary re-renders.
 */
const TitleMemoized = React.memo(Title, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
TitleMemoized.displayName = 'TitleMemoized';

export default TitleMemoized;