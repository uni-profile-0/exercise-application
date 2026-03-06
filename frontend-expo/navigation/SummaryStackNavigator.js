import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogScreen from '../screens/SummaryScreen';
import WorkoutLogsScreen from '../screens/WorkoutLogsScreen';

const Stack = createNativeStackNavigator();

// Navigator to navigate between the summary page and the workoutlogs page

export default function SummaryStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Summary"
        component={LogScreen}
        options={{ title: 'Summary' }}
      />
      <Stack.Screen
        name="WorkoutLogsScreen"
        component={WorkoutLogsScreen}
        options={{ title: 'Workout Logs' }}
      />
    </Stack.Navigator>
  );
}
