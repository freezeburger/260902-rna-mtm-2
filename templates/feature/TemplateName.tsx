
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import * as Hooks from '@/src/hooks';

/** Local Imports */
import { styles } from './TemplateName.stylesheet';
import type { TemplateNameProps } from './TemplateName.types';

const TemplateName:FC<TemplateNameProps> = ({ content }) => {
  return (
    <Text style={styles.container}>{content}</Text>
  );
};

/**
 * Memoized version of the TemplateName component to prevent unnecessary re-renders.
 */
const TemplateNameMemoized = React.memo(TemplateName, (prevProps, nextProps) => {
    /**
     * Determines whether the component should re-render based on prop changes.
     */
    // return prevProps.content === nextProps.content;
    return true // uncomment to compute render conditionnally
});
TemplateNameMemoized.displayName = 'TemplateNameMemoized';

export default TemplateNameMemoized;