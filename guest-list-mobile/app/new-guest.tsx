import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { colors } from '../styles/constants';
import { Link } from 'expo-router';

export default function NewGuest() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        placeholder="First Name"
        value={firstName}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        placeholder="Last Name"
        value={lastName}
      />
      <Link
        style={styles.button}
        href={`/?firstName=${firstName}&lastName=${lastName}`}
      >
        Add
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
});
