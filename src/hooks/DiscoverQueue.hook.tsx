
import { useDispatch, useSelector } from 'react-redux';

import { type AppDispatch, logic } from '@/src/logic/root.store';

/**
 * Orchestrates the Discover screen: current product, remaining count and the
 * three swipe actions (next, favorite, ignore).
 *
 * @returns the current product to show and the actions available on it.
 *
 * @example
 *
 * const { currentProduct, isDone, next, favorite, ignore } = useDiscoverQueue();
 */
export const useDiscoverQueue = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentProduct = useSelector(logic.products.selectors.selectCurrentDiscoverProduct);
  const remainingCount = useSelector(logic.products.selectors.selectDiscoverRemainingCount);

  const isDone = !currentProduct;

  const next = () => dispatch(logic.products.actions.discoverNext());
  const favorite = () => currentProduct && dispatch(logic.products.actions.addFavorite(currentProduct.id));
  const ignore = () => currentProduct && dispatch(logic.products.actions.ignoreProduct(currentProduct.id));
  const restart = () => dispatch(logic.products.actions.discoverRestart());

  return { currentProduct, remainingCount, isDone, next, favorite, ignore, restart };
};