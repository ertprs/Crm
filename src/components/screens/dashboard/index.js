/* eslint-disable react/no-unused-state */
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {Appbar} from 'react-native-paper';

import bg from '../../../assets/images/bg.jpg';
import styles from './styles';
import colors from '../../styles/colors';
import {uploadImageToFirebase} from '../../lib/util';

const DashboardView = (props) => {
  const [image, updateImage] = useState(null);
  const User = useSelector((state) => state.User);
  const {user} = User;
  const db = firestore();
  const dispatch = useDispatch();

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
              style={{alignItems: 'center'}}>
              <Icon name="camera-front-variant" size={45} style={styles.icon} />
              <Text style={styles.iconText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.services}>
            <TouchableOpacity
              activeOpacity={0.8}
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
              style={{alignItems: 'center'}}>
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
              onPress={() => props.navigation.navigate('Barcode')}
              style={{alignItems: 'center'}}>
              <Icon name="gesture-tap-button" size={45} style={styles.icon} />
              <Text style={styles.iconText}>Punch In</Text>
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

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle, styles.primardDark]}> OmanL Co.</Text>
          <IconMd
            name="tune"
            size={24}
            style={[styles.icon, styles.primardDark]}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.cardSubTile, styles.primardDark]}>
            Business Managment & Administration
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DashboardView;
