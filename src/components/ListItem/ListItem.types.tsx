/**
 * Import Application Types
 */
import type { ReactNode } from 'react';
import type { Product } from '@/src/types';

export type ListItemProps = {
  product: Product;
  isFavorite?: boolean;
  isIgnored?: boolean;
  onPress?: () => void;
  right?: ReactNode;
};