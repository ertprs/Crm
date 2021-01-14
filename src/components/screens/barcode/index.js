/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, PermissionsAndroid, Image, TouchableOpacity, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RNCamera} from 'react-native-camera';
import Snackbar from 'react-native-snackbar';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import BarcodeMask from 'react-native-barcode-mask';
import { useDispatch } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

import styles from './styles';
const Barcode = (props) => {
  const [torchOn, setTorch] = useState(false);
  const [adminrecords, setAdminRecords] = useState(null);
  const [coordinate, SetCoordinate] = useState(null);
  const db = firestore();
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchAdminRecords();
    requestLocationPermission();
  }, []);

  const toggleTorch = () => setTorch(!torchOn);

  const fetchAdminRecords = async () => {
    try {
      const docs = await db   
        .collection('adminrecords')
        .doc('UyniU00Nx00RZhJ7efQy')
        .get();
      const dbrecords = docs.data();
      setAdminRecords(dbrecords);
    } catch (error) {
      console.log('error fetching admin recs ', error);
    }
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log('You are Here', position);
        SetCoordinate(position.coords);
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        console.log(position);
        SetCoordinate(position.coords); 
      },
      (error) => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const barcodeRecognized = (scanResult) => {
    const day = moment().date();
    const month = moment().month() + 1; 
    const year = moment().year();
    console.log('scanResult', scanResult.data);
    if (adminrecords === null) {
       return Snackbar.show({
        text: 'Please ensure you have your internet connection is ok.',
          duration: Snackbar.LENGTH_LONG,
        });
      }

    if (scanResult.data == adminrecords.data) {
    
      const data = {
        coordinate,
        userId: auth().currentUser.uid,
        week: moment(new Date()).weeks(),
        punchedIn: true,
        punchOut: false,
        punchinTime: moment().format(),
        dayOfYear: `${auth().currentUser.uid}-${day}-${month}-${year}`, //this distinguishes each day punch
      };
      db.collection('attendance').doc(`${auth().currentUser.uid}-${day}-${month}-${year}`).set(data);
      db.collection('activities').add({
        event: "Punched In",
        createdAt: moment().format(),
        userId: auth().currentUser.uid,
      });
      dispatch({type: 'PUNCHED_IN', punchOutDay: `${auth().currentUser.uid}-${day}-${month}-${year}` });
      Snackbar.show({
        text: 'You have successfully punched in. ',
        duration: Snackbar.LENGTH_SHORT,
      });
      props.navigation.navigate('Dashboard');
    } else {
      const data = {
        coordinate,
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
