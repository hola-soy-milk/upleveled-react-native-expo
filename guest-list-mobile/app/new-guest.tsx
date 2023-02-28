import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors } from '../styles/constants';
import { Link } from 'expo-router';

export default function NewGuest() {
  const [firstName, onFirstName] = useState('');
  const [lastName, onLastName] = useState('');
  return (
    <>
      <View>
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
      </View>
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
  input: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderColor: colors.cardShadow,
    borderWidth: 3,
    padding: 5,
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
