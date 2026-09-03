
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Alert, StyleSheet, Text, View } from 'react-native';

/** External Libraries Imports */
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppTheme, useOrderSummary } from '@/src/hooks';

/** Local Imports */
import ContentCard from '@/src/components/ContentCard';
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
import LongPressButton from '@/src/components/LongPressButton';
import NumericInput from '@/src/components/NumericInput';

const OrdersScreen:FC = () => {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { selectedProduct, quantity, total, canPlaceOrder, setQuantity, placeOrder } = useOrderSummary();

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) {
      return;
    }
    Alert.alert('Order placed', 'Your order has been recorded.');
    placeOrder();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Header title="Orders" />
      <View style={styles.content}>
        {!selectedProduct ? (
          <EmptyState
            icon="cart-outline"
            title="No product selected"
            message="Choose a favorite product to start an order."
            actionLabel="Go to Favorites"
            onAction={() => router.push('/(tabs)/favorites')}
          />
        ) : (
          <ContentCard>
            <View style={styles.productHeader}>
              <Image
                source={{ uri: selectedProduct.thumbnail }}
                style={styles.productImage}
                contentFit="cover"
                accessibilityLabel={`${selectedProduct.title} product image`}
              />
              <View style={styles.productInfo}>
                <Text style={[styles.productTitle, { color: colors.text }]}>{selectedProduct.title}</Text>
                <Text style={[styles.productPrice, { color: colors.textMuted }]}>
                  {selectedProduct.price.toFixed(2)} €
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Quantity</Text>
              <NumericInput value={quantity} onChange={setQuantity} min={1} accessibilityLabel="order quantity" />
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Total</Text>
              <Text style={[styles.total, { color: colors.primary }]}>{total.toFixed(2)} €</Text>
            </View>
            <View style={styles.action}>
              <LongPressButton
                content="Place order"
                action={handlePlaceOrder}
                appearance="regular"
                disabled={!canPlaceOrder}
                accessibilityLabel="Place order, press and hold to confirm"
                validatedColor={colors.success}
              />
            </View>
          </ContentCard>
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  productImage: {
    borderRadius: 8,
    height: 76,
    marginRight: 16,
    width: 76,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  total: {
    fontSize: 22,
    fontWeight: '700',
  },
  action: {
    marginTop: 24,
  },
});

export default OrdersScreen;