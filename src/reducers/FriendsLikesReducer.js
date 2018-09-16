import {
    FETCH_FRIENDS_LIKES,
    FETCH_FRIENDS_FAIL,
    LOAD_MORE,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS_LIKES:
      console.log(action.payload);
      return {...state, friendsLikes:action.payload };
      case LOAD_MORE:
        return {...state, friendsLikes:action.payload};
    case FETCH_FRIENDS_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
