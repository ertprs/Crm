import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator } from 'react-native';

const Logs = (props) => {
    const [data, setData] = useState([{},{},{}])
    const renderEmptyContainer = () => (
        <View/>
    )

    return (
        <View style={{ flex: 1 }}>
              <FlatList
                data={data}
                renderItem={({item}) => (
                <ListItem
                    title={item.name}
                    code={item.alpha3Code}
                />
                )}
                keyExtractor={(item) => item.name}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
}

export default Logs;