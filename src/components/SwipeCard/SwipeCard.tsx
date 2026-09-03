
/** React Imports */
import React, { type FC, useRef } from 'react';

/** React Native Imports */
import { Animated, PanResponder, Text, View } from 'react-native';

/** External Libraries Imports */
import { Image } from 'expo-image';

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Badge from '@/src/components/Badge';
import Card from '@/src/components/Card';
import { styles } from './SwipeCard.stylesheet';
import type { SwipeCardProps } from './SwipeCard.types';

export const SWIPE_THRESHOLD = 220;

const SwipeCard: FC<SwipeCardProps> = ({
  product,
  onSwipeLeft,
  onSwipeRight,
  leftColor = '#D32F2F',
  rightColor = '#1473E6',
}) => {
  const { colors } = useAppTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const leftAction = useRef(onSwipeLeft);
  const rightAction = useRef(onSwipeRight);
  leftAction.current = onSwipeLeft;
  rightAction.current = onSwipeRight;

  const resetCard = () => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: 0, damping: 9, stiffness: 180, useNativeDriver: false }),
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.03, damping: 6, stiffness: 240, useNativeDriver: false }),
        Animated.spring(scale, { toValue: 1, damping: 8, stiffness: 180, useNativeDriver: false }),
      ]),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        const action = gestureState.dx <= -SWIPE_THRESHOLD
            ? leftAction.current
            : gestureState.dx >= SWIPE_THRESHOLD
              ? rightAction.current
              : undefined;

        action?.();
        resetCard();
      },
      onPanResponderTerminate: resetCard,
    }),
  ).current;

  const backgroundColor = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [leftColor, '#FFFFFF', rightColor],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.animatedContainer,
        { backgroundColor, transform: [{ translateX }, { scale }] },
      ]}>
      <Card style={styles.card}>
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
    </Animated.View>
  );
};

/**
 * Memoized version of the SwipeCard component to prevent unnecessary re-renders.
 */
const SwipeCardMemoized = React.memo(SwipeCard, (prevProps, nextProps) => prevProps.product.id === nextProps.product.id);
SwipeCardMemoized.displayName = 'SwipeCardMemoized';

export default SwipeCardMemoized;