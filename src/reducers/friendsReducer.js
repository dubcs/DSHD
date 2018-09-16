import {
  FETCH_FRIENDS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FRIENDS:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
