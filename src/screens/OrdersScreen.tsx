
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { Alert, StyleSheet, Text, View } from 'react-native';

/** External Libraries Imports */
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Hooks Imports */
import { useAppTheme, useOrderSummary } from '@/src/hooks';

/** Local Imports */
import Button from '@/src/components/Button';
import ContentCard from '@/src/components/ContentCard';
import EmptyState from '@/src/components/EmptyState';
import Header from '@/src/components/Header';
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
          <ContentCard title={selectedProduct.title} subtitle={`Unit price: ${selectedProduct.price.toFixed(2)} €`}>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Quantity</Text>
              <NumericInput value={quantity} onChange={setQuantity} min={1} accessibilityLabel="order quantity" />
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Total</Text>
              <Text style={[styles.total, { color: colors.primary }]}>{total.toFixed(2)} €</Text>
            </View>
            <View style={styles.action}>
              <Button content="Place order" onPress={handlePlaceOrder} disabled={!canPlaceOrder} />
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