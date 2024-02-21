// Expo router Page to display a single user

import { useEffect, useState } from 'react';

import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const API_URL =
  'https://37820499-b115-4574-94d1-64870873aef3-00-2o18dc9ex4s5s.spock.replit.dev';

export default function Guests() {
  const { id } = useLocalSearchParams();

  const [guest, setGuest] = useState<Guest>();

  useEffect(() => {
    async function loadGuest() {
      const response = await fetch(`${API_URL}/guests/${id}`);
      const fetchedGuest = await response.json();
      setGuest(fetchedGuest);
    }
    loadGuest();
  }, [id]);

  if (!guest) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {guest.firstName} {guest.lastName}
      </Text>
      <Text style={styles.text}>
        {guest.attending ? 'Attending' : 'Not attending'}
      </Text>
    </View>
  );
}
