import React, { createContext, useState, useContext } from "react";

// Purpose of this is to provide functionality for the setting to adjust the font size globally in the app

// Create context
const FontSizeContext = createContext();

// Provider component
export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // default font size

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// Hook to use font size in components
export const useFontSize = () => useContext(FontSizeContext);
