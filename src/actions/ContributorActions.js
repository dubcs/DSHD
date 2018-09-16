import firebase from 'firebase';
import GeoFire from 'geofire';
import uuid from 'uuid';
import { View, Alert, Platform } from 'react-native';
import { Constants,
  ImagePicker,
  MediaLibrary
} from 'expo';
import {
  GET_CONTRIBUTOR_PHOTOS,
  CONTRIBUTOR_PHOTO_SAVE_SUCCESS,
  UPLOAD_CONTRIBUTOR_IMAGE,
  CONTRIBUTOR_PHOTO_SAVE_CANCELLED,
  DISH_NAME_CHANGED,
  RESTAURANT_NAME_CHANGED,
} from './types';

export const dishNameChanged = (text) => {
  return {
    type: DISH_NAME_CHANGED,
    payload: text
  };
};
export const restaurantNameChanged = (text) => {
  return {
    type: RESTAURANT_NAME_CHANGED,
    payload: text
  };
};
export const getContributorPhotos = () => async dispatch  => {
    console.log('here');
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      exif: true,
    });
    if (!pickerResult.cancelled) {
        dispatch({type: GET_CONTRIBUTOR_PHOTOS, payload: pickerResult});
    }
    else {
      contributorPhotoSaveCancelled();
    }
};
export const uploadContributorImage = (photo, dishname, restaurant, region) => async dispatch => {
  const { currentUser } = await firebase.auth();
  if (dishname && restaurant){
  dispatch({type: UPLOAD_CONTRIBUTOR_IMAGE});
  let response = await fetch(photo.uri);
  let blob = await response.blob();
  const ref = firebase.storage().ref().child("dishPics").child(uuid.v4());
  ref.put(blob).then((snapshot)=> {
    return snapshot.ref.getDownloadURL();
  }).then(downloadURL => {
      var newPostKey = firebase.database().ref().child(`posts/`).push().key;
      const postRef = firebase.database().ref(`/posts/${newPostKey}`);
    //  var longitude = photo.exif.GPSLongitude;
    //  var latitude = photo.exif.GPSLatitude;
    //  if(Platform.OS !== 'android'){
    //  if  (photo.exif.GPSLongitudeRef === "W"){
    //    longitude = -(photo.exif.GPSLongitude);
    //  }
    //  if (photo.exif.GPSLatitudeRef === "S"){
    //    latitude = -(photo.exif.GPSLatitude);
    //  }
    //}
      postRef.update({
        picURL:downloadURL,
        dishname:dishname,
        restaurant:restaurant,
        latitude: region.latitude,
        longitude: region.longitude,
        key: newPostKey,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        poster: currentUser.uid,
        likesCount: 0,
        hatesCount:0,
      }).then(() => {
      const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));

        geoFire.set(newPostKey, [region.latitude, region.longitude]).
          then(() => {
            Alert.alert(
          'Thank You',
          'Your Post is appreciated!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
            console.log('post is psoted');
            return downloadURL;
          },
          ()=>{
            console.log('geofire failed');
            })
      }).then(() => {
        contributorPhotoSaveSuccess(dispatch);
      });


}).catch(error => {
  // Use to signal error if something goes wrong.
  console.log(`Failed to upload file and get link - ${error}`);
});

  }
};

export const contributorPhotoSaveCancelled = (dispatch) => {
    return (dispatch) => {
      dispatch({type: CONTRIBUTOR_PHOTO_SAVE_CANCELLED});
    }
};
export const contributorPhotoSaveSuccess = (dispatch) => {
      dispatch({type: CONTRIBUTOR_PHOTO_SAVE_SUCCESS});
};
