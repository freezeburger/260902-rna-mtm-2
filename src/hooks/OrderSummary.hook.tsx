
import { useDispatch, useSelector } from 'react-redux';

import { type AppDispatch, logic, type RootState } from '@/src/logic/root.store';

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

  const dispatch = useDispatch<AppDispatch>();
  
  const selectedProductId = useSelector(logic.orders.selectors.selectSelectedProductId);
  const selectedProduct = useSelector((state: RootState) =>
    selectedProductId
      ? logic.products.selectors.selectProductById(state, selectedProductId)
      : undefined,
  );
  const quantity = useSelector(logic.orders.selectors.selectOrderQuantity);

  const total = selectedProduct ? selectedProduct.price * quantity : 0;
  const canPlaceOrder = Boolean(selectedProduct) && quantity > 0;

  return {
    selectedProduct,
    quantity,
    total,
    canPlaceOrder,
    setQuantity: (nextQuantity: number) =>
      dispatch(logic.orders.actions.setOrderQuantity(nextQuantity)),
    placeOrder: () => selectedProduct && dispatch(logic.orders.actions.placeOrder(selectedProduct)),
  };
};