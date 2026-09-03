/**
 * Import Application Types
 */
import type { ReactNode } from 'react';

export type HeaderProps = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
};