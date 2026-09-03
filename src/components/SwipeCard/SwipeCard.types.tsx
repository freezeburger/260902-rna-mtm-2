/**
 * Import Application Types
 */
import type { Product } from '@/src/types';

export type SwipeCardProps = {
  product: Product;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftColor?: string;
  rightColor?: string;
};