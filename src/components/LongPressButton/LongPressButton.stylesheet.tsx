

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    borderRadius: 32,
    borderWidth: 1,
    justifyContent: 'center',
    height: 64,
    width: 64,
  },
  regular: {
    minHeight: 48,
    paddingHorizontal: 24,
  },
  small: {
    minHeight: 64,
    paddingHorizontal: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});
