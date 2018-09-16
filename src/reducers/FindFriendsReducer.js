import {
  FIND_POSSIBLE_FRIENDS,
  FRIEND_SEARCHER,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIND_POSSIBLE_FRIENDS:
      return { ...state, findFriends: action.payload };
      case FRIEND_SEARCHER:
        return { ...state, findFriends: action.payload };
    default:
      return state;
  }
};
