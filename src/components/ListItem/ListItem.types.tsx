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
  onFavorite?: () => void;
  onUnfavorite?: () => void;
  onOrder?: () => void;
  onIgnore?: () => void;
  onUnignore?: () => void;
  right?: ReactNode;
};