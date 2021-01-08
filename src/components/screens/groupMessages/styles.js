import { StyleSheet } from 'react-native';
import {colors} from '../../styles';

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: colors.primary
    },
});

export default styles;