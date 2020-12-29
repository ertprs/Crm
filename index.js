/**
 * @format
 */
import React from 'react';
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const Root = () => {
    return (
      <SafeAreaView style={styles.container}>
        <App />
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

AppRegistry.registerComponent(appName, () => Root);
