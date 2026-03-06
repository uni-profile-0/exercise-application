import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-native-safe-area-context";

// Defining the workouts and the icons representing them
const workouts = [
  { id: "1", name: "Walking", icon: "walking" },
  { id: "2", name: "Running", icon: "running" },
  { id: "3", name: "Strength Training", icon: "dumbbell" },
  { id: "4", name: "HIIT", icon: "bolt" },
  { id: "5", name: "Cycling", icon: "bicycle" },
  { id: "6", name: "Yoga", icon: "spa" },
];

// Creating a grid with 2 colummns for the different workouts

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemMargin = 15;
const itemSize = (width - (numColumns + 1) * itemMargin) / numColumns;

export default function WorkoutScreen({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const selectWorkout = (workout) => {
    setSelectedWorkout(workout.id);

    navigation.navigate("WorkoutDetail", {
      workoutId: workout.id,
      workoutName: workout.name,
      workoutIcon: workout.icon,
    });
  };

  const renderItem = ({ item, index }) => {
    const isSelected = item.id === selectedWorkout;
    const isLastColumn = (index + 1) % numColumns === 0;

    return (
      <TouchableOpacity
        style={[
          styles.item,
          isSelected && styles.selectedItem,
          !isLastColumn && { marginRight: itemMargin },
        ]}
        onPress={() => selectWorkout(item)}
        activeOpacity={0.8}
      >
        <FontAwesome5
          name={item.icon || "dumbbell"}
          size={48}
          color={isSelected ? "#fff" : "#1E90FF"}
        />
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Your Workout</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.listContainer}
        extraData={selectedWorkout}
      />
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: itemMargin,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E90FF",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: itemMargin / 2,
    marginBottom: itemMargin / 2,
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  selectedItem: {
    backgroundColor: "#1E90FF",
    borderColor: "#1E90FF",
  },
  itemText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "700",
  },
});
