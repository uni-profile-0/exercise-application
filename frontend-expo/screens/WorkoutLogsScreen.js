import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LoggerContext } from "../contexts/LoggerProvider";
import { useFontSize } from "../contexts/FontSizeContext";
import styles from "../styles/WorkoutLogsScreenStyles";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Mapping the icons and exercises together
const eventIconMap = {
  Walking: "walking",
  Running: "running",
  "Strength Training": "dumbbell",
  HIIT: "bolt",
  Cycling: "bicycle",
  Yoga: "spa",
  Default: "dumbbell",
};

// Creating the screen with all the logs
export default function WorkoutLogsScreen() {
  const { state: log } = useContext(LoggerContext);
  const sortedLog = [...log].sort((a, b) => {
    if (!a.timestamp && !b.timestamp) return 0;
    if (!a.timestamp) return 1;
    if (!b.timestamp) return -1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Workouts</Text>
      {sortedLog.map((entry, index) => (
        <WorkoutItem key={index} {...entry} />
      ))}
    </ScrollView>
  );
}

// Defining and creating the function that renders what is shown in each workout log box
function WorkoutItem({ event, duration, timestamp }) {
  const { fontSize } = useFontSize();
  const iconName = eventIconMap[event] || eventIconMap["Default"];

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <View style={styles.logContainer}>
      <View style={styles.eventHeader}>
        <FontAwesome5
          name={iconName}
          size={36}
          color="#1E90FF"
          style={styles.eventIcon}
        />
        <Text style={[styles.eventText, { fontSize: fontSize * 1.3 }]}>{event}</Text>
      </View>
      <View style={styles.eventData}>
        <Text style={{ fontSize: fontSize * 0.9 }}>
          Duration: {formatDuration(duration)}
        </Text>
        <Text style={{ fontSize: fontSize * 0.8, color: "#666" }}>
          {timestamp ? new Date(timestamp).toLocaleDateString() : "No date"}
        </Text>
      </View>
    </View>
  );
}