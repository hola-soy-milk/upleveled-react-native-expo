import React from 'react';

import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../styles/constants';

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
    fontFamily: 'Pacifico_400Regular',
    fontSize: 32,
    textAlign: 'center',
  },
});
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
