import { StyleSheet, Dimensions } from 'react-native';


const ScreenHeigth = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        margin: ScreenHeigth*0.02,
        backgroundColor: 'red',
        flex: 1
    },
    itemContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        height: ScreenHeigth * 0.08,
    },
    imageContainer: {
        flex: 0.1,
        marginLeft: ScreenWidth*0.04
    },  
    detailsContainer: {
        flex: 0.7,
        marginLeft: ScreenWidth*0.05
    },
    status: {
        flex: 0.2
    },
    nameText: {
        fontFamily: 'RobotoMono-Medium'
    }
})


export default styles;