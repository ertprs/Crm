import {StyleSheet, Dimensions, Platform} from 'react-native';

import {grey800} from '../../styles/colors';
import {Fonts, colors} from '../../styles';

const {width} = Dimensions.get('window');
const size = 8;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  topBody: {
    backgroundColor: colors.primary,
    flex: 1,
    width,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  lowerBody: {
    backgroundColor: colors.light,
    flex: 1.4,
    width,
    zIndex: 1,
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.light,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    height: 40,
    alignSelf: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },

  fieldDetail: {
    color: colors.white,
    fontSize: 18,
    fontFamily: Fonts.regular,
    alignSelf: 'center',
    marginBottom: 20,
  },

  card: {
    position: 'absolute',
    padding: 30,
    top: Platform.OS === 'ios' ? 400 : 210,
    zIndex: 20,
    height: 190,
    width: 350,
    alignSelf: 'center',
    backgroundColor: colors.light,
    elevation: 6,
    borderRadius: 15,
    justifyContent: 'space-between',
  },

  lowerCard: {
    padding: 25,
    zIndex: 2,
    height: 170,
    width: 350,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    elevation: 4,
    borderRadius: 15,
    marginTop: 150,
    justifyContent: 'space-between',
  },

  cards: {
    padding: 25,
    zIndex: 2,
    height: 170,
    width: 350,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    elevation: 4,
    borderRadius: 15,
    marginTop: 15,
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontFamily: Fonts.bold,
    fontSize: 26,
  },

  cardSubTile: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },

  primardDark: {
    color: colors.primaryDark,
  },

  bgColor: {
    backgroundColor: colors.primary,
  },

  light: {
    color: colors.light,
  },

  row: {
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ml: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,
  },

  mt: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,
  },

  services: {
    height: 100,
    width: width / 3 - 20,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: colors.primary,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 5,
    color: colors.light,
  },
  iconText: {
    color: colors.light,
    fontSize: 14,
    fontWeight: '600',
  },

  profile: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: '#fff',
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },

  marginTp: {
    marginTop: 10,
  },

  editProfile: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 130,
    zIndex: 20,
    right: 135,
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 6,
    elevation: 4,
  },

  logout: {
    position: 'absolute',
    padding: 1,
    top: Platform.OS === 'ios' ? 20 : 10,
    zIndex: 20,
    alignSelf: 'flex-end',
    backgroundColor: colors.light,
    elevation: 6,
    borderRadius: 15,
    right: 10,
  },
});

export default styles;
