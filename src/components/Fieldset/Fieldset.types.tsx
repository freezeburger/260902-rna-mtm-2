/**
 * Import Application Types
 */
import type { ReactNode } from 'react';

export type FieldsetProps = {
  label: string;
  error?: string;
  children: ReactNode;
};