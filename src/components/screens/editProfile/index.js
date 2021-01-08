import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {useTheme,Button,List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {Appbar} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import styles from "./styles";
import {uploadImageToFirebase,deletemageOnStorage} from '../../lib/util';

const EditProfileScreen = (props) => {
    const User = useSelector((state) => state.User);
    const {user} = User;
    const dispatch = useDispatch();
    const [image, setImage] = useState((user.image === undefined) ? 'https://api.adorable.io/avatars/80/abott@adorable.png' : user.image);
    const [expanded, setExpanded] = React.useState(false);
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone ? user.phone : '')
    const [email, setEmail] = useState(user.email);
    const [country, setCountry] = useState(user.country ? user.country : '');
    const [city, setCity] = useState(user.city ? user.city : '');
    const [company,setCompany] = useState(user.company ? user.company: 'Select Company');
    const db = firestore();
    const bs = React.createRef();
    const fall = new Animated.Value(1);

    const {colors} = useTheme();

    const submit = () => {
        try{
            if (name === '' || name === undefined){
                Snackbar.show({ 
                    text: "Hey, Name can't be empty",
                    duration: Snackbar.LENGTH_LONG,
                 });
                 return;
            } else if (email === '' || email === undefined) {
                Snackbar.show({ 
                    text: "Hey, Email can't be empty",
                    duration: Snackbar.LENGTH_LONG,
                 });
                 return;
            }  else if (phone === '' || phone === undefined) {
                Snackbar.show({ 
                    text: "Hey, Phone Number can't be empty",
                    duration: Snackbar.LENGTH_LONG,
                 });
                 return;
            }

            const data = { name, email, image, phone, country, city, company };
            db.collection('users').doc(auth().currentUser.uid).set(data);
            props.navigation.navigate("Profile");
        } catch (error) {
            Snackbar.show({ 
                text: `${error}`,
                duration: Snackbar.LENGTH_LONG,
             })
        }
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7
        }).then(image => {
        uploadImageToFirebase(image, user, dispatch);
        setImage(image.path);
        });
        bs.current.snapTo(1);
    }

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
        }).then(image => {
        uploadImageToFirebase(image, user, dispatch);
        setImage(image.path);
        });
        bs.current.snapTo(1);
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <Button icon="camera" mode="contained" style={styles.button} onPress={takePhotoFromCamera}>
                Take Photo
            </Button>
            <Button icon="camera" mode="contained" style={styles.button} onPress={choosePhotoFromLibrary}>
                Choose From Library
            </Button>
            <Button icon="cancel" mode="contained" style={styles.button} onPress={() => bs.current.snapTo(1)}>
                Cancel
            </Button>
        </View>
    );

    const expand = () => {
        setExpanded(!expanded);
    }
    const selecteListItem = (value) => {
        setCompany(value);
        setExpanded(!expanded);
    }

    const renderHeader = () => (
        <View style={styles.header}>
        <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
        </View>
        </View>
    );

    const Header = () => (
        <Appbar.Header style={{backgroundColor: colors.primaryDark}}>
            <Appbar.BackAction onPress={()=> props.navigation.goBack()} />
          <Appbar.Content title="Edit Profile" />
        </Appbar.Header>
    );


    return (
       
        <View style={styles.container}>
            {Header()}
            
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                    <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ImageBackground
                        source={{
                        uri: user.image === undefined ? image : user.image,
                        }}
                        style={{height: 100, width: 100}}
                        imageStyle={{borderRadius: 15}}>
                        <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Icon
                            name="camera"
                            size={35}
                            color="#fff"
                            style={{
                            opacity: 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#fff',
                            borderRadius: 10,
                            }}
                        />
                        </View>
                    </ImageBackground>
                    </View>
                </TouchableOpacity>
                
                </View>

                <View style={styles.action}>
                <FontAwesome name="user-o" color={colors.text} size={20} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}

                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                </View>
            
                <List.Accordion
                    title={`${company}`}
                    left={props => <List.Icon {...props} icon="folder" />}
                    expanded={expanded}
                    onPress={expand}
                    style={{ marginLeft: -21 }}
                    >
                    <List.Item  left={(props) => <List.Icon {...props} icon="tune" />} title="Omanl & Co" onPress={() => selecteListItem("Omanl & Co")} />
                    <List.Item  left={(props) => <List.Icon {...props} icon="terraform" />} title="Starkstech"  onPress={() => selecteListItem("Starkstech")} />
                    <List.Item  left={(props) => <List.Icon {...props} icon="terrain" />} title="Starksrecords"  onPress={() => selecteListItem("Starksrecords")}/>
                </List.Accordion>        
                
                <View style={styles.action}>
                <Feather name="phone" color={colors.text} size={20} />
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor="#666666"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
                </View>
                <View style={styles.action}>
                <FontAwesome name="envelope-o" color={colors.text} size={20} />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    keyboardType="email-address"
                    autoCorrect={false}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                </View>
                <View style={styles.action}>
                <FontAwesome name="globe" color={colors.text} size={20} />
                <TextInput
                    placeholder="Country"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                />
                </View>
                <View style={styles.action}>
                <Icon name="map-marker-outline" color={colors.text} size={20} />
                <TextInput
                    placeholder="City"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    style={[
                    styles.textInput,
                    {
                        color: colors.text,
                    },
                    ]}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={() => submit()}>
                <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </Animated.View>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </View>
       
    );
};

export default EditProfileScreen;

