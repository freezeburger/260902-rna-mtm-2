

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
  circular: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  regular: {
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: 24,
  },
  rectangular: {
    alignSelf: 'stretch',
    width: '100%',
  },
  small: {
    minHeight: 36,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});
