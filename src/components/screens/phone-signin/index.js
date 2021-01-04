import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import styles from './styles';

const PhoneSignIn = () => {
  const [phone, setPhoneNumber] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);

  const handleSendCode = async () => {
    // Request to send OTP
    const confirmation = await auth().signInWithPhoneNumber(phone);
    setConfirm(confirmation);
  };

  const handleVerifyCode = async (code) => {
    if (code.length < 6) {
      return;
    }
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={styles.textInput}
          placeholder="Verification code"
          placeholderTextColor="#eee"
          value={verificationCode}
          keyboardType="numeric"
          onChangeText={(verificationCode) => {
            setVerificationCode(verificationCode);
          }}
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.themeButton, {marginTop: 20}]}
          onPress={handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#333'}]}>
      <View style={styles.page}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number with country code"
          placeholderTextColor="#eee"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(phoneno) => {
            setPhoneNumber(phoneno);
          }}
          maxLength={15}
          editable={confirm ? false : true}
        />

        <TouchableOpacity
          style={[styles.themeButton, {marginTop: 20}]}
          onPress={confirm ? handleVerifyCode : handleSendCode}>
          <Text style={styles.themeButtonTitle}>
            {confirm ? 'Change Phone Number' : 'Send Code'}
          </Text>
        </TouchableOpacity>

        {confirm ? renderConfirmationCodeView() : null}
      </View>
    </SafeAreaView>
  );
};

export default PhoneSignIn;
