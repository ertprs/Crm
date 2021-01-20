import { StyleSheet, Dimensions } from 'react-native';

const Color =  {
    defaultColor: '#b2b2b2',
    backgroundTransparent: 'transparent',
    defaultBlue: '#0084ff',
    leftBubbleBackground: '#f0f0f0',
    black: '#000',
    white: '#fff',
    carrot: '#e67e22',
    emerald: '#2ecc71',
    peterRiver: '#3498db',
    wisteria: '#8e44ad',
    alizarin: '#e74c3c',
    turquoise: '#1abc9c',
    midnightBlue: '#2c3e50',
    optionTintColor: '#007AFF',
    timeTextColor: '#aaa',
};

 const styles = {
  left: StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'flex-start',
      },
      wrapper: {
          borderRadius: 15,
          backgroundColor: '#1D1C27',
          marginRight: 60,
          minHeight: 20,
          justifyContent: 'flex-end',
      },
      containerToNext: {
          borderBottomLeftRadius: 3,
      },
      containerToPrevious: {
          borderTopLeftRadius: 3,
      },
      bottom: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
      },
  }),
  right: StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'flex-end',
      },
      wrapper: {
          borderRadius: 15,
          backgroundColor: '#1D1C27',
          marginLeft: 60,
          minHeight: 20,
          justifyContent: 'flex-end',
      },
      containerToNext: {
          borderBottomRightRadius: 3,
      },
      containerToPrevious: {
          borderTopRightRadius: 3,
      },
      bottom: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
      },
  }),
  content: StyleSheet.create({
      tick: {
          fontSize: 10,
          backgroundColor: Color.backgroundTransparent,
          color: Color.white,
      },
      tickView: {
          flexDirection: 'row',
          marginRight: 10,
      },
      username: {
          top: -3,
          left: 0,
          fontSize: 12,
          backgroundColor: 'transparent',
          color: '#aaa',
      },
      usernameView: {
          flexDirection: 'row',
          marginHorizontal: 10,
      },
  }),
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  }
};

const markdownStyle = StyleSheet.create({
  autolink: {
    color: 'blue',
  },
  blockQuoteText: {
    color: 'grey'
  },
  blockQuoteSection: {
    flexDirection: 'row',
  },
  blockQuoteSectionBar: {
    width: 3,
    height: null,
    backgroundColor: '#DDDDDD',
    marginRight: 15,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgImageView: {
    flex: 1,
    overflow: 'hidden',
  },
  view: {
    alignSelf: 'stretch',
  },
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  del: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  em: {
    fontStyle: 'italic',
  },
  heading: {
    fontWeight: '200',
  },
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: '#cccccc',
    height: 1,
  },
  image: {
    height: 200, // Image maximum height
    width: Dimensions.get('window').width - 30, // Width based on the window width
    alignSelf: 'center',
    resizeMode: 'contain', // The image will scale uniformly (maintaining aspect ratio)
  },
  imageBox: {
    flex: 1,
    resizeMode: 'cover',
  },
  codeInline: {
    backgroundColor: 'grey',
    borderColor: '#dddddd',
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    padding: 7,
    color: 'white'
  },
    codeBlock: {
    fontFamily: 'RobotoMono-Regular',
    backgroundColor: '#27292C',
    padding: 20,
    fontSize: 12,
    color: 'white'
  },
  list: {
    backgroundColor: 'red'
  },
  sublist:{
    paddingLeft: 20,
    width: Dimensions.get('window').width - 60,
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemText: {
    flex: 1,
    
  },
  listItemBullet: {
    fontSize: 20,
    lineHeight: 20,
  },
  listItemNumber: {
    fontWeight: 'bold',
  },
  listRow: {
    flexDirection: 'row',
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  paragraphCenter: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paragraphWithImage: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0,
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#222222',
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontWeight: 'bold',
    padding: 5,
  },
  tableRow: {
    //borderBottomWidth: 1,
    borderColor: '#222222',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableRowLast: {
    borderColor: 'transparent',
  },
  tableRowCell: {
    padding: 5,
  },
  text: {
    color: 'white',
    fontSize: 13,
    padding: 7,
    textAlign: 'center',
    fontFamily: 'RobotoMono-Regular'
  },
  textRow: {
    flexDirection: 'row',
  },
  u: {
    borderColor: '#222222',
    borderBottomWidth: 1,
  },
})