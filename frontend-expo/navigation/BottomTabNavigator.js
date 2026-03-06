import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import SummaryStackNavigator from "../navigation/SummaryStackNavigator";
import WorkoutStackNavigator from "../navigation/WorkoutStackNavigator"; 
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

// Generalised navigator and provides functionality for the bottom tab

export default function BottomTabNavigator({ navigation, route }) {
  React.useLayoutEffect(() => {
    if (navigation != null) {
      navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    }
  }, [navigation, route]);

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={SummaryStackNavigator}
        options={{
          title: "Summary",
          headerShown: false,   // Hide header here — stack handles header
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="analytics" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Workouts"
        component={WorkoutStackNavigator}
        options={{
          title: "Workouts",
          headerShown: false,  // Hide header here too
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="fitness" />
          ),
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="information-circle" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Summary";
    case "RecordEvents":
      return "Record Events";
    case "Settings":
      return "Settings";
    case "About":
      return "About";
    default:
      return routeName;
  }
}
