import React, { useEffect } from 'react';
import {View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { setChannel, setPrivateChannel } from '../../actions/channelActions';
import styles from './style';

const UserList  = props => {

    const dispatch = useDispatch();
    const handlePress = () => {
        dispatch(setChannel(props.user));
        dispatch(setPrivateChannel(true));
        props.navigation.navigate('ChatWindow')
    }

    const { user } = props;
        return (
            <ListItem
                onPress={handlePress}
                containerStyle={{ backgroundColor: 'transparent', elevation: 0.5, borderColor: 'transparent' }}
                rightIcon={

                    props.unreadCount && props.unreadCount.count ? 
                    <View style={{ height: 20, width: 20, borderRadius: 10, backgroundColor: '#f80000' }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>{props.unreadCount ? props.unreadCount.count : null}</Text>
                    </View> : null
                }
                leftAvatar={{ rounded: true, source: { uri: user.avatar } }}
                title={user.name}
                titleStyle={{ color: 'white', fontFamily: 'RobotoMono-Regular', fontSize: 14 }}
                subtitleStyle={{ color: 'white' }}
                subtitle={
                    props.isTyping && props.isTyping.typing ? 
                    <Text style={{ color: '#1DB954', fontFamily: 'RototoMono-Regular', fontSize: 10 }}>Typing..</Text>
                    : null
                }
                chevron={{ color: 'grey' }}
            />
        )
}


export default UserList;