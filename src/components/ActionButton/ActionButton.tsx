
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/hooks';

/** Local Imports */
import { styles } from './ActionButton.stylesheet';
import type { ActionButtonProps } from './ActionButton.types';

const ActionButton:FC<ActionButtonProps> = ({ content }) => {
  return (
    <Text style={styles.container}>{content}</Text>
  );
};

/**
 * Memoized version of the ActionButton component to prevent unnecessary re-renders.
 */
const ActionButtonMemoized = React.memo(ActionButton, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
ActionButtonMemoized.displayName = 'ActionButtonMemoized';

export default ActionButtonMemoized;