import React from 'react';
import { Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { setChannel, setPrivateChannel } from '../../actions/channelActions';

const GroupList = (props) => {
    
    const dispatch = useDispatch();
    handlePress = () => {
        dispatch(setPrivateChannel(false));
        dispatch(setChannel(props.channel));
        props.navigation.navigate('ChatWindow');
    }

        const { channel } = props;
        console.log('FLATLIST CHANNEL');
        return (
            <ListItem
                onPress={handlePress}
                containerStyle={{ backgroundColor: 'transparent', elevation: 0.4 }}
                leftAvatar={{ rounded: true, source: { uri: channel.iconUrl } }}
                title={channel.name}
                titleStyle={{ color: 'white', fontFamily: 'RobotoMono-Regular', fontSize: 14 }}
                subtitle={
                    props.isTyping && props.isTyping.typing ? 
                    <Text style={{ color: '#1DB954', fontFamily: 'RototoMono-Regular', fontSize: 10 }}>Typing..</Text>
                    : channel.about
                }
                subtitleStyle={{ color: 'grey', fontSize: 12 }}
                chevron={{ color: 'grey' }}
            />
        )
}

export default GroupList;