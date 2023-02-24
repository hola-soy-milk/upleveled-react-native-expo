import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from '../components/Header';
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Link } from 'expo-router';

export default function NewGuest() {
  const [firstName, onFirstName] = useState('');
  const [lastName, onLastName] = useState('');
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label="New Guest" />
      <StatusBar
        backgroundColor={colors.cardBackground}
        translucent={true}
        style="dark"
      />
      <TextInput
        style={styles.input}
        onChangeText={onFirstName}
        placeholder="First Name"
        value={firstName}
      />
      <TextInput
        style={styles.input}
        onChangeText={onLastName}
        placeholder="Last Name"
        value={lastName}
      />
      <Link
        href={`/?firstName=${firstName}&lastName=${lastName}`}
      >
        Add
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  input: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});
