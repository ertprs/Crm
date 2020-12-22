/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import IconMd from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import bg from '../../../assets/images/bg.jpg'
import styles from './styles';



const DashboardView = (props) =>  {

    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.topBody}>
            <Text style={styles.fieldDetail}> Good Morning Chisom Dike</Text>
            <TouchableOpacity style={styles.appButtonContainer} activeOpacity={0.8} onPress={()=>  props.navigation.navigate('Barcode')}>
                <Text style={styles.appButtonText}>Punch In</Text>
            </TouchableOpacity>
        </ImageBackground>
        <View style={styles.lowerBody}>

            <View style={[styles.ml]}> 
                <View style={styles.services}>
                  <Icon name="account-circle" size={50} style={styles.icon} />
                </View>
                <View style={styles.services}>
                  <Icon name="settings" size={50} style={styles.icon} />
                </View>
                <View style={styles.services}>
                  <Icon name="settings" size={50} style={styles.icon} />
                </View>
            </View>
            <View style={[styles.mt]}> 
                <View style={styles.services}>
                  <Icon name="settings" size={50} style={styles.icon} />
                </View>
                <View style={styles.services}>
                  <Icon name="settings" size={50} style={styles.icon} />
                </View>
                <View style={styles.services}>
                  <Icon name="settings" size={50} style={styles.icon} />
                </View>
            </View>

        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.cardTitle, styles.primardDark]}> OmanL Co.</Text>
            <IconMd name="admin-panel-settings" size={24} style={[styles.icon, styles.primardDark]} />
          </View>
          <View style={styles.row}>
              <Text style={[styles.cardSubTile, styles.primardDark]}>
                Business Managment & Administration
              </Text>
          </View>
        </View>
      </View>
    );

}

export default DashboardView;
 