import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from "../components/MoodPicker";
import { MoodItemRow } from "../components/MoodItemRow";
import { MoodOptionType, MoodOptionWithTimestamp } from '../types.ts';
import { useAppContext } from '../App.provider';

export const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={appContext.handleSelectMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
});
