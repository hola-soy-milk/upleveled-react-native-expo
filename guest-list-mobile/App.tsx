import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import Header from './constants/Header';
import { colors } from './styles/constants';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import GuestItem from './constants/GuestItem';

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

const renderItem = (item: { item: Guest }) => <GuestItem guest={item.item} />;

export default function App() {
  let [guests, setGuests] = useState([
    {
      id: 1,
      firstName: 'Miralda',
      lastName: 'Flores',
      attending: true,
    },
    {
      id: 2,
      firstName: 'Ximena',
      lastName: 'Alvarez',
      attending: false,
    },
  ]);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  } else {
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
      </View>
    );
  }
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
