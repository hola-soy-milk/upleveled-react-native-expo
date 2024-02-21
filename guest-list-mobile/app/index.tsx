import { useEffect, useState } from 'react';

import { Link, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import GuestItem from '../components/GuestItem';
import { colors } from '../styles/constants';

const API_URL =
  'https://37820499-b115-4574-94d1-64870873aef3-00-2o18dc9ex4s5s.spock.replit.dev';

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.cardBackground,
    fontSize: 24,
  },
  list: {
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
  },
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

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams<{
    firstName?: Guest['firstName'];
    lastName?: Guest['lastName'];
  }>();
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    async function callApi() {
      const response = await fetch(`/hello`);
      const data = await response.json();
      console.log(data);
    }
    async function loadGuests() {
      const response = await fetch(`${API_URL}/guests`);
      const fetchedGuests: Guest[] = await response.json();
      setGuests(fetchedGuests);
    }
    async function postGuest(guest: { firstName: string; lastName: string }) {
      const response = await fetch(`${API_URL}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: guest.firstName,
          lastName: guest.lastName,
        }),
      });
      const newGuest: Guest = await response.json();
      setGuests((g) => [...g, newGuest]);
    }
    loadGuests().catch(console.error);
    callApi().catch(console.error);

    if (typeof firstName === 'string' && typeof lastName === 'string') {
      postGuest({ firstName, lastName }).catch(console.error);
    }
  }, [firstName, lastName]);
  return (
    <>
      <FlatList
        style={styles.list}
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item: Guest) => item.id}
      />
      <Link style={styles.button} href="/new-guest">
        New Guest
      </Link>
    </>
  );
}
