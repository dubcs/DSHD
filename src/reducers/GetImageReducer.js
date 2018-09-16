import {
  GET_PHOTOS,
  PHOTO_SAVE_SUCCESS,
  UPLOAD_IMAGE,
  PHOTO_SAVE_CANCELLED
} from '../actions/types';

const INITIAL_STATE = {
  image : '',
  uploading:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {...state, uploading: true};
    case PHOTO_SAVE_SUCCESS:
      return {...state, image: action.payload, uploading: false}
    case PHOTO_SAVE_CANCELLED:
      return {...state, uploading:false}
    default:
      return state;
  }
};
