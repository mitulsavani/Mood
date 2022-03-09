import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import { useAppContext } from '../App.provider';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types.ts';
import { theme } from '../theme.ts';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

const maxPan = 80;

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const appContext = useAppContext();
  const offset = useSharedValue(0);

  const handlePress = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const removeWithDelay = React.useCallback(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      appContext.handleDeleteMood(item);
    }, 250);
  }, [appContext, item]);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { shouldRemove: boolean }
  >(
    {
      onActive: (event, ctx) => {
        const xVal = Math.floor(event.translationX);
        offset.value = xVal;

        if (Math.abs(xVal) <= maxPan) {
          ctx.shouldRemove = false;
        } else {
          ctx.shouldRemove = true;
        }
      },
      onEnd: (_, ctx) => {
        if (ctx.shouldRemove) {
          offset.value = withTiming(Math.sign(offset.value) * 2000);
          runOnJS(removeWithDelay)();
        } else {
          offset.value = withTiming(0);
        }
      },
    },
    [],
  );

  return (
    <PanGestureHandler
      minDeltaX={1}
      minDeltaY={100}
      onGestureEvent={onGestureEvent}>
      <Reanimated.View style={[styles.moodItem, animatedStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}> {item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyy 'at' h:mmaaa")}
        </Text>
        <Pressable hitSlop={16} onPress={handlePress}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </PanGestureHandler>
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
    fontFamily: theme.fontFamilyRegular,
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
  deleteText: {
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyRegular,
  },
});
