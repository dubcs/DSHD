import {
  RECOMMEND_DISH,
  SAVE_RECOMMENDATION
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECOMMEND_DISH:
      return { ...state, text: action.payload };
    default:
      return state;
  }
};
