import firebase from 'firebase';
import GeoFire from 'geofire';
import { Alert } from 'react-native';
import _ from 'lodash';
import {
    FETCH_FOLLOW_USER,
    FOLLOW_USER,
    UNFOLLOW_USER,
} from './types';

export const fetchFollowUser = (keys) => {
      var snapsArray = [];
      const keyArray = _.keys(keys.lastRated);
      //console.log(keyArray);
        return (dispatch) => {
      keyArray.map((key) => {
        const imagesRef = firebase.database().ref(`/posts/${key}`);
            imagesRef.on('value',snapshot => {
              snapsArray.push(snapshot.val())
console.log(snapshot.key);
              dispatch({ type: FETCH_FOLLOW_USER, payload: snapsArray });
                      });
                    });

              };
  };

export const followUser = (key) => async dispatch => {
  const { currentUser } = firebase.auth();
    const followingRef = firebase.database().ref(`/users/${key}/followers/${currentUser.uid}`);
    const followerRef = firebase.database().ref(`/users/${currentUser.uid}/following/${key}`);
    let response = await followingRef.set(true).then(()=>{
       followerRef.set(true).then(() => {
        Alert.alert(
          'Completed',
          'follow completed',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )

      })
    });

    dispatch({type: FOLLOW_USER});

};

export const unFollowUser = (key) => async dispatch => {
  const { currentUser } = firebase.auth();
    const followingRef = firebase.database().ref(`/users/${key}/followers/${currentUser.uid}`);
    const followerRef = firebase.database().ref(`/users/${currentUser.uid}/following/${key}`);
    let response = await followingRef.set(false).then(()=>{
       followerRef.set(false).then(() => {
        Alert.alert(
          'Completed',
          'You no longer are a follower',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )

      })
    });

    dispatch({type: UNFOLLOW_USER});

};
