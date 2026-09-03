
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { StyleSheet, View } from 'react-native';

/** External Libraries Imports */
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppTheme, useDiscoverQueue } from '@/src/hooks';

/** Local Imports */
import ActionButton from '@/src/components/ActionButton';
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
import LongPressButton from '@/src/components/LongPressButton';
import SwipeCard from '@/src/components/SwipeCard';

const DiscoverScreen:FC = () => {
  const { colors } = useAppTheme();
  const { currentProduct, remainingCount, isDone, next, favorite, ignore, restart } = useDiscoverQueue();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header
        title="Discover"
        subtitle={isDone ? 'All products reviewed' : `${remainingCount} product${remainingCount > 1 ? 's' : ''} left`}
      />
      <View style={styles.content}>
        {isDone || !currentProduct ? (
          <EmptyState
            icon="checkmark-done-circle-outline"
            title="You've reviewed every product"
            message="Check Favorites and Products, or start over to discover them again."
            actionLabel="Start over"
            onAction={restart}
          />
        ) : (
          <>
            <SwipeCard
              product={currentProduct}
              leftColor={colors.danger}
              onSwipeLeft={next}
              onSwipeRight={favorite}
              rightColor={colors.primary}
            />
            <View style={styles.actions}>
              <ActionButton
                icon="arrow-back"
                label="Left / Next"
                accessibilityLabel="Next product"
                onPress={next}
                variant="danger"
              />
              <LongPressButton
                content="Ignore"
                size="small"
                action={ignore}
                accessibilityLabel="Ignore product, press and hold to confirm"
              />
              <ActionButton
                icon="heart"
                label="Right / Favorite"
                accessibilityLabel="Add to favorites"
                onPress={favorite}
                variant="primary"
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 32,
    width: '100%',
  },
});

export default DiscoverScreen;