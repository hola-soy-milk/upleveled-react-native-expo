import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import GuestItem from '../components/GuestItem';
import { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const API_URL = "http://45063d72-10f4-4077-a954-686bc0c70988.id.repl.co"

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams();
  
  const [guests, setGuests] = useState<Guest[]>([
  ]);

  useEffect(() => {
    async function loadGuests() {
      const response = await fetch(`${API_URL}/guests`);
      const fetchedGuests: Guest[] = await response.json();
      setGuests(fetchedGuests)
    }
    async function postGuest(guest: Guest) {
      const response = await fetch(`${API_URL}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      })
      const newGuest: Guest = await response.json();
      setGuests([...guests, newGuest])
    }
    loadGuests();

    if (firstName && lastName ) {
      postGuest({firstName, lastName})
    }
  }, [firstName, lastName]);

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Header label="Guest List" />
      <StatusBar style="auto" />

      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: Guest) => item.id}
      />
      <Link href="/new-guest">New Guest</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
});
