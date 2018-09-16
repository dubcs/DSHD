import {
  GET_USER_DETAILS,
  USER_DETAILS_FETCH_SUCCESS,
  GET_RATED_DISHES,
  RATED_DISH_FETCH_SUCCESS,
  GET_SAVED_DISHES,
  SAVED_DISH_FETCH_SUCCESS,
  GET_RECOMMENDED,
  REMOVE_ITEM,
  REMOVE_SAVED_ITEM
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DETAILS_FETCH_SUCCESS:
      return  INITIAL_STATE;
    case RATED_DISH_FETCH_SUCCESS:
      return {...state, userDetails: action.payload};
    case GET_RATED_DISHES:
        return {...state, INITIAL_STATE};
    case REMOVE_ITEM:
          return {...state, userDetails: action.payload};
    case REMOVE_SAVED_ITEM:
          return {...state, userDetails: action.payload};
    case SAVED_DISH_FETCH_SUCCESS:
        return action.payload;

    default:
      return state;
  }
};
