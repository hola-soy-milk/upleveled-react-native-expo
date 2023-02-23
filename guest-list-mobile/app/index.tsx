import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { colors } from '../styles/constants';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import GuestItem from '../components/GuestItem';
import { useEffect, useState } from 'react';
import { Link, useLocalSearchParams, useSearchParams } from 'expo-router';

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function Index() {
  const { firstName, lastName } = useLocalSearchParams();
  
  let [guests, setGuests] = useState([
    {
      id: 1,
      firstName: 'Miralda',
      lastName: 'Flores',
      deadline: 'none',
      attending: true,
    },
    {
      id: 2,
      firstName: 'Ximena',
      lastName: 'Alvarez',
      deadline: 'none',
      attending: false,
    },
  ]);

  useEffect(() => {
    console.log("Now I have a guest: ", firstName, lastName)
    if (firstName && lastName ) {
      setGuests([...guests, {id: 1, firstName, lastName, attending: false, deadline: 'none'}]);
    }
  }, [firstName, lastName]);
  let [fontsLoaded] = useFonts({
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
      <Link href="/new-post">New Post</Link>
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
