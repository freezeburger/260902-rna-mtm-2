
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Text, View } from 'react-native';

/** External Libraries Imports */
import { Image } from 'expo-image';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Badge from '@/src/components/Badge';
import Card from '@/src/components/Card';
import { styles } from './SwipeCard.stylesheet';
import type { SwipeCardProps } from './SwipeCard.types';

const SwipeCard:FC<SwipeCardProps> = ({ product }) => {
  const { colors } = useAppTheme();

  return (
    <Card style={styles.container}>
      <Image
        accessibilityLabel={product.title}
        source={{ uri: product.thumbnail }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      {product.category && (
        <View style={styles.badge}>
          <Badge label={product.category} variant="category" />
        </View>
      )}
      <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
      <Text style={[styles.description, { color: colors.textMuted }]}>{product.description}</Text>
      <Text style={[styles.price, { color: colors.primary }]}>{product.price.toFixed(2)} €</Text>
    </Card>
  );
};

/**
 * Memoized version of the SwipeCard component to prevent unnecessary re-renders.
 */
const SwipeCardMemoized = React.memo(SwipeCard, (prevProps, nextProps) => prevProps.product.id === nextProps.product.id);
SwipeCardMemoized.displayName = 'SwipeCardMemoized';

export default SwipeCardMemoized;