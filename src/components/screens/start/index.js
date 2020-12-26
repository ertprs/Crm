import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

import styles from './styles';
import logo from '../../../assets/images/logo.png';

const Start = (props) => {

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.appButtonText}>Get Started </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;
