// Importing relevant packages
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import SignupScreen from "./screens/SignupScreen";
import { LoggerProvider } from "./contexts/LoggerProvider";
import useSplashScreen from "./utils/useSplashScreen";
import LoginScreen from "./screens/LoginScreen";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FontSizeProvider } from "./contexts/FontSizeContext";

const Stack = createStackNavigator();

export default function App() {
  console.log("App component rendered");

  const appIsReady = useSplashScreen();

  useEffect(() => {
    console.log("appIsReady:", appIsReady);
  }, [appIsReady]);

  if (!appIsReady) {
    console.log("App not ready, rendering custom splash screen");

    return (
      <View style={styles.logoContainer}>
        <FontAwesome5 name="running" size={72} color="#1E90FF" />
        <Text style={styles.logoText}>Glidr</Text>
      </View>
    );
  }

  console.log("App ready, rendering main UI");

  // Setting the routes and screens up
  return (
    <View style={{ flex: 1 }}>
      <LoggerProvider>
        <FontSizeProvider>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="Signup">
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </FontSizeProvider>
      </LoggerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E90FF",
    marginTop: 8,
    letterSpacing: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
