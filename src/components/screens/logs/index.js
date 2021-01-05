import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Seperator, ListItem } from '../../custom';
import styles from './styles';

const Logs = (props) => {
    const [userLogs, setLogs] = useState([]);
    const db = firestore();

    useEffect(()=>{
        fetchLogs();
    },[]);

    const fetchLogs = async () => {
        try {
            const results = [];
            const querySnapshot = await db
                .collection('attendance')
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

    const renderHeader = () => (
        <Appbar.Header>
            <Appbar.BackAction onPress={()=> props.navigation.goBack()} />
            <Appbar.Content title="PunchIn Logs" subtitle="logs of successful PunchIns..." />
            <Appbar.Action icon="dots-vertical" />
        </Appbar.Header>
    )

    return (
        <View style={{ flex: 1 }}>
              <FlatList
                data={userLogs}
                renderItem={({item}) => (
                <ListItem
                    title={item.datetime}
                />
                )}
                keyExtractor={(item) => item.punchinTime}
                ItemSeparatorComponent={Seperator}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}

export default Logs;