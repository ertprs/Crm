import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export const uploadImageToFirebase = async (image, user, dispatch) => {
  const {path} = image;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
  console.log('filename', filename);
  const task = storage().ref(filename).putFile(uploadUri);

  // set progress state
  // task.on('state_changed', (snapshot) => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
  //   );
  // });

  try {
    const response = await task;
    const path = `https://storage.googleapis.com/omanl-1c81a.appspot.com/${response.metadata.name}`;
    user.image = path;
    firestore().collection('users').doc(user.uid).update({
      image: path,
    });
    dispatch({type: 'SET_PROFILE_IMAGE', user});
  } catch (e) {
    console.error(e);
  }
};
