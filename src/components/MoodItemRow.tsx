import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types.ts';
import { theme } from '../theme.ts';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Text style={styles.moodValue}>{item.mood.emoji}</Text>
        <Text style={styles.moodDescription}> {item.mood.description}</Text>
      </View>
      <Text style={styles.moodDate}>
        {format(new Date(item.timestamp), "dd MMM, yyy 'at' h:mmaaa")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
  },
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavendar,
    fontFamily: theme.fontFamilyBold,
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});