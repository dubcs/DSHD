import firebase from 'firebase';
import GeoFire from 'geofire';
import _ from 'lodash';
import {
    FIND_POSSIBLE_FRIENDS,
    FRIEND_SEARCHER,
} from './types';


  export const findPossibleFriends = () => {
      var snapsArray = [];
      const { currentUser } = firebase.auth();
      const friendsRef = firebase.database().ref(`/users/`);
        return (dispatch) => {
          friendsRef.on('child_added', snapshot => {
                snapsArray.push(snapshot.val())
                dispatch({ type: FIND_POSSIBLE_FRIENDS, payload: snapsArray});
          });
        };

    };
    export const friendSearcher = (searches, postsArray) => async dispatch => {
      var friends = [];
      postsArray.map((friend) => {
        var user = _.toLower(friend.username);
        var first = _.toLower(friend.firstname);
        var last =  _.toLower(friend.lastname);
        var search = _.toLower(searches);
        var match = _.includes(user, search);
        var match2 = _.includes(first, search);
        var match3 = _.includes(last, search);
        if (match || match2 || match3) {
          friends.push(friend);
        }
      });
    dispatch({ type: FRIEND_SEARCHER, payload: friends });
    }
