import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

export const uploadImageToFirebase = async (image, user, dispatch) => {
  const {path} = image;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  const uploadUri = Platform.OS === 'ios' ? path.replace('file://', '') : path;
 
   const task = storage().ref(filename).putFile(uploadUri);

  // set progress state
  // task.on('state_changed', (snapshot) => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
  //   );
  // });

  try {
  
     const response = await task;
    // response.metadata.fullPath or filename;
     let url = await storage().ref(response.metadata.fullPath).getDownloadURL();

    user.image = url;
    firestore().collection('users').doc(user.uid).update({
      image: path,
      imageName: response.metadata.fullPath,
    });
   // deletemageOnStorage(user.imageName);
    dispatch({type: 'SET_PROFILE_IMAGE', user});
  } catch (e) {
    console.error(e);
  }
}; 


export const deletemageOnStorage = async (imageName) => {
  //storage().child('images/example.jpg').delete()
  let imageRef = storage().ref(imageName)
    .delete()
    .catch((e) => {
      Snackbar.show({
        text: `${e}`,
        duration: Snackbar.LENGTH_SHORT
      })
    }); 

}

export const handleError = (error) => {
  console.log('Error Subscribing: ', error);
};
