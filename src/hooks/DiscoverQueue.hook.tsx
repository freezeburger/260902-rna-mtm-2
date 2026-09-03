
/** Local Imports */
import { useAppState } from '@/src/hooks/AppState.hook';
import { selectCurrentDiscoverProduct, selectDiscoverRemainingCount } from '@/src/store/selectors';

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
  const { state, discoverNext, discoverRestart, addFavorite, ignoreProduct } = useAppState();

  const currentProduct = selectCurrentDiscoverProduct(state);
  const remainingCount = selectDiscoverRemainingCount(state);
  const isDone = !currentProduct;

  const next = () => discoverNext();
  const favorite = () => currentProduct && addFavorite(currentProduct.id);
  const ignore = () => currentProduct && ignoreProduct(currentProduct.id);
  const restart = () => discoverRestart();

  return { currentProduct, remainingCount, isDone, next, favorite, ignore, restart };
};