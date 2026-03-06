import { StyleSheet } from 'react-native';

const AboutScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  heading: {
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#1E90FF',
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 22,
  },
  licenseItem: {
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default AboutScreenStyles;
