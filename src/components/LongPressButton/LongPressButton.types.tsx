/**
 * Import Application Types
 */
import * as Types from '@/src/types'

export type LongPressButtonProps = Types.WithTextContent & Partial<Types.WithSize> & Partial<Types.Actionable> & {
    /**
     * Color displayed as the button background once the hold validation completes.
     * Defaults to the theme's danger color when not provided.
     */
    validatedColor?: string;
    accessibilityLabel?: string;
};
