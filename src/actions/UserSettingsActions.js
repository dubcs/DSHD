import * as firebase from 'firebase';
import uuid from 'uuid';
import { Alert } from 'react-native';
import {Constants, ImagePicker, ImageManipulator} from 'expo';
import {
  GET_AVATAR_PHOTOS,
  GET_AVATAR_PHOTOS_CAMERA,
  AVATAR_PHOTO_SAVE_SUCCESS,
  AVATAR_PHOTO_SAVE_CANCELLED,
  USER_EMAIL_CHANGED,
  USER_PASSWORD_CHANGED,
  USER_USERNAME_CHANGED,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  IS_CONTRIBUTOR,
} from './types';



export const userEmailChanged = (text) => {
  return {
    type: USER_EMAIL_CHANGED,
    payload: text
  };
};
export const userPasswordChanged = (text) => {
  return {
    type: USER_PASSWORD_CHANGED,
    payload: text
  };
};
export const userUsernameChanged = (text) => {
  return {
    type: USER_USERNAME_CHANGED,
    payload: text
  };
};
export const firstNameChanged = (text) => {
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  };
};
export const lastNameChanged = (text) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  };
};
export const updateUserProfile = ({email, password, username, firstname, lastname}) => async dispatch => {
  const { currentUser } = firebase.auth();

    if (email) {
      currentUser.updateEmail(email).
        then(() => {
          console.log('update successful');
          currentUser.sendEmailVerification().
          then(() => {
            console.log('email sent');
          }).catch(() =>{
                console.log('email send error');
          });
        }).catch((error) => {
          console.log(error);
        });
    }
    if (firstname) {
      const firstnameRef = await firebase.database().ref(`/users/${currentUser.uid}/`).update({firstname}).then(() => {
        Alert.alert(
         'Thank You',
         'Your input has been documented!',
         [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         { cancelable: false }
       )
        dispatch({type: UPDATE_USER_PROFILE});
      });
    }
    if (lastname) {
      const lastnameRef = await firebase.database().ref(`/users/${currentUser.uid}/`).update({lastname}).then(() => {
        Alert.alert(
         'Thank You',
         'Your input has been documented!',
         [
           {text: 'OK', onPress: () => console.log('OK Pressed')},
         ],
         { cancelable: false }
       )
        dispatch({type: UPDATE_USER_PROFILE});
      });
      }
    if (password) {
      console.log('in password');
      user.updatePassword(password).then(() => {
          dispatch({type: UPDATE_USER_PROFILE});
          console.log('password changed');
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
    }
    if (username) {
      console.log('in username');
        var usernameRef = firebase.database()
        .ref(`users`)
        .orderByChild('username')
        .equalTo(username);
        usernameRef.once('value',(snapshot) => {
          if (snapshot.val() === null) {
            currentUser.updateProfile({
              displayName: username
            }).then(() => {
              console.log('update successful');
              const key = currentUser.uid;
              const commentsRef = firebase.database().ref('/users/'+key+'/').update({username});
              dispatch({type: UPDATE_USER_PROFILE})
            }).catch((error) => {
              console.log(error);
            });
          } else {
            const er = 'Username already exists.';
            //saveUserFail(dispatch, er);
            return; // Abort the transaction.
          }
        }, (errors, committed, snapshot) => {
          if (errors) {
            console.log('Transaction failed abnormally!', errors);
          } else if (!committed) {
            //saveUserFail(dispatch);
          } else {
          }
          });
        };
};

export const updateUserProfileSuccess = (dispatch) => {
    dispatch({type: UPDATE_USER_PROFILE_SUCCESS});
};
export const isContributor = () => async dispatch => {
  const { currentUser } = firebase.auth();
  var contributorRef = firebase.database()
  .ref(`users/${currentUser.uid}/contributor`);
  contributorRef.once('value',(snapshot) => {
      if (snapshot.val()){
        dispatch({type: IS_CONTRIBUTOR, payload:true});
      } else {
        dispatch({type: IS_CONTRIBUTOR, payload:false});
      }
  });
}
export const getAvatarPhotos = () => async dispatch  => {
    const { currentUser } = firebase.auth();
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!pickerResult.cancelled) {
      const manipResult = await ImageManipulator.manipulate(
      pickerResult.uri,
      [{resize: {height : 100}}, {compress: 0.5 }],
      { format: 'png' }
    );
      let response = await fetch(manipResult.uri);
      let blob = await response.blob();
      const ref = firebase.storage().ref().child("dishPics").child(uuid.v4());
      ref.put(blob).then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      }).then(downloadURL => {
          console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
          firebase.database().ref(`/users/${currentUser.uid}/avatarURL`).set(downloadURL);
          currentUser.updateProfile({
            photoURL: downloadURL
      }).then(() => {
          console.log('update successful');
          AvatarPhotoSaveSuccess(dispatch, {downloadURL});
      }).catch((error) => {
          console.log(error);
            AvatarPhotoSaveCancelled();
      });
      return downloadURL;
   })   .catch(error => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
   });



    }
    else {
      AvatarPhotoSaveCancelled();
    }
};
export const getAvatarPhotosCamera = ({key}) => async dispatch => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
if (!pickerResult.cancelled) {
  let response = await fetch(pickerResult.uri);

  let blob = await response.blob();
  const ref = firebase.storage().ref().child("dishPics").child(uuid.v4());
  ref.put(blob).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  }).then(downloadURL => {
      console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
      firebase.database().ref(`/users/${currentUser.uid}/avatarURL`).set(downloadURL);
      currentUser.updateProfile({
        photoURL: downloadURL
  }).then(() => {
      console.log('update successful');
      AvatarPhotoSaveSuccess(dispatch, {downloadURL});
  }).catch((error) => {
      console.log(error);
        AvatarPhotoSaveCancelled();
  });
  return downloadURL;
})   .catch(error => {
  // Use to signal error if something goes wrong.
  console.log(`Failed to upload file and get link - ${error}`);
});
}  else {
    AvatarPhotoSaveCancelled(dispatch);
  }
};

export const AvatarPhotoSaveCancelled = (dispatch) => {
    return (dispatch) => {
      dispatch({type: AVATAR_PHOTO_SAVE_CANCELLED});
    }
}

export const AvatarPhotoSaveSuccess = (dispatch, {downloadURL}) => {
      dispatch({type: AVATAR_PHOTO_SAVE_SUCCESS, payload: downloadURL});
};
