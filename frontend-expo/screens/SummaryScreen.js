// Importing relevant packages and styles
import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LoggerContext } from "../contexts/LoggerProvider";
import { useFontSize } from "../contexts/FontSizeContext";
import styles from "../styles/SummaryScreenStyles"; 

const RECOMMENDED_WORKOUTS = 7;
const RECOMMENDED_DURATION = 3 * 60 * 60; // 3 hours in seconds. Defined as the goal amount of time for workouts for a week

const eventIconMap = {
  Walking: "walking",
  Running: "running",
  "Strength Training": "dumbbell",
  HIIT: "bolt",
  Cycling: "bicycle",
  Yoga: "spa",
  Default: "dumbbell",
};

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <EventLogList />
    </View>
  );
}

function EventLogList() {
  const { state: log } = useContext(LoggerContext);
  const navigation = useNavigation();

  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const recentLogs = log.filter(
    (entry) => entry.timestamp && new Date(entry.timestamp) >= sevenDaysAgo
  );

  const totalWorkouts = recentLogs.length;
  const totalDuration = recentLogs.reduce((sum, entry) => sum + (entry.duration || 0), 0);

  const workoutProgress = Math.min(totalWorkouts / RECOMMENDED_WORKOUTS, 1);
  const durationProgress = Math.min(totalDuration / RECOMMENDED_DURATION, 1);

  const sortedLog = [...log].sort((a, b) => {
    if (!a.timestamp && !b.timestamp) return 0;
    if (!a.timestamp) return 1;
    if (!b.timestamp) return -1;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const latestFive = sortedLog.slice(0, 5);

  // Creating the Weekly View and also the Latest workouts view
  return (
    <ScrollView style={styles.scrollView}>
      {/* Weekly Progress */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}> Weekly Progress</Text>

        <View style={styles.progressRow}>
          <View style={styles.progressItem}>
            <Progress.Circle
              size={90}
              thickness={6}
              progress={workoutProgress}
              showsText={true}
              color="#28a745"
              formatText={() => `${totalWorkouts}/${RECOMMENDED_WORKOUTS}`}
            />
            <Text style={styles.progressLabel}>Workouts</Text>
          </View>

          <View style={styles.progressItem}>
            <Progress.Circle
              size={90}
              thickness={6}
              progress={durationProgress}
              showsText={true}
              color="#1E90FF"
              formatText={() => formatTime(totalDuration)}
            />
            <Text style={styles.progressLabel}>Time</Text>
          </View>
        </View>
      </View>

      {/* Latest Workouts */}
      <View style={styles.latestWorkoutsContainer}>
        <Text style={styles.latestTitle}>Latest Workouts</Text>
        {latestFive.map((entry, index) => (
          <EventLog {...entry} key={`${entry.event}-${entry.timestamp}-${index}`} />
        ))}
        <Text
          style={styles.seeMore}
          onPress={() => navigation.navigate("WorkoutLogsScreen")}
        >
          See More →
        </Text>
      </View>
    </ScrollView>
  );
}

function EventLog({ event, duration, timestamp }) {
  const { fontSize } = useFontSize();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const iconName = eventIconMap[event] || eventIconMap["Default"];

  return (
    <View style={styles.logContainer}>
      <View style={styles.eventHeader}>
        <FontAwesome5
          name={iconName}
          size={36}
          color="#1E90FF"
          style={styles.eventIcon}
        />
        <Text style={[styles.eventText, { fontSize: fontSize * 1.3 }]}>
          {event}
        </Text>
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

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};
