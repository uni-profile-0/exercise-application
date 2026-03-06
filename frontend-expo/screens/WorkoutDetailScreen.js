import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LoggerContext } from "../contexts/LoggerProvider";
import styles from "../styles/WorkoutDetailsScreenStyles";

export default function WorkoutDetailScreen({ route, navigation }) {
  const { workoutName, workoutIcon } = route.params;
  const { addEvent } = useContext(LoggerContext); // To log workouts from this screen
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((sec) => sec + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerRunning]);

  const handleStart = () => setTimerRunning(true);

  const handleStop = async () => {
    setTimerRunning(false);

    if (secondsElapsed === 0) {
      Alert.alert("Timer", "You haven't started the timer yet!");
      return;
    }

    try {
      await addEvent(workoutName, secondsElapsed);

      Alert.alert(
        "Recorded",
        `Recorded ${formatTime(secondsElapsed)} for ${workoutName}!`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to log workout. Please try again."
      );
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name={workoutIcon} size={72} color="#1E90FF" />
      <Text style={styles.title}>{workoutName}</Text>

      <Text style={styles.timer}>{formatTime(secondsElapsed)}</Text>

      <View style={styles.buttonsContainer}>
        {!timerRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={handleStop}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
