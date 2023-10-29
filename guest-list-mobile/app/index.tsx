import { useEffect, useState } from 'react';

import { Link, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import GuestItem from '../components/GuestItem';
import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  list: {
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

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const API_URL = 'http://45063d72-10f4-4077-a954-686bc0c70988.id.repl.co';

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams<{
    firstName?: Guest['firstName'];
    lastName?: Guest['lastName'];
  }>();

  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    async function loadGuests() {
      // const response = await fetch(`${API_URL}/guests`);
      // const fetchedGuests: Guest[] = await response.json();
      // setGuests(fetchedGuests);
    }

    async function postGuest(guest: Guest) {
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
      setGuests([...guests, newGuest]);
    }
    if (typeof firstName === 'string' && typeof lastName === 'string') {
      postGuest({ id: '0', attending: false, firstName, lastName }).catch(
        () => {},
      );
    }
    loadGuests().catch(() => {});
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
