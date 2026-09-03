import { StyleSheet, View } from 'react-native';

import Title from '@/src/components/Title';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Title content="Discover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
