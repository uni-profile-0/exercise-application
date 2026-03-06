import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import WorkoutLogsScreen from '../screens/WorkoutLogsScreen';
import LogScreen from '../screens/SummaryScreen';  

const Stack = createNativeStackNavigator();


// Stack navigator to navigate between the workout pages

export default function WorkoutStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WorkoutList" 
        component={WorkoutScreen} 
        options={{ title: 'Workouts' }} 
      />
      <Stack.Screen 
        name="Summary" 
        component={LogScreen}
        options={{ title: 'Summary' }}
      />
      <Stack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetailScreen} 
        options={({ route }) => ({ title: route.params.workoutName })} 
      />
    </Stack.Navigator>
  );
}
