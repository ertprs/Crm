import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Appbar} from 'react-native-paper';

import { Email, ProfileSeperator, Tel } from '../../custom';
import bg from '../../../assets/images/bg.jpg';
import colors from '../../styles/colors';
import styles from './styles';

const Contact = (props) => {
    const User = useSelector((state) => state.User);
    const {user} = User;
    const dispatch = useDispatch();

    const onPressPlace = () => {
        console.log('place')
    }

    const onPressTel = number => {
        Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
    }

    const onPressSms = () => {
        console.log('sms')
    }

    const onPressEmail = email => {
        Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
        console.log('Error:', err)
        )
    }

    const  renderHeader = () => {

        return (
        <View style={styles.headerContainer}>
            <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={bg}
            >
            <View style={styles.headerColumn}>
                <Image
                style={styles.userImage}
                source={{uri: user.image === undefined ? 'https://storage.googleapis.com/omanl-1c81a.appspot.com/avatar.jpg' : user.image}}
                />
                <Text style={styles.userNameText}>{user.name}</Text>
                {/* <View style={styles.userAddressRow}>
                <View>
                    <Icon
                    name="place"
                    underlayColor="transparent"
                    iconStyle={styles.placeIcon}
                    onPress={onPressPlace}
                    />
                </View>
                <View style={styles.userCityRow}>
                    <Text style={styles.userCityText}>
                    {city}, {country}
                    </Text>
                </View>
                </View> */}
            </View>
            </ImageBackground>
        </View>
        )
    }

    const Header = () => (
        <Appbar.Header style={{backgroundColor: colors.primaryDark}}>
            <Appbar.BackAction onPress={()=> props.navigation.goBack()} />
          <Appbar.Content title="Profile Page" />
        </Appbar.Header>
    );

    const renderTel = () => (
        <Tel
            key={`tel-${user.uid}`}
            number={user.phone}
            onPressSms={onPressSms}
            onPressTel={onPressTel}
        />
    )
     

    const renderEmail = () =>  (
        <Email
            key={`email-${user.uid}`}
            email={user.email}
            onPressEmail={onPressEmail}
        />
    )
    

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {Header()}
            {renderHeader()}
            {renderTel()}
            {ProfileSeperator()}
            {renderEmail()}
          </Card>
        </View>
      </ScrollView>
    )

}

export default Contact