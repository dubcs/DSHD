import {
  USER_LOCATION_FETCH,
  GET_POST_LATLONG,
  GET_NEW_REGION,
  GET_POST_LATLONG_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  markerLocation:[],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case USER_LOCATION_FETCH:
        return {...state, markerLocation: action.payload}
      case GET_POST_LATLONG:
        if (action.payload.length < 1) {
          return {...state, dataSource: null}
        }
        return {...state, loading: false};
      case GET_POST_LATLONG_SUCCESS:
        if (action.payload.length === 0) {
          return {...state, markerLocation: null}
        } else {
          return {...state, markerLocation: action.payload};
        }
      case GET_NEW_REGION:
        return INITIAL_STATE;
    default:
      return state;
  }
};
