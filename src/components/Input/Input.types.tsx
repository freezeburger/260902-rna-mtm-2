/**
 * Import Application Types
 */
import type { TextInputProps } from 'react-native';

export type InputProps = {
  label: string;
  error?: string;
} & Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'keyboardType' | 'autoCapitalize' | 'autoFocus' | 'returnKeyType' | 'onSubmitEditing' | 'accessibilityLabel'>;