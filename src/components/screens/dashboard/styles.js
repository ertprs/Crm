import { StyleSheet, Dimensions } from 'react-native';

import { grey800 } from '../../styles/colors';
import { Fonts, colors } from '../../styles';

const { width } = Dimensions.get('window');
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
    zIndex: 1
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.light,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    height: 40,
    alignSelf: 'center'
  },
  appButtonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    alignSelf: 'center'
  },

  fieldDetail: {
    color: colors.white,
    fontSize: 26,
    fontFamily: Fonts.bold,
    alignSelf: 'center', 
    marginBottom: 50
  },

  card: {
    position: 'absolute',
    padding: 30,
    top: Platform.OS === 'ios' ? 400 : 230,
    zIndex: 20,
    height: 200,
    width: 350,
    alignSelf: 'center',
    backgroundColor: colors.light,
    elevation: 6,
    borderRadius: 15,
    justifyContent: 'space-between'
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
    justifyContent: 'space-between'
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
    justifyContent: 'space-between'
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
    backgroundColor: colors.primary
  },

  light: {
    color: colors.light,
  },

  icon: { marginTop: 5 },



  row: {
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  ml: {
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
  },

  mt: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 10,
  },


  services: {
    height: 110,
    width: (width / 3) - 20,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: colors.primary,
    marginLeft: 5, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  icon: { marginHorizontal: 5, color: colors.light },
  
});

export default styles;
