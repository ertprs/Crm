import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from './AppStyles';
import {colors} from '../../styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [fullname, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const data = {
        email: email,
        displayName: fullname,
        phone: phone,
      };
      const {navigation} = props;

      const user_uid = response.user._user.uid;

      firestore().collection('users').doc(user_uid).set(data);

      const docs = await firestore().collection('users').doc(user_uid).get();

      const user = docs.data();
      console.log('user', user);
      setLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      const {code, message} = error;
      console.log('error--->', message);
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={AppStyles.indicator}>
          <ActivityIndicator size="large" color={colors.primary} animating />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={[styles.title, styles.leftTitle]}>
            Create new account
          </Text>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Full Name"
              onChangeText={(text) => setName(text)}
              value={fullname}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Phone Number"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="E-mail Address"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <TextInput
              style={styles.body}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
          </View>
          <Button
            containerStyle={[styles.facebookContainer, {marginTop: 50}]}
            style={styles.facebookText}
            onPress={() => onRegister()}>
            Sign Up
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: colors.primaryDark,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: colors.primaryDark,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
});

export default SignupScreen;
