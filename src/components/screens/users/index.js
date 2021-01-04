import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {Appbar} from 'react-native-paper';

import styles from './styles';
import colors from '../../styles/colors';

const Users = (props) => {

const [data] = useState( [
        {id:1, name: "Amara Myra Kalu ",   position:"Artist",               image:require("../../../assets/images/profile/amara.png")},
        {id:1, name: "Chima Egbema",   position:"Guitar Player",               image:require("../../../assets/images/profile/chima.png")},
        {id:2, name: "Ojo Isaac Sunday ",  position:"Drum Player", image:require("../../../assets/images/profile/isaac.png")} ,
        {id:3, name: "Onifade Oluwatosin Moses  ", position:"Artist",     image:require("../../../assets/images/profile/onifade.png")} ,
        {id:4, name: "Mustapha Abiola Isaac", position:"Guitar Player",   image:require("../../../assets/images/profile/mustapha.png")} ,
      ]);



  const clickEventListener = (item) => {
    Alert.alert(item.name)
  }

  const Header = () => (
    <Appbar.Header style={{backgroundColor: colors.primaryDark}}>
        <Appbar.BackAction onPress={()=> props.navigation.goBack()} />
      <Appbar.Content title="Band Crew" />
       <Appbar.Action icon="dots-vertical"/>
    </Appbar.Header>
  );

    return (
    <>
        {Header()}
        <View style={styles.container}>
        <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
            return item.id;
            }}
            renderItem={({item}) => {
            return (
                <TouchableOpacity style={styles.card}>
                <Image style={styles.userImage} source={item.image}/>
                <View style={styles.cardFooter}>
                    <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.position}>{item.position}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            )
            }}
            />
        </View>
    </>
    );
  
}
 
export default Users;
            