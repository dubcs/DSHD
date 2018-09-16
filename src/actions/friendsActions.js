import firebase from 'firebase';
import GeoFire from 'geofire';
import _ from 'lodash';
import {
    FETCH_FRIENDS,
    FETCH_FRIENDS_LIKES,
    FETCH_FRIENDS_FAIL,
    LOAD_MORE,
} from './types';

export const fetchFriends = (indexOfLast) => {
    var snapsArray = [];
    var keyArray = [];
    const { currentUser } = firebase.auth();
    const friendsRef = firebase.database().ref(`/users/${currentUser.uid}/following`);
    return (dispatch) => {
      friendsRef.once('value', snapshot => {
          snapshot.forEach((childSnapshot) => {
            if(childSnapshot.val()){
              keyArray.push(childSnapshot.key);
            }
          });
          var newPosts = [                // array is new
                  ...keyArray.slice(indexOfLast, indexOfLast+15)   // last Y items unchanged
          ];
          newPosts.map((key) => {
            const friendsUserRef = firebase.database().ref(`/users/${key}`);
            friendsUserRef.once('value', snaps => {
                snapsArray.push(snaps.val())
                dispatch({ type: FETCH_FRIENDS, payload: snapsArray});
              });

              dispatch({type:FETCH_FRIENDS_FAIL});
          });
        });
    };

};
export const fetchFriendsLikes = (keys,indexOfLast) => {
    var snapsArray = [];
    const keyArray = _.keys(keys);
    if (keyArray.length > 10){
    var newPosts = [                // array is new
      ...keyArray.slice(keyArray.length-1-indexOfLast-10, keyArray.length-1-indexOfLast)   // last Y items unchanged
    ];
  } else {
    var newPosts = keyArray;
  }
    return (dispatch) => {
      newPosts.map((key) => {
        const imagesRef = firebase.database().ref(`/posts/${key}`);
        imagesRef.once('value',snapshot => {
          snapsArray.push(snapshot.val());
          dispatch({ type: FETCH_FRIENDS_LIKES, payload: snapsArray });
        });
      });

    };
};
export const loadMore = (keys, indexOfLast) => {
  var snapsArray = [];
  const keyArray = _.keys(keys);
  var newPosts = [                // array is new
    ...keyArray.slice(keyArray.length-1-indexOfLast-10, keyArray.length-1-indexOfLast)   // last Y items unchanged
  ];
  return (dispatch) => {
    newPosts.map((key) => {
      const imagesRef = firebase.database().ref(`/posts/${key}`);
      imagesRef.once('value',snapshot => {
        snapsArray.push(snapshot.val());
        dispatch({type: LOAD_MORE, payload: snapsArray });
      });
    });
    dispatch({type:FETCH_FRIENDS_FAIL});
  };
}
