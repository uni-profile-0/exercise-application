import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';

export default function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? '#2f95dc' : '#ccc'}
    />
  );
}