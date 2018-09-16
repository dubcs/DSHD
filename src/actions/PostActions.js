import * as firebase from 'firebase';
import GeoFire from 'geofire';
import _ from 'lodash';
import {
  LOCATION_FETCH_SUCCESS,
  LOCATION_FETCH,
  SLIDER_MOVED,
  POSTS_FETCH_FAIL,
  RESTAURANT_DISHES,
  REPLACE_OBJECT,
  ADD_KEYS,
  SEARCHER,
  LOAD_MAP_OBJECTS,
} from './types';

export const loadMapObjects = (dishes) => {
  return (dispatch) => {
    dispatch({ type: LOAD_MAP_OBJECTS, payload: dishes});
  };
}

export const addKeys = ( rat , postsArray ) => async dispatch => {
  var dishes = [];

    if (!rat) {
      dishes = await _.orderBy(postsArray,'average', 'desc');
    } else {
      dishes = await _.orderBy(postsArray,'likesCount', 'desc');
    }

dispatch({ type: ADD_KEYS, payload: dishes });
};


export const searcher = (searches , region, indexOfLast) => async dispatch => {
  const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));
  var keys = [];
  var snaps = [];
          const currentLocation = [region.latitude, region.longitude];
          const geoQuery = geoFire.query({ center: currentLocation, radius:indexOfLast });
          const onKeyEntered = geoQuery.on("key_entered", (key) => {
            keys.push(key);
          });
          const onKeyReady = geoQuery.on('ready', () => {
          if (keys.length !== 0 ) {
          keys.map((key) => {
            firebase.database().ref('/posts').child(key).
                  once('value').then((snapshot) => {
                        var rest = _.toLower(snapshot.val().restaurant);
                        var dish = _.toLower(snapshot.val().dishname);
                        var search = _.toLower(searches);
                        var match = _.includes(rest, search);
                        var match2 = _.includes(dish, search);
                        if (match || match2) {
                          console.log(rest+dish+search);
                          snaps.push(snapshot.val());
                        }
                dispatch({ type: SEARCHER, payload: snaps });
               }).catch(() => postsFetchFail(dispatch));
             });

           } else {
             postsFetchFail(dispatch);
           }
        });
  };

export const locationFetch = ( region , indexOfLast) => {
  var newRadius = indexOfLast;
  const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));
  var keys = [];
  var snaps = [];
  return (dispatch) => {
          const currentLocation = [region.latitude, region.longitude];
          const geoQuery = geoFire.query({ center: currentLocation, radius:newRadius });
          const onKeyEntered = geoQuery.on("key_entered", (key) => {
                keys.push(key);
          });
          const onKeyReady = geoQuery.on('ready', () => {
          if (keys.length !== 0 ) {
            keys.sort((a, b) => {return b > a});
          keys.map((key) => {
            firebase.database().ref('/posts').child(key).
                  once('value').then((snapshot) => {
                    snaps.push(snapshot.val());
                       dispatch({ type: LOCATION_FETCH_SUCCESS, payload: snaps });
               }).catch(() => postsFetchFail(dispatch));

             });

           } else {
             postsFetchFail(dispatch);
           }
        });
      };
};
export const sliderMoved = ( {vae , item, origPostList, index}, cb) => async dispatch => {
  const { currentUser } = await firebase.auth();
  const uid =  currentUser.uid;
  const key = item.key;
       await firebase.database().ref(`/posts/${item.key}`).transaction((post) => {
        if (post) {
          if (!post.likes){
          post.likes = {};
          }
          if (post.likes[uid]) {
            const oldScore = post.likes[uid];
            post.likes[uid] = vae;
            post.hatesCount = (post.hatesCount - oldScore) + vae;
            console.log('in the first if...........');
          } else {
            post.likesCount++;
            post.likes[uid] = vae;
            post.hatesCount = post.hatesCount + vae;
            console.log('in the second if..........');
          }
            const lastmodified = firebase.database.ServerValue.TIMESTAMP;
            const average = (post.hatesCount / post.likesCount);
            post.average = average;
            post.lastModified = lastmodified;
        }
        return post;
  }, (error, committed, snapshot) => {
    if (error) {
      console.log('Transaction failed abnormally!', error);
    } else if (!committed) {
      console.log('We aborted the transaction.');
    } else {
      replaceObject( {snapshot , origPostList, index}, dispatch );
      firebase.database().ref(`/users/${currentUser.uid}`).transaction((user) => {
        if (user) {
          const itemKey = item.key;

          if (!user.likes) {
              user.likes = {};
               user.likes[itemKey] = vae;
               if (!user.likesCount){
                 user.likesCount = {};
                 user.likesCount = 1;
               } else {
                 console.log('hererereer');
                 user.likesCount= user.likesCount + 1;
               }
           } else {
             //console.log(user.likes.itemKey);
             if(!user.likes[itemKey]){
             if (!user.likesCount){
               user.likesCount = {};
               user.likesCount = 1;
             } else {
               console.log('hererereer');
               user.likesCount= user.likesCount + 1;
             }
           }
                user.likes[itemKey] = vae;

             }
              if (!user.lastRated){
                user.lastRated = {};
              }
                user.lastRated[itemKey] = firebase.database.ServerValue.TIMESTAMP;
            }
        return user;
      }, (error, committed, snaps) => {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log('We aborted the transaction.');
        } else {
          console.log('User modified!');
          dispatch({ type: SLIDER_MOVED});
          cb();
        }
      });

    }

  });
};


export const replaceObject = ( { snapshot , origPostList, index }, dispatch ) => {
  var newPosts = [                // array is new
    ...origPostList.slice(0, index), // first X items unchanged
    snapshot.val(),
    ...origPostList.slice(index+1)     // last Y items unchanged
  ];
      dispatch({ type: REPLACE_OBJECT, payload: newPosts });
};

export const restaurantDishes = ( name, region, indexOfLast ) => async dispatch => {
          const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));
          var keys = [];
          var snaps = [];
          const currentLocation = [region.latitude, region.longitude];
          const geoQuery = geoFire.query({ center: currentLocation, radius: indexOfLast });
          const onKeyEntered = geoQuery.on("key_entered", (key) => {
            keys.push(key);
          });
          const onKeyReady = geoQuery.on('ready', () => {
          if (keys.length !== 0 ) {
          keys.map((key) => {
            firebase.database().ref('/posts').child(key).
                  once('value').then((snapshot) => {
                    if (snapshot.val().restaurant === name.restaurant) {
                      snaps.push(snapshot.val());
                    }
                dispatch({ type: RESTAURANT_DISHES, payload: snaps });
               }).catch(() => postsFetchFail(dispatch));
             });
           } else {
             postsFetchFail(dispatch);
           }
});
};

export const postsFetchFail = (dispatch) => {
  dispatch({ type: POSTS_FETCH_FAIL });
};
