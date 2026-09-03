/**
 * Derived (computed) values shared across screens.
 * Kept outside components so no screen duplicates this logic.
 */
import type { AppState, Product } from '@/src/types';

export function selectFavoriteProducts(state: AppState): Product[] {
  return state.products.filter((product) => state.favoriteProductIds.includes(product.id));
}

export function selectIsFavorite(state: AppState, productId: string): boolean {
  return state.favoriteProductIds.includes(productId);
}

export function selectIsIgnored(state: AppState, productId: string): boolean {
  return state.ignoredProductIds.includes(productId);
}

export function selectCurrentDiscoverProduct(state: AppState): Product | undefined {
  return state.products[state.discoverIndex];
}

export function selectDiscoverRemainingCount(state: AppState): number {
  return Math.max(0, state.products.length - state.discoverIndex);
}

export function selectSelectedProduct(state: AppState): Product | undefined {
  if (!state.selectedProductId) {
    return undefined;
  }
  return state.products.find((product) => product.id === state.selectedProductId);
}

export function selectOrderTotal(state: AppState): number {
  const product = selectSelectedProduct(state);
  if (!product) {
    return 0;
  }
  return product.price * state.orderQuantity;
}
