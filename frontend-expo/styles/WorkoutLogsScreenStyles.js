import { StyleSheet } from "react-native";

const WorkoutLogsScreenStyles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1E90FF",
  },
  logContainer: {
    marginVertical: 6,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  eventIcon: {
    marginRight: 8,
  },
  eventText: {
    color: "#1E90FF",
    fontWeight: "700",
  },
  eventData: {
    paddingLeft: 6,
  },
});

export default WorkoutLogsScreenStyles;