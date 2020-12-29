import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors } from '../../styles';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    },
    preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
    },
    cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
    tintColor: colors.light,
    },
    bottomOverlay: {
    position: "absolute",
    width: "100%",
    flex: 20,
    flexDirection: "row",
    justifyContent: "space-between"
    },
});
