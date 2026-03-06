import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useFontSize } from '../contexts/FontSizeContext';
import styles from '../styles/AboutScreenStyles';  

const About = () => {
  const { fontSize } = useFontSize();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <FontAwesome5 name="running" size={72} color="#1E90FF" />
      </View>

      <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>About Glidr</Text>
      <Text style={[styles.paragraph, { fontSize }]}>
        Glidr is a fitness app designed to help you track workouts, so that you can 
        stay motivated in achieving your fitness goals. Whether you're training for competition
        or improving general health, Glidr empowers you with the tools to reach your goals.
      </Text>

      <Text style={[styles.heading, { fontSize: fontSize + 4 }]}>Open Source Licenses</Text>
      <Text style={[styles.paragraph, { fontSize }]}>
        This app relies on open source libraries that make development faster and more reliable.
        Below are the key licenses used by core packages that have been used to develop this application:
      </Text>

      <Text style={[styles.licenseItem, { fontSize }]}>• MIT License</Text>
      <Text style={[styles.licenseItem, { fontSize }]}>• Apache License 2.0</Text>
      <Text style={[styles.licenseItem, { fontSize }]}>• ISC License</Text>
    </ScrollView>
  );
};

export default About;
