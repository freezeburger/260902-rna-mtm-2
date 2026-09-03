

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
  },
  animatedContainer: {
    borderColor: '#D9DDE3',
    borderWidth: 1,
    elevation: 4,
    minHeight: 380,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    width: '100%',
    maxWidth: 360,
  },
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 380,
  },
  image: {
    borderRadius: 12,
    height: 220,
    marginBottom: 16,
    width: '100%',
  },
  badge: {
    left: 12,
    position: 'absolute',
    top: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    marginTop: 6,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
});