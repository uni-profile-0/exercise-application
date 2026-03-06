// LogScreenStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  summaryBox: {
    padding: 20,
    backgroundColor: "#f0f8ff", // light blue
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1E90FF",
    textAlign: "center",
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  progressItem: {
    alignItems: "center",
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  latestWorkoutsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderRadius: 10,
    elevation: 2,
  },
  latestTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1E90FF",
    textAlign: "center",
  },
  seeMore: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E90FF",
    alignSelf: "flex-end",
  },
  logContainer: {
    marginVertical: 6,
    padding: 10,
    backgroundColor: "#fff",
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

export default styles;
