import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/constants';
import Constants from 'expo-constants';

type Props = {
  label: string;
};
export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.cardBackground,
    width: '100%',
  },
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  label: {
    color: colors.text,
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'Pacifico_400Regular',
  },
});
