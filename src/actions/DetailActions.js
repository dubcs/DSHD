import firebase from 'firebase';
import GeoFire from 'geofire';
import _ from 'lodash';
import { Alert } from 'react-native';
import {
  GET_COMMENTS,
  COMMENT_CREATE,
  COMMENT_SAVE_SUCCESS,
  COMMENT_FETCH_SUCCESS,
  GET_POST_LOCATION,
  POST_LOCATION_FETCH_SUCCESS,
  USER_IMAGES_FETCH_SUCCESS,
  GET_USER_IMAGES,
  SAVE_DISH,
  RECOMMEND_DISH,
  SAVE_RECOMMENDATION
} from './types';

const hashtagRegex = require('hashtag-regex');

export const getComments = ({ key }) => {
  const commentsRef = firebase.database().ref(`/posts/${key}/postcomments`);
  return (dispatch) => {
            commentsRef.on('value',snapshot => {
              dispatch({ type: COMMENT_FETCH_SUCCESS, payload: snapshot.val() });
            });
          };
    };
  export const CommentCreate = (text) => {
      return {
        type: COMMENT_CREATE,
        payload: text
      };
    };

  export const CommentSaveSuccess = ({ key, text }) => {
      const user = firebase.auth().currentUser;
      const regex = hashtagRegex();
      let match;
  while (match = regex.exec(text)) {
    const hashtag = match[0];
    const newHash = hashtag.split('#');
    const hashtagRef = firebase.database().ref(`posts/${key}/hashtags/${newHash[0]}`);
    hashtagRef.set(hashtag);
  }

      const commentsRef = firebase.database().ref(`/posts/${key}/postcomments`);
      const newCommentKey = commentsRef.push().key;
      const commentData = {
        displayName : user.displayName,
        text: text,
        commentKey:newCommentKey,
      };
      var updates = {};
      return (dispatch) => {
          updates[`/posts/${key}/postcomments/` + newCommentKey] = commentData;
          return firebase.database().ref().update(updates);
          dispatch({ type: COMMENT_SAVE_SUCCESS });

          };
    };
    export const SaveDish = ({key}) => async dispatch => {
      const { currentUser } = firebase.auth();
        const saveRef = await firebase.database().ref(`/users/${currentUser.uid}/saved/${key}`);
        saveRef.set(true);
        dispatch({type: SAVE_DISH});
    };

    export const getUserImages = ({ key }) => {
      const imagesRef = firebase.database().ref(`/posts/${key}/userPicURL`);
      return (dispatch) => {
                imagesRef.on('value',snapshot => {
                  dispatch({ type: USER_IMAGES_FETCH_SUCCESS, payload: snapshot.val() });
                });
              };
        };

    export const getPostLocation = ( {key} ) => {
      const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));
      return (dispatch) => {
        geoFire.get(`${key}`).then((location) => {
          if (location === null) {
            console.log("Provided key is not in GeoFire");
          }
          else {
            console.log("Provided key has a location of " + location);
            dispatch({ type: POST_LOCATION_FETCH_SUCCESS, payload: location });
          }
        }), ((error) => {
          console.log("Error: " + error);
        });
      };
    };

    export const RecommendDish = (key) => {
        var snapsArray = [];
        const { currentUser } = firebase.auth();
        const friendsRef = firebase.database().ref(`/users/${currentUser.uid}/following`);
          return (dispatch) => {
            friendsRef.once('value', snapshot => {
              snapshot.forEach((childSnapshot) => {
                const friendsUserRef = firebase.database().ref(`/users/${childSnapshot.key}`);
                  friendsUserRef.once('value', snaps => {
                    snapsArray.push(snaps.val())
                    console.log("actions");
                    dispatch({ type: RECOMMEND_DISH, payload: snapsArray});
                  });
                });

              });

            };

      };
  export const SaveRecommendation = (key, uid) => async dispatch => {
  const { currentUser } = firebase.auth();
    const saveRef = firebase.database().ref(`/users/${uid}/recommended/${key}`);
    let response = await saveRef.set(currentUser.uid).then(()=>{
      Alert.alert(
        'Completed',
        'Your Recommendation has been sent',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)

    });

    dispatch({type: SAVE_RECOMMENDATION});
  };
