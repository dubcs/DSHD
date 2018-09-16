import {
  FETCH_FOLLOW_USER,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FOLLOW_USER:
      return { ...state, follow: action.payload };
    case FOLLOW_USER:
      return state;
      case UNFOLLOW_USER:
        return state;
    default:
      return state;
  }
};
