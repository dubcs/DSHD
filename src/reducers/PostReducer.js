import {
  LOCATION_FETCH_SUCCESS,
  LOCATION_FETCH,
  POSTS_FETCH_FAIL,
  SLIDER_MOVED,
  RESTAURANT_DISHES,
  REPLACE_OBJECT,
  SEARCHER,
  ADD_KEYS,
  LOAD_MAP_OBJECTS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case LOCATION_FETCH_SUCCESS:
        return { dataSource: action.payload};
      case POSTS_FETCH_FAIL:
        return INITIAL_STATE;
      case SLIDER_MOVED:
        return state;
      case REPLACE_OBJECT:
        return {...state, dataSource: action.payload };
      case RESTAURANT_DISHES:
        return {...state, dataSource: action.payload};
      case SEARCHER:
        return {...state, dataSource: action.payload };
      case ADD_KEYS:
        return {...state, dataSource: action.payload };
      case LOAD_MAP_OBJECTS:
        return {...state, dataSource: action.payload };
    default:
      return state;
  }
};
