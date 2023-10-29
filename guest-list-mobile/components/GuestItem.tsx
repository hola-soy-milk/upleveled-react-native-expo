import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../styles/constants';

const styles = StyleSheet.create({
  right: {
    textAlign: 'right',
    fontSize: 10,
  },
  center: {
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.cardShadow,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'left',
  },
});

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  deadline?: string;
  attending: boolean;
};

type Props = {
  guest: Guest;
};

export default function GuestItem({ guest }: Props) {
  const { firstName, lastName, attending } = guest;

  return (
    <View style={styles.card}>
      <Text style={styles.center}>
        {firstName} {lastName}
      </Text>
      <Link href={`guests/${guest.id}`}>Check it out</Link>
      <Text style={styles.right}>{attending ? 'Coming!' : 'Not Coming'}</Text>
    </View>
  );
}
