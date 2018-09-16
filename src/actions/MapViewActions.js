import firebase from 'firebase';
import GeoFire from 'geofire';
import {
  USER_LOCATION_FETCH,
  GET_POST_LATLONG,
  GET_NEW_REGION,
  GET_POST_LATLONG_SUCCESS
} from './types';



export const userLocationFetch = (posts) => async dispatch => {
  var array = [...posts];
  dispatch({type:USER_LOCATION_FETCH, payload: array});
};

export const getPostsLatLong = (region, indexOfLast) => async dispatch  => {
  var radius = region.latitudeDelta * 50;
  const geoFire = new GeoFire(firebase.database().ref('/geoLocations'));
  var keys = [];
  var snaps = [];
    const currentLocation = [region.latitude, region.longitude];
    const geoQuery = geoFire.query({ center: currentLocation, radius });
    const onKeyEntered = await geoQuery.on("key_entered", (key) => {
          keys.push(key);
    });
    if (keys) {
      var newPosts = [                // array is new
        ...keys.slice(indexOfLast, indexOfLast+15)   // last Y items unchanged
      ];

    const onKeyReady = geoQuery.on('ready', () => {
          newPosts.map((key) => {
              firebase.database().ref('/posts').child(key).
              once('value').then((snapshot) => {
                  snaps.push(snapshot.val());
                    dispatch({ type: GET_POST_LATLONG_SUCCESS, payload: snaps});
              });

          });
        });
      } else {
        dispatch({type:GET_NEW_REGION});
      }
};


export const getNewRegion = ({region}) => {
  console.log("in get new region");
  return (dispatch) => {
        dispatch({type: GET_NEW_REGION, payload:region});


};
};
