
/** React Imports */
import React, { type FC } from 'react';

/** React Native Imports */
import { TextInput } from 'react-native';

/** External Libraries Imports */

/** Hooks Imports */
import { useAppTheme } from '@/src/hooks';

/** Local Imports */
import Fieldset from '@/src/components/Fieldset';
import { styles } from './Input.stylesheet';
import type { InputProps } from './Input.types';

const Input:FC<InputProps> = ({ label, error, accessibilityLabel, ...textInputProps }) => {
  const { colors } = useAppTheme();

  return (
    <Fieldset label={label} error={error}>
      <TextInput
        accessibilityLabel={accessibilityLabel ?? label}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          { backgroundColor: colors.surfaceAlt, borderColor: error ? colors.danger : colors.border, color: colors.text },
        ]}
        {...textInputProps}
      />
    </Fieldset>
  );
};

/**
 * Memoized version of the Input component to prevent unnecessary re-renders.
 */
const InputMemoized = React.memo(Input);
InputMemoized.displayName = 'InputMemoized';

export default InputMemoized;