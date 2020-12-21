/* eslint-disable react/no-unused-state */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import IconMd from 'react-native-vector-icons/MaterialIcons';

import bg from '../../../assets/images/bg.jpg';
import styles from './styles';

const DashboardView = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.topBody}>
        <Text style={styles.fieldDetail}> Good Morning Chisom Dike</Text>
        <TouchableOpacity
          style={styles.appButtonContainer}
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate('Barcode')}>
          <Text style={styles.appButtonText}>Punch In</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.lowerBody}>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
          <View style={styles.lowerCard}>
            <View style={styles.row}>
              <Text style={[styles.cardTitle, styles.light]}> Starkstech</Text>
              <IconMd
                name="biotech"
                size={24}
                style={[styles.icon, styles.light]}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.cardSubTile, styles.light]}>
                Software Develoment
              </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={styles.row}>
              <Text style={[styles.cardTitle, styles.light]}>
                {' '}
                StarksRecords
              </Text>
              <IconMd
                name="album"
                size={24}
                style={[styles.icon, styles.light]}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.cardSubTile, styles.light]}>
                Record Label & Record Studio
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={[styles.cardTitle, styles.primardDark]}> OmanL Co.</Text>
          <IconMd
            name="admin-panel-settings"
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
