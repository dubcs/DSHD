import firebase from 'firebase';
import _ from 'lodash';
import GeoFire from 'geofire';
import {
  GET_USER_DETAILS,
  USER_DETAILS_FETCH_SUCCESS,
  GET_RATED_DISHES,
  RATED_DISH_FETCH_SUCCESS,
  GET_SAVED_DISHES,
  SAVED_DISH_FETCH_SUCCESS,
  GET_RECOMMENDED,
  REMOVE_ITEM,
  REMOVE_SAVED_ITEM,
} from './types';


export const removeItem = (item, list) => async dispatch => {
    const { currentUser } = firebase.auth();
   const removeRef= firebase.database().ref(`/users/${currentUser.uid}/recommended`);
   removeRef.child(item.key).remove();
    _.pull(list, item);
    dispatch({type: REMOVE_ITEM, payload: list});

};
export const removeSavedItem = (item, list) => async dispatch => {
    const { currentUser } = firebase.auth();
   const removeRef= firebase.database().ref(`/users/${currentUser.uid}/saved`);
   removeRef.child(item.key).remove();
    _.pull(list, item);
    dispatch({type: REMOVE_SAVED_ITEM, payload: list});

};
export const getRatedDishes = (indexOfLast) => async dispatch => {
      var snapsArray = [];
      var keyArray = [];
      const { currentUser } = firebase.auth();
      const likesRef = firebase.database().ref(`/users/${currentUser.uid}/lastRated`);
      likesRef.once('value', snapshot => {
            snapshot.forEach((childSnap)=>{
                keyArray.push(childSnap.key);
            })
            console.log(keyArray.length);
            if (keyArray.length >10){
              var newPosts = [                // array is new
                      ...keyArray.slice(keyArray.length-1-indexOfLast-10, keyArray.length-1-indexOfLast)   // last Y items unchanged
              ];
            } else {
              var newPosts = keyArray;
            }
                    newPosts.map((post) => {
                    const likesPostRef = firebase.database().ref(`/posts/${post}`);
                      likesPostRef.once('value', snaps => {
                        snapsArray.push(snaps.val());
                        dispatch({ type: RATED_DISH_FETCH_SUCCESS, payload: snapsArray});

                    });
                  });
      });
};
export const getSavedDishes = () => {

        const { currentUser } = firebase.auth();
        var snapsArray = [];

        const likesRef = firebase.database().ref(`/users/${currentUser.uid}/saved`);
        return (dispatch) => {
        likesRef.on('child_added', snapshot => {
            const likesPostRef = firebase.database().ref(`/posts/${snapshot.key}`);
            likesPostRef.once('value', snaps => {
              snapsArray.push(snaps.val())
              dispatch({ type: RATED_DISH_FETCH_SUCCESS, payload: snapsArray});
            });
        });
        dispatch({type: USER_DETAILS_FETCH_SUCCESS});
      };
};
export const getRecommended = () => {

        const { currentUser } = firebase.auth();
        var snapsArray = [];
        var recArray
        const likesRef = firebase.database().ref(`/users/${currentUser.uid}/recommended`);
        return (dispatch) => {

        likesRef.once('value', snapshot => {
          snapshot.forEach(() => {
            const likesPostRef = firebase.database().ref(`/posts/${snapshot.key}`);
              likesPostRef.once('value', snaps => {
                var newObject = snaps.val();
                var userRef = firebase.database().ref(`/users/${snapshot.val()}/username`);
                userRef.once('value', userSnaps => {
                  _.assign(newObject, {uid : userSnaps.val()});

                  snapsArray.push(newObject);
                  dispatch({ type: RATED_DISH_FETCH_SUCCESS, payload: snapsArray});
                });
              });
            });
        });
        dispatch({type: USER_DETAILS_FETCH_SUCCESS});
      };

};
