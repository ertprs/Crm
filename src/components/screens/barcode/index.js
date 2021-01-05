/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RNCamera} from 'react-native-camera';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import BarcodeMask from 'react-native-barcode-mask';
import { useDispatch } from 'react-redux';

import {colors} from '../../styles';

import styles from './styles';
const Barcode = (props) => {
  const [torchOn, setTorch] = useState(false);
  const [adminrecords, setAdminRecords] = useState(null);
  const [barcodes, setBarcode] = useState(null);
  const db = firestore();
  const dispatch = useDispatch();
  
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
    const day = moment().date();
    const month = moment().month();  // jan=0, dec=11
    const year = moment().year();
    console.log('scanResult', scanResult.data);
    if (adminrecords === null) {
       return Snackbar.show({
        text: 'Please ensure you have your internet connection is ok.',
          duration: Snackbar.LENGTH_LONG,
        });
      }

    if (scanResult.data == adminrecords.data) {
      Snackbar.show({
        text: `${moment()} - ${auth().currentUser.uid}`,
        duration: Snackbar.LENGTH_LONG,
      });
      const data = {
        userId: auth().currentUser.uid,
        week: moment(new Date()).weeks(),
        punchedIn: true,
        punchOut: false,
        punchinTime: moment().format(),
        dayOfYear: `${day}/${month}/${year}`, //this distinguishes each day punch
      };
      db.collection('attendance').doc(`${auth().currentUser.uid}/${day}/${month}/${year}`).set(data);
      dispatch({type: 'PUNCHED_IN', punchOutDay: `${day}/${month}/${year}` });
      Snackbar.show({
        text: 'You have successfully punched in. ',
        duration: Snackbar.LENGTH_SHORT,
      });
      props.navigation.navigate('Dashboard');
    } else {
      const data = {
        userId: auth().currentUser.uid,
        week: moment(new Date()).weeks(),
        punchedIn: false,
        datetime: moment().format(),
        reason: 'Scanned Wrong Barcode',
      };
      db.collection('attendance_notifications').add(data);
      Snackbar.show({
        text: 'Invalid Barcode scanned ',
        duration: Snackbar.LENGTH_LONG,
      });
      props.navigation.navigate('Dashboard');
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
          <BarcodeMask outerMaskOpacity={0.8} />
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
