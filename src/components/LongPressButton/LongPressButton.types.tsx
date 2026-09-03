/**
 * Import Application Types
 */
import * as Types from '@/src/types'

export type LongPressButtonProps = Types.WithTextContent & Types.WithSize & Partial<Types.Actionable> & {
    /**
     * Color displayed as the button background once the hold validation completes.
     * Defaults to '#4CAF50' when not provided.
     */
    validatedColor?: string;
};
