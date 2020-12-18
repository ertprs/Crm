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
  // innerRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   paddingTop: 16,
  //   paddingBottom: 16,
  //   paddingRight: 8,
  // },
  // dividedRow: {
  //   flex: 1,
  //   marginLeft: 8,
  // },
  // innerRowContent: {
  //   flex: 1,
  // },
  // actionButtonIcon: {
  //   fontSize: 18,
  //   height: 20,
  //   color: colors.primary,
  // },
  // actionButtonMainIcon: {
  //   fontSize: 20,
  //   height: 22,
  //   color: colors.light,
  // },
  // actionButtonItem: {
  //   height: 56,
  //   width: 56,
  // },
  // actionButton: {
  //   fontSize: 24,
  //   height: 56,
  //   width: 56,
  //   paddingTop: 16,
  //   paddingLeft: 16,
  //   borderWidth: 1,
  //   borderColor: '#dedede',
  //   color: colors.primary,
  //   borderStyle: 'dashed',
  //   borderRadius: 2,
  // },
  // actioButtonTextStyle: {
  //   color: colors.primary,
  //   fontFamily: Fonts.regular,
  //   fontSize: 14,
  // },
  // photoStyle: {
  //   height: 56,
  //   resizeMode: 'cover',
  //   borderRadius: 2,
  //   width: 100,
  // },
  // photoDisplayStyle: {
  //   height: 300,
  //   resizeMode: 'cover',
  //   borderRadius: 0,
  // },
  // scrollView: {
  //   flexGrow: 1,
  //   backgroundColor: 'transparent',
  //   overflow: 'scroll',
  //   padding: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  // photoContainer: {
  //   flex: 1,
  //   elevation: 1,
  //   marginLeft: 16,
  //   borderRadius: 2,
  // },

  // footerButton: {
  //   height: 50,
  // },

  // footerBorderStyle: {
  //   backgroundColor: 'transparent',
  //   borderColor: 'transparent',
  //   borderWidth: 0,
  //   borderRadius: 0,
  // },
  // footerButtonCaption: {
  //   color: colors.light,
  //   fontSize: 14,
  //   fontFamily: Fonts.medium,
  // },
  // disabled: {
  //   opacity: 0.6,
  // },
  // alphabetSidebar: {
  //   position: 'absolute',
  //   backgroundColor: 'transparent',
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // avatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: Colors.lightGreen,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginRight: 8,
  //   marginLeft: 8,
  // },
  // appBar: {
  //   color: colors.light,
  //   fontFamily: Fonts.bold,
  //   textAlign: 'center',
  //   fontSize: 20,
  // },

  // // here

  // topContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // bottomContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginTop: 7,
  // },
  // iconContainer: {
  //   width: 22,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginRight: 10,
  // },
  // outletName: {
  //   fontSize: 16,
  //   fontFamily: Fonts.fontFamily.regular,
  //   color: Colors.textPrimary,
  // },
  // outletAddress: {
  //   flex: 1,
  //   fontSize: 14,
  //   fontFamily: Fonts.fontFamily.light,
  //   color: Colors.textPrimary,
  // },
  // iconRowRight: {
  //   marginLeft: 8,
  //   marginRight: 8,
  // },

  // multiline: {
  //   height: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // title: {
  //   fontFamily: Fonts.fontFamily.regular,
  //   fontSize: Fonts.fontSize.titleText,
  // },
  // description: {
  //   fontFamily: Fonts.fontFamily.regular,
  //   fontSize: Fonts.fontSize.text,
  // },
  // menuAnchor: {
  //   backgroundColor: 'transparent',
  //   width: 1,
  //   height: StyleSheet.hairlineWidth,
  // },
  // em: {
  //   fontFamily: Fonts.fontFamily.bold,
  // },
  // item: {
  //   margin: 8,
  // },
  // overlay: {
  //   bottom: 0,
  //   left: 0,
  //   position: 'absolute',
  //   right: 0,
  //   top: 0,
  //   zIndex: 9999,
  //   elevation: 4,
  // },
  // tile: {
  //   flexDirection: 'row',
  //   marginBottom: 8,
  //   flex: 1,
  //   alignItems: 'flex-start',
  // },
  // footer: {
  //   backgroundColor: colors.backgroundColor,
  //   flex: 0.3,
  //   overflow: 'visible',
  // },
  // chartBackground: {
  //   backgroundColor: Colors.primary,
  //   flex: 1,
  //   elevation: 4,
  // },
  // tileWrap: {
  //   flex: 1,
  // },
  // dummyTop: {
  //   flex: 0.66,
  // },
  // innerContainer: {
  //   borderRadius: 6,
  //   elevation: 4,
  //   backgroundColor: Colors.light,
  //   padding: 8,
  //   margin: 16,
  //   bottom: 0,
  //   flex: 0.34,
  //   justifyContent: 'center',
  // },
  // innerContainerX: {
  //   borderRadius: 6,
  //   elevation: 4,
  //   backgroundColor: Colors.light,
  //   padding: 8,
  // },
  // chartWrap: {
  //   paddingHorizontal: 16,
  //   backgroundColor: colors.primary,
  //   borderRadius: 6,
  //   elevation: 2,
  //   margin: 10,
  //   marginTop: 0,
  // },
  // heading: {
  //   fontFamily: Fonts.title,
  //   color: Colors.black,
  //   fontSize: 16,
  // },
  // rightTileGutter: {
  //   marginRight: 8,
  // },
  // labelContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 29.5,
  // },
  // figureContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   paddingTop: 20.5,
  // },

  // figure: {
  //   fontFamily: Fonts.title,
  //   color: Colors.black,
  //   fontSize: 14,
  // },

  // roundShape: {
  //   width: size,
  //   height: size,
  //   borderRadius: size,
  //   marginLeft: 50,
  //   alignSelf: 'center',
  // },
  // chartContainer: {
  //   flex: 1,
  // },
  // display: {
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  // },
  
  // animation: {
  //   padding: 50,
  //   zIndex: 5,
  //   marginTop: 100,
  //   right: 1,
  //   width,
  //   height: 200,
  //   position: 'absolute',
  // },
  // yaxis: {
  //   color: Colors.light,
  //   position: 'absolute',
  //   left: -30,
  //   fontWeight: '600',
  //   transform: [{ rotate: '90deg' }],
  // },
  // xaxis: {
  //   color: Colors.light,
  //   fontWeight: '600',
  //   marginTop: 125,
  // },
  // sectionHeaderRightItem: {
  //   fontFamily: Fonts.fontFamily.regular,
  //   color: colors.lightBlack,
  //   fontSize: Fonts.fontSize.caption,
  //   marginRight: 3,
  // },
  // sectionHeaderButtonItem: {
  //   color: colors.primary,
  //   marginRight: 3,
  // },
  // sectionHeaderRightWrap: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // sectionHeaderRightIcon: {
  //   color: colors.primary,
  // },
});

export default styles;
