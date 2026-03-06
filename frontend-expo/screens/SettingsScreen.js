import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useFontSize } from "../contexts/FontSizeContext";
import styles from "../styles/SettingsScreenStyles.js"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { fontSize, setFontSize } = useFontSize();
  const navigation = useNavigation();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [privacyTrackingEnabled, setPrivacyTrackingEnabled] = React.useState(false);
  const [language, setLanguage] = React.useState("en");

  // Loading the saved settings
  useEffect(() => {
    (async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem("@settings_notifications");
        const savedPrivacy = await AsyncStorage.getItem("@settings_privacy");
        const savedLanguage = await AsyncStorage.getItem("@settings_language");
        const savedFontSize = await AsyncStorage.getItem("@settings_fontSize");

        if (savedNotifications !== null) setNotificationsEnabled(savedNotifications === "true");
        if (savedPrivacy !== null) setPrivacyTrackingEnabled(savedPrivacy === "true");
        if (savedLanguage !== null) setLanguage(savedLanguage);
        if (savedFontSize !== null) setFontSize(Number(savedFontSize));
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    })();
  }, []);

  // Save settings when changed
  useEffect(() => {
    AsyncStorage.setItem("@settings_notifications", notificationsEnabled.toString()).catch(console.error);
  }, [notificationsEnabled]);

  useEffect(() => {
    AsyncStorage.setItem("@settings_privacy", privacyTrackingEnabled.toString()).catch(console.error);
  }, [privacyTrackingEnabled]);

  useEffect(() => {
    AsyncStorage.setItem("@settings_language", language).catch(console.error);
  }, [language]);

  useEffect(() => {
    AsyncStorage.setItem("@settings_fontSize", fontSize.toString()).catch(console.error);
  }, [fontSize]);

  const sliderHeight = fontSize * 1.3;
  const toggleSize = fontSize * 1.6;

  const Separator = () => <View style={styles.separator} />;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  
  //Rendering each individual setting on the page
  return (
    <View style={styles.container}>
      {/* Notifications */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={[styles.label, { fontSize }]}>Enable Notifications</Text>
            <Text style={[styles.description, { fontSize: fontSize * 0.9 }]}>
              You’ll receive banner notifications to remind you.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#ccc", true: "#1E90FF" }}
            thumbColor={notificationsEnabled ? "#1E90FF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
            style={{ width: toggleSize, height: toggleSize }}
          />
        </View>
      </View>

      <Separator />

      {/* Privacy Tracking */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleContainer}>
          <View style={styles.toggleTextContainer}>
            <Text style={[styles.label, { fontSize }]}>Enable Privacy Tracking</Text>
            <Text style={[styles.description, { fontSize: fontSize * 0.9 }]}>
              Allow us to track your behavior to personalise your experience.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#ccc", true: "#1E90FF" }}
            thumbColor={privacyTrackingEnabled ? "#1E90FF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setPrivacyTrackingEnabled}
            value={privacyTrackingEnabled}
            style={{ width: toggleSize, height: toggleSize }}
          />
        </View>
      </View>

      <Separator />

      {/* Language Picker */}
      <View style={styles.settingBlock}>
        <Text style={[styles.label, { fontSize }]}>Select Language</Text>
        <View style={[styles.pickerWrapper, { height: fontSize * 2.8 }]}>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => setLanguage(itemValue)}
            style={{ color: "#1E90FF", fontSize, width: "100%" }}
            mode="dropdown"
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="German" value="de" />
          </Picker>
        </View>
      </View>

      <Separator />

      {/* Font Size */}
      <View style={styles.settingBlock}>
        <Text style={[styles.label, { fontSize }]}>Adjust Font Size</Text>
        <View style={[styles.sliderContainer, { height: sliderHeight }]}>
          <Slider
            style={{ width: "100%" }}
            minimumValue={12}
            maximumValue={24}
            step={1}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1E90FF"
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}


