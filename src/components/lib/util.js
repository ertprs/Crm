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
   
    //new method though not tested
      //  let url = await storage().ref(filename).getDownloadURL();
      //   console.log('data', url);
        //from url you can fetched the uploaded image easily
       //  user.image = data. path;
        // firestore().collection('users').doc(user.uid).update({
        //   image: path,
        // });
        // dispatch({type: 'SET_PROFILE_IMAGE', user});
      

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


export const deletemageOnStorage = async (imageName) => {
  //storage().child('images/example.jpg').delete()
  let imageRef = storage().ref('/' + imageName)
    .delete()
    .then(() => {
      Snackbar.show({
        text: `${imageName}has been deleted successfully.`,
        duration: Snackbar.LENGTH_SHORT
      })
    })
    .catch((e) => {
      Snackbar.show({
        text: `${e}`,
        duration: Snackbar.LENGTH_SHORT
      })
    }); 

}
