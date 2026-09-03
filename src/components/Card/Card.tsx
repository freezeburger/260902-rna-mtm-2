
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/hooks';

/** Local Imports */
import { styles } from './Card.stylesheet';
import type { CardProps } from './Card.types';

const Card:FC<CardProps> = ({ content }) => {
  return (
    <Text style={styles.container}>{content}</Text>
  );
};

/**
 * Memoized version of the Card component to prevent unnecessary re-renders.
 */
const CardMemoized = React.memo(Card, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
CardMemoized.displayName = 'CardMemoized';

export default CardMemoized;