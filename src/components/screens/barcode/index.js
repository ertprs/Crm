import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RNCamera} from 'react-native-camera';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import {colors} from '../../styles';

import styles from './styles';
const Barcode = (props) => {
  const [torchOn, setTorch] = useState(false);
  const [barcode, setBarcode] = useState([]);
  const [adminrecords, setAdminRecords] = useState(false);
  const db = firestore();

  console.log('moment', moment());

  useEffect(() => {
    fetchAdminRecords();
  }, []);

  const toggleTorch = () => setTorch(!torchOn);

  const fetchAdminRecords = async () => {
    try {
      const docs = await db
        .collection('adminrecords')
        .doc('xKMhN375dbSsjzB8K2Nb')
        .get();
      const dbrecords = docs.data();
      setAdminRecords(dbrecords);
    } catch (error) {
      console.log('error fetching admin recs ', error);
    }
  };

  const barcodeRecognized = (scanResult) => {
    setBarcode(scanResult);

    if (scanResult.data == adminrecords.data) {
      Snackbar.show({
        text: `${moment()} - ${auth().currentUser.uid}`,
        duration: Snackbar.LENGTH_LONG,
      });
      const data = {
        userId: auth().currentUser.uid,
        week: moment(new Date()).weeks(),
        punchedIn: true,
        datetime: moment(),
      };
      db.collection('attendance').add(data);
      // db.collection('users').(uid).collection('attendance').add(data)
      Snackbar.show({
        text: 'You have successfully punched in. ',
        duration: Snackbar.LENGTH_SHORT,
      });
      props.navigate('Dashboard');
    } else {
      const data = {
        userId: auth().currentUser.uid,
        week: moment(new Date()).weeks(),
        punchedIn: false,
        reason: 'Scanned Wrong Barcode',
      };
      db.collection('attendance_notifications').add(data);
      Snackbar.show({
        text: 'Invalid Barcode scanned ',
        duration: Snackbar.LENGTH_LONG,
      });
      props.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        flashMode={
          torchOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        onBarCodeRead={barcodeRecognized}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <Text
          style={{
            color: colors.primaryDark,
          }}>
          BARCODE SCANNER
        </Text>
      </RNCamera>
      <View style={styles.bottomOverlay}>
        <TouchableOpacity onPress={toggleTorch}>
          <Image
            style={styles.cameraIcon}
            source={
              torchOn === true
                ? require('../../../assets/images/torch_off.png')
                : require('../../../assets/images/torch_on.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Barcode
