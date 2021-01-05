import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {colors} from '../../styles';

import logo from '../../../assets/images/logo.png';

const Login = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (email === '') {
        Snackbar.show({
          text: 'Please enter a valid email',
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(false);
        return;
      } else if (password === '') {
        Snackbar.show({
          text: 'Please enter your password',
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(false);
        return;
      }
      const res = await auth().signInWithEmailAndPassword(email, password);
      const {uid} = res.user._user;
      const doc = await firestore().collection('users').doc(uid).get();
      const user = doc.data();
      props.navigation.reset({ index: 0, routes: [{ name: 'Home' }],});
      dispatch({type: 'FETCH_USER', user});
    } catch (error) {
      Snackbar.show({
        text: `${error}`,
        duration: Snackbar.LENGTH_LONG,
      });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={colors.primary} animating />
        </View>
      ) : (
        <View>
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
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
              <View>
                <View style={styles.row}>
                  <Icon name="lock" size={16} style={styles.icon} />
                  <Text style={styles.displayText}> Password </Text>
                </View>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.83}
                onPress={handleLogin}>
                <Text style={{color: colors.light, alignSelf: 'center'}}>
                  {' '}
                  Continue{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Signup')}
                activeOpacity={0.83}
                style={styles.createaccount}>
                <Text style={{color: colors.blueGrey, alignSelf: 'center'}}>
                  Create new account
                </Text>
                <Icon name="arrow-right" size={16} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Login;
