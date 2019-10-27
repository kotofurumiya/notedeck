import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './containers/HomeScreen';
import { NoteScreen } from './containers/NoteScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  Note: {
    screen: NoteScreen,
    navigationOptions: () => ({
      header: null
    })
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaiew}>
      <AppContainer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaiew: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)',
    paddingVertical: 15
  }
});
