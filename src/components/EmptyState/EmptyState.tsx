
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */
import { Ionicons } from '@expo/vector-icons';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Button from '@/src/components/Button';
import { styles } from './EmptyState.stylesheet';
import type { EmptyStateProps } from './EmptyState.types';

const EmptyState:FC<EmptyStateProps> = ({ icon = 'basket-outline', title, message, actionLabel, onAction }) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={colors.textMuted} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {message && <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>}
      {actionLabel && onAction && (
        <View style={styles.action}>
          <Button content={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
};

/**
 * Memoized version of the EmptyState component to prevent unnecessary re-renders.
 */
const EmptyStateMemoized = React.memo(EmptyState);
EmptyStateMemoized.displayName = 'EmptyStateMemoized';

export default EmptyStateMemoized;