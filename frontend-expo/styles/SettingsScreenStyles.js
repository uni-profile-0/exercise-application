// styles/SettingsScreenStyles.js
import { StyleSheet, Platform } from "react-native";

const SettingsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
  },
  settingBlock: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "#666",
    marginRight: 8,
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  sliderContainer: {
    marginTop: 10,
    width: "100%",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerWrapper: {
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 8,
    width: "100%",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#bbb",
    marginVertical: 25,
    width: "100%",
    alignSelf: "center",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SettingsScreenStyles;
