/* eslint-disable react/no-unused-state */
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import { TextInput, Button, Checkbox, Paragraph, TouchableRipple } from 'react-native-paper';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Appbar} from 'react-native-paper';
import BottomSheet from 'reanimated-bottom-sheet';
import moment from 'moment';
import {useNetInfo} from "@react-native-community/netinfo";

import bg from '../../../assets/images/bg.jpg';
import styles from './styles';
import colors from '../../styles/colors';
import {uploadImageToFirebase} from '../../lib/util';

const DashboardView = (props) => {
  const [image, updateImage] = useState(null);
  const [checked, setChecked] = useState(false);
  const [task, setTask] = useState("");
  const User = useSelector((state) => state.User);
  const {user, punchedIn, punchOutDay} = User;
  const db = firestore();
  const dispatch = useDispatch();
  const bs = React.createRef();
  const netInfo = useNetInfo();

  useEffect(()=>{
    checkNetworkStatus();
  })

  const checkNetworkStatus = () => {
    console.log('netinfo', netInfo.isConnected);
  }

  const pickSingle = (cropit, circular = false) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        updateImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        const path = uploadImageToFirebase(image, user, dispatch);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    dispatch({type: 'LOG_OUT'});
    auth().signOut();
    props.navigation.navigate('Login');
  };

  const openBottomSheet = () => {
    bs.current.snapTo(0);
  }

  const Header = () => (
    <Appbar.Header style={{backgroundColor: colors.primaryDark}}>
      <Appbar.Action
        icon="menu"
        onPress={() => props.navigation.toggleDrawer()}
      />
      <Appbar.Content title="User Dashboard" />
      <Appbar.Action icon="power-settings" onPress={logout} />
    </Appbar.Header>
  );

  const renderContent = () => (
    <View style={styles.bottomsheet}>
      <TextInput
        label="Task for the day"
        type="outlined"
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setTask(text)}
        value={task}
        style={styles.textinput}
        placeholder="Enter your task for the day"
      />
      <View style={{ marginTop: 2}}>
        <Button icon="check-all" mode="contained" style={styles.button} onPress={() => punchOut()}>
          Submit
        </Button>
        <Button icon="cancel" mode="outlined" style={[styles.button]} onPress={() =>  bs.current.snapTo(1)}>
          Cancel
        </Button>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <TouchableRipple onPress={() => setChecked(!checked)}>
        <View style={styles.checkboxRow}>
          <View pointerEvents="none">
            <Checkbox status={checked ? 'checked' : 'unchecked'} />
          </View>
          <Paragraph>Ignore Task</Paragraph>
        </View>
      </TouchableRipple>
      
    </View>
  );

  const punchOut = () => {
    const day = moment().date();
    const month = moment().month();  // jan=0, dec=11
    const year = moment().year();
    if(punchOutDay !== null || punchOutDay !== undefined){
      return;
    }
    try{
      if(checked === false) {
        if(task === ''){
          Alert.alert(
            'Info',
            'Please ensure you enter the task for the day.',
            [
            
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
          return;
        }
        const data = {
          task,
          userId: auth().currentUser.uid,
          punchedIn: false,
          punchOut: true,
          punchoutTime: moment().format(),
          dayOfYear: `${day}/${month}/${year}`, //this distinguishes each day punch
        };
        db.collection('attendance').doc(`${auth().currentUser.uid}/${punchOutDay}`).set(data);
      } else {
        const data = {
          userId: auth().currentUser.uid,
          punchedIn: false,
          punchOut: true,
          punchoutTime: moment().format(),
          dayOfYear: `${day}/${month}/${year}`, //this distinguishes each day punch
        };
        db.collection('attendance').doc(`${auth().currentUser.uid}/${punchOutDay}`).set(data);
      }  
        //  redux to punch
        dispatch({type: 'PUNCHED_OUT'});
        bs.current.snapTo(1);
    } catch (error) {
      console.log('error-', error);
    }
  }

  const renderBottomSheet = () => (
    <BottomSheet
    ref={bs}
    snapPoints={[330, 0]}
    renderContent={renderContent}
    renderHeader={renderHeader}
    initialSnap={1}
    enabledGestureInteraction={true}
    />
  )

  return (
    <View style={styles.container}>
      {Header()}
      <ImageBackground source={bg} style={styles.topBody}>
        <FastImage
          source={{
            uri:
              user.image !== undefined
                ? user.image
                : 'https://storage.googleapis.com/omanl-1c81a.appspot.com/avatar.jpg',
            priority: FastImage.priority.normal,
          }}
          style={styles.profile}
        />
        <TouchableOpacity
          style={styles.editProfile}
          activeOpacity={0.8}
          onPress={() => pickSingle(false)}>
          <Icon name="camera-plus-outline" size={15} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.fieldDetail}>Welcome {user.name}</Text>
      </ImageBackground>
      <View style={styles.lowerBody}>

      <View style={[styles.ml]}>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}>
              <Icon
                name="tune"
                size={45}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Omanl & Co</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}>
              <Icon name="terraform" size={45} style={styles.icon} />
              <Text style={styles.iconText}>StarksTech</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.navigate('Users')}
              style={{alignItems: 'center'}}>
              <Icon name="terrain" size={45} style={styles.icon} />
              <Text style={styles.iconText}>StarksRecord</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.ml]}>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}>
              <Icon
                name="calendar-account-outline"
                size={45}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Activities</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}
              onPress={() => props.navigation.navigate('Profile')}>
              <Icon name="camera-front-variant" size={45} style={styles.icon} />
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.navigate('Users')}
              style={{alignItems: 'center'}}>
              <Icon name="book-music" size={45} style={styles.icon} />
              <Text style={styles.iconText}>Record Label</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.mt, styles.marginTp]}>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}
              onPress={()=> props.navigation.navigate('EditProfile')}
              >
              <Icon
                name="badge-account-horizontal"
                size={45}
                style={styles.icon}
              />
              <Text style={styles.iconText}>User Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => punchedIn ? openBottomSheet() : props.navigation.navigate('Barcode')}
              style={{alignItems: 'center'}}>
              <Icon name="gesture-tap-button" size={45} style={styles.icon} />
              <Text style={styles.iconText}>{ punchedIn ? 'Punch Out': 'Punch In'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{alignItems: 'center'}}
              onPress={() => props.navigation.navigate('Logs')}>
              <Icon name="book-open" size={45} style={styles.icon} />
              <Text style={styles.iconText}>Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    
          {renderBottomSheet()}
    </View>
  );
};

export default DashboardView;
