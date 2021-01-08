import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import styles from './styles';

const ActivityItem = ({event, createdAt, selected = false, onPress}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={styles.row}>
      <Text style={styles.text}> {event}</Text>
      <Text style={styles.subtext}> {moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
    </View>
  </TouchableOpacity>
);

ActivityItem.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ActivityItem;