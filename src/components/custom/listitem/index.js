import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const ListItem = ({title, code, selected = false, onPress}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <View style={styles.row}>
      <Text style={styles.text}> {title}</Text>
      <Text style={styles.text}> {code}</Text>
    </View>
  </TouchableOpacity>
);

ListItem.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
  code: PropTypes.string,
};

export default ListItem;