import React, { useState, useEffect } from 'react';
import {
  View, Image, Text, TextInput, TouchableOpacity, 
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'
import { colors } from '../../styles';

import logo from '../../../assets/images/logo.png';

const Login = (props) => {
    const [errorMessage, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // if (email === '') {
        //   Snackbar.show({
        //     text: 'Please enter a valid email',
        //     duration: Snackbar.LENGTH_SHORT,
        //   });
        //   return;
        // } else if (password === '') {
        //   Snackbar.show({
        //     text: 'Please enter your password',
        //     duration: Snackbar.LENGTH_SHORT,
        //   });
        //   return;
        // } 
        //   const userData = {
        //     email,
        //     password
        //   };
          // perform firebase store
        
        // perform login query
        // store the login data into redux
        props.navigation.navigate("Dashboard")
    }

    return (
        <View style={styles.container}>
             <View style={styles.topBody}>
              <Image source={logo} style={styles.logo} tintColor={colors.light} />
            </View>
            <View style={styles.lowerBody} />
           <View style={styles.card}>
                <Text style={styles.login}> Login </Text>
                <View>
                    <View>
                        <View style={styles.row}>
                            <Icon name="account-circle" size={16} style={styles.icon} />
                            <Text style={styles.displayText}> Email </Text>
                        </View>
                        <TextInput style={styles.input} underlineColorAndroid="transparent" autoCapitalize="none" onChangeText={(email) => setEmail(email)} />
                    </View>
                    <View>
                        <View style={styles.row}>
                            <Icon name="lock" size={16} style={styles.icon} />
                            <Text style={styles.displayText}> Password </Text>
                        </View>
                        <TextInput style={styles.input} secureTextEntry underlineColorAndroid="transparent" onChangeText={(password) => setPassword(password)} />
                    </View>
                    <TouchableOpacity style={styles.button} activeOpacity={0.83} onPress={handleLogin}>
                        <Text style={{ color: colors.light, alignSelf: 'center' }}> Continue </Text>
                    </TouchableOpacity>
                </View>
            </View> 
           
      </View>
   
    )
}

export default Login;