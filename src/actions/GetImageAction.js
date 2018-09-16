import firebase from 'firebase';
import GeoFire from 'geofire';
import uuid from 'uuid';
import {Constants, ImagePicker, ImageManipulator} from 'expo';
import {
  GET_PHOTOS,
  GET_PHOTOS_CAMERA,
  PHOTO_SAVE_SUCCESS,
  UPLOAD_IMAGE,
  PHOTO_SAVE_CANCELLED
} from './types';



export const getPhotos = ({key}) => async dispatch  => {
    console.log(key);
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      const manipResult = await ImageManipulator.manipulate(
        [{ resize: { width: 600, height:600 }}],
      );
      if (manipResult){
            let response = await fetch(manipResult);

            let blob = await response.blob();
            const ref = firebase.storage().ref().child("dishPics").child(uuid.v4());
            ref.put(blob).then((snapshot)=> {
              return snapshot.ref.getDownloadURL();
            }).then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            var newPostKey = firebase.database().ref().child(`posts/${key}`).push().key;
            const postRef = firebase.database().ref(`/posts/${key}/userPicURL/${newPostKey}`);
            postRef.update({url:downloadURL});
            PhotoSaveSuccess(dispatch, {downloadURL});
            return downloadURL;
         }).catch(error => {
            // Use to signal error if something goes wrong.
            console.log(`Failed to upload file and get link - ${error}`);
         });
       }
    }
    else {
      photoSaveCancelled();
    }
};
export const getPhotosCamera = ({key}) => async dispatch => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
if (!pickerResult.cancelled) {
  const response = await fetch(pickerResult.uri);

  const blob = await response.blob();
  const ref = firebase
    .storage()
    .ref()
    .child("dishPics")
    .child(uuid.v4());
    ref.put(blob).then((snapshot)=> {
      return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
    console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
    var newPostKey = firebase.database().ref().child(`posts/${key}`).push().key;
    const postRef = firebase.database().ref(`/posts/${key}/userPicURL/${newPostKey}`);
    postRef.update({url:downloadURL});
    PhotoSaveSuccess(dispatch, {downloadURL});
    return downloadURL;
 }).catch(error => {
    // Use to signal error if something goes wrong.
    console.log(`Failed to upload file and get link - ${error}`);
 });

  }
  else {
    photoSaveCancelled(dispatch);
  }
};

export const photoSaveCancelled = (dispatch) => {
    return (dispatch) => {
      dispatch({type: PHOTO_SAVE_CANCELLED});
    }
}

export const PhotoSaveSuccess = (dispatch, {downloadURL}) => {
      dispatch({type: PHOTO_SAVE_SUCCESS, payload: downloadURL});
};

export const uploadImage = ({pickerResult}) => {
//console.log(pickerResult.uri);
  return async (dispatch) => {
  //dispatch({type: UPLOAD_IMAGE});

};
};
