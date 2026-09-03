
/** Local Imports */
import { useAppState } from '@/src/hooks/AppState.hook';
import { selectOrderTotal, selectSelectedProduct } from '@/src/store/selectors';

/**
 * Orchestrates the Orders screen: selected product, quantity, computed total
 * and the "Place order" action.
 *
 * @returns the order draft and the actions available on it.
 *
 * @example
 *
 * const { selectedProduct, quantity, total, canPlaceOrder, placeOrder } = useOrderSummary();
 */
export const useOrderSummary = () => {
  const { state, setOrderQuantity, placeOrder } = useAppState();

  const selectedProduct = selectSelectedProduct(state);
  const total = selectOrderTotal(state);
  const canPlaceOrder = Boolean(selectedProduct) && state.orderQuantity > 0;

  return {
    selectedProduct,
    quantity: state.orderQuantity,
    total,
    canPlaceOrder,
    setQuantity: setOrderQuantity,
    placeOrder,
  };
};