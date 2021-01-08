import React,{ useState, useEffect} from 'react';
import { View, FlatList } from 'react-native';
import { FAB, Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Seperator, ActivityItem } from '../../custom';
import styles from './styles';

const GroupMessages = (props) => {
    const [userLogs, setLogs] = useState([]);
    const db = firestore();

    useEffect(()=>{
        fetchLogs();
    },[]);

    const fetchLogs = async () => {
        try {
            const results = [];
            const querySnapshot = await db
                .collection('activities')
                .where('userId', '==',auth().currentUser.uid)
                .get();

            querySnapshot.forEach((doc) => {
                results.push(doc.data());
              });
              setLogs(results);
        } catch (error) {
          console.log('error fetching admin recs ', error);
        }
      };

    const renderEmptyContainer = () => (
        <View/>
    )

    const header = () => (
        <Appbar.Header>
            <Appbar.BackAction onPress={()=> props.navigation.goBack()} />
            <Appbar.Content title="Channels"  />
        </Appbar.Header>
    );

    return (
        <View style={styles.container}>
            {header()}
            <FlatList
                data={userLogs}
                renderItem={({item}) => (
                <ActivityItem
                event={item.event}
                createdAt={item.createdAt}
                />
                )}
                keyExtractor={(item) => item.punchinTime}
                ItemSeparatorComponent={Seperator}
            />
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => console.log('Pressed')}
            />

        </View>
    );
    }



export default GroupMessages;