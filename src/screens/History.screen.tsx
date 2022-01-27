import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const History: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
