import { StyleSheet } from "react-native";


const WorkoutDetailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E90FF",
    marginVertical: 20,
  },
  timer: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#1E90FF",
    marginVertical: 30,
    fontVariant: ["tabular-nums"],
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",  // Adjust width since only one button now
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  startButton: {
    backgroundColor: "#28a745",
  },
  stopButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});


export default WorkoutDetailsScreenStyles;