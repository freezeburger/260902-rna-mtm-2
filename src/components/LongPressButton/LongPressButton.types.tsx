/**
 * Import Application Types
 */
import * as Types from '@/src/types'
import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

export type LongPressButtonProps = Types.WithTextContent & Partial<Types.WithSize> & Partial<Types.Actionable> & {
    /**
     * Color displayed as the button background once the hold validation completes.
     * Defaults to the theme's danger color when not provided.
     */
    validatedColor?: string;
    accessibilityLabel?: string;
    icon?: ComponentProps<typeof Ionicons>['name'];
    appearance?: 'circular' | 'regular';
    disabled?: boolean;
};
