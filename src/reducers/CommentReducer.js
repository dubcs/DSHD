import {
    GET_COMMENTS,
    COMMENT_FETCH_SUCCESS
  } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENT_FETCH_SUCCESS:
    //console.log(action.payload);
      //return {...state, comment: action.payload};
      return action.payload;
    default:
      return state;
  }
};
