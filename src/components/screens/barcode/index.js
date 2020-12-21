import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { RNCamera } from 'react-native-camera';
import { colors } from '../../styles';

import styles from './styles';
const Barcode = () => {
    const [torchOn, setTorch] = useState(false);
    const [barcode, setBarcode] = useState([]);
    const [adminrecords, setAdminRecords] = useState(false);
    const db = firestore();

    useEffect(()=> {
      fetchAdminRecords();
    },[]);
  
    const toggleTorch = () => setTorch(!torchOn);

    const fetchAdminRecords = async () => {
      try{
        const docs = await db.collection('adminrecords').doc('xKMhN375dbSsjzB8K2Nb').get(); // check where the week matches this week - use moment to get the week and the created and updated at
        const dbrecords = docs.data();
        console.log('fethcadminrecords', dbrecords);
      setAdminRecords(dbrecords)
      } catch(error) {
        console.log('error fetching admin recs ', error);
      }
    }

  //   const fetchAdminRecords = async () => {
  //    await db.collection('adminrecords').doc('xKMhN375dbSsjzB8K2Nb')
  //     .onSnapshot((querySnapshot) => {
  //       const results = [];
  //       querySnapshot.forEach((doc) => {
  //         results.push(doc.data());
  //       });
  //       setBranches(results);
  //     }, handleError);
  // }

    const barcodeRecognized = (scanResult) => {
      const data = "1234565"
        setBarcode(scanResult);
        console.log('result', scanResult.data);
        if(scanResult.data == data) {
          // punch the person in { date and now, uid of the user} - store in sub collection using uid of the user
          // firestore.collection('users').(uid).collection('attendance').add(data)
          //navigate to dashboard
        } else {
          //throw erro and add to the management notfication of wrong barcode scanned in firestore                                           

        }
        // fetch data from firestore  
        // compare the result with the value obtained from the database 
       // punch the person in if correct or throw an error for scanning a wrong barcode and notify us
      
    } 

    return(
        <View style={styles.container}>
            <RNCamera
            style={styles.preview}
            flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            onBarCodeRead={barcodeRecognized}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
                 
            <Text style={{
            color: colors.primaryDark
            }}>BARCODE SCANNER</Text>
            </RNCamera>
            <View style={styles.bottomOverlay}>
                <TouchableOpacity onPress={toggleTorch}>
                <Image style={styles.cameraIcon}
                source={torchOn === true ? require('../../../assets/images/torch_off.png') : require('../../../assets/images/torch_on.png')} />
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default Barcode