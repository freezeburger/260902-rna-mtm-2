

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  disabled: {
    opacity: 0.4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    minWidth: 32,
    textAlign: 'center',
  },
});