import {StyleSheet} from 'react-native';

import {colors} from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    color: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 350,
    height: 40,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: colors.light,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
