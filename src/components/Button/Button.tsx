
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/hooks';

/** Local Imports */
import { styles } from './Button.stylesheet';
import type { ButtonProps } from './Button.types';

const Button:FC<ButtonProps> = ({ content }) => {
  return (
    <Text style={styles.container}>{content}</Text>
  );
};

/**
 * Memoized version of the Button component to prevent unnecessary re-renders.
 */
const ButtonMemoized = React.memo(Button, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
ButtonMemoized.displayName = 'ButtonMemoized';

export default ButtonMemoized;