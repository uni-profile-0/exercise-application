// utils/useSplashScreen.js
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function useSplashScreen() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [customDelayPassed, setCustomDelayPassed] = useState(false);

  // Load fonts and hide Expo splash
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(FontAwesome5.font);
        console.log("Fonts loaded");

        // Hide native splash screen immediately after assets are ready
        await SplashScreen.hideAsync();
        console.log("Native splash screen hidden");

        setAssetsLoaded(true);
      } catch (e) {
        console.warn("Error during splash screen setup:", e);
      }
    }

    prepare();
  }, []);

  // Start timer for custom splash screen
  useEffect(() => {
    if (assetsLoaded) {
      const timeout = setTimeout(() => {
        setCustomDelayPassed(true);
      }, 3000); // Keep custom splash visible for 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [assetsLoaded]);

  // appIsReady only becomes true when both are done
  const appIsReady = assetsLoaded && customDelayPassed;

  return appIsReady;
}
