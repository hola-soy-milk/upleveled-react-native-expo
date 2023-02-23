import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from '../components/Header';
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Link } from 'expo-router';

type NativeStackParams = {
  index: { guest: Guest };
};

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

export default function NewPost() {
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
      <Header label="New Post" />
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
        href={{
          pathname: '/index',
          params: {
            guest: {
              id: '1',
              firstName,
              lastName,
              attending: false,
            },
          },
        }}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});
