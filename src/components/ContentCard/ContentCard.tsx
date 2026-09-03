
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Card from '@/src/components/Card';
import { styles } from './ContentCard.stylesheet';
import type { ContentCardProps } from './ContentCard.types';

const ContentCard:FC<ContentCardProps> = ({ title, subtitle, children, style }) => {
  const { colors } = useAppTheme();

  return (
    <Card style={style}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={[styles.title, { color: colors.text }]}>{title}</Text>}
          {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </Card>
  );
};

/**
 * Memoized version of the ContentCard component to prevent unnecessary re-renders.
 */
const ContentCardMemoized = React.memo(ContentCard);
ContentCardMemoized.displayName = 'ContentCardMemoized';

export default ContentCardMemoized;