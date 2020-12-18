import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { colors } from '../../styles';

import styles from './styles';
const Barcode = () => {
    const [torchOn, setTorch] = useState(false);
    const [Barcodes, setBarcodes] = useState([]);
    const handleTourch = (torchOn) => {}

    const barcodeRecognized = ({ bcodes }) =>{
        console.log('bar-codes', bcodes)
        setBarcodes(bcodes);  
    } 

    const  renderBarcode = ({ bounds, data }) => (
        <React.Fragment key={data + bounds.origin.x}>
          <View
            style={{
              borderWidth: 2,
              borderRadius: 10,
              position: 'absolute',
              borderColor: '#F00',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              padding: 10,
              ...bounds.size,
              left: bounds.origin.x,
              top: bounds.origin.y,
            }}
          >
            <Text style={{
              color: '#F00',
              flex: 1,
              position: 'absolute',
              textAlign: 'center',
              backgroundColor: 'transparent',
            }}>{data}</Text>
          </View>
        </React.Fragment>
      );

    const renderBarcodes = () => (
        <View>
          {Barcodes.map(renderBarcode)}
        </View>
      );
        
    return(
        <View style={styles.container}>
            <RNCamera
            style={styles.preview}
            flashMode={torchOn ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
            onGoogleVisionBarcodesDetected={barcodeRecognized}
            // ratio={"16.9"}
            googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL}
            googleVisionBarcodeMode={
              RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE
            }
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
                 {renderBarcodes()}
            <Text style={{
            color: colors.primaryDark
            }}>BARCODE SCANNER</Text>
            </RNCamera>
            <View style={styles.bottomOverlay}>
                <TouchableOpacity onPress={() => handleTourch(torchOn)}>
                <Image style={styles.cameraIcon}
                source={torchOn === true ? require('../../../assets/images/torch_on.png') : require('../../../assets/images/torch_off.png') } />
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default Barcode