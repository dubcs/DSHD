import {
    GET_USER_IMAGES,
    USER_IMAGES_FETCH_SUCCESS
  } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_IMAGES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
