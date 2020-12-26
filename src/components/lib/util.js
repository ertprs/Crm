import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export const uploadImageToFirebase = async (image, id) => {
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
    console.log('response', response);
    console.log('download url', response.downloadURL);
  } catch (e) {
    console.error(e);
  }
};
