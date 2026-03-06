import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const LoggerContext = React.createContext();

export const LoggerProvider = ({ children }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@Log");
        if (jsonValue != null) setState(JSON.parse(jsonValue));
      } catch (e) {
        console.error("Failed to load logs:", e);
      }
    };
    loadData();
  }, []);

  const addEvent = async (eventName, duration) => {
    const newEntry = {
      event: eventName,
      duration,
      timestamp: new Date().toISOString(),
    };

    const updatedState = [...state, newEntry];
    setState(updatedState);

    try {
      await AsyncStorage.setItem("@Log", JSON.stringify(updatedState));
    } catch (e) {
      console.error("Failed to save logs:", e);
    }

    // Logging all workouts on the server

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      await axios.post(
        "http://10.0.2.2:3000/workouts",
        {
          event: eventName,
          duration,
          timestamp: newEntry.timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Workout logged successfully on server");
    } catch (error) {
      console.error("Failed to log workout on server:", error.response?.data || error.message);
    }
  };

  return (
    <LoggerContext.Provider value={{ state, addEvent }}>
      {children}
    </LoggerContext.Provider>
  );
};


