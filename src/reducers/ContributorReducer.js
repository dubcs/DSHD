import {
  GET_CONTRIBUTOR_PHOTOS,
  CONTRIBUTOR_PHOTO_SAVE_SUCCESS,
  UPLOAD_CONTRIBUTOR_IMAGE,
  CONTRIBUTOR_PHOTO_SAVE_CANCELLED,
  DISH_NAME_CHANGED,
  RESTAURANT_NAME_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  contributorImage : '',
  uploading:false,
  dishname:'',
  restaurant:'',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISH_NAME_CHANGED:
      return { ...state, dishname: action.payload };
    case RESTAURANT_NAME_CHANGED:
      return { ...state, restaurant: action.payload };
    case GET_CONTRIBUTOR_PHOTOS:
      return {...state, contributorImage: action.payload}
    case CONTRIBUTOR_PHOTO_SAVE_SUCCESS:
      return {...state, uploading: false, dishname:'',restaurant:'',contributorImage:''}
    case CONTRIBUTOR_PHOTO_SAVE_CANCELLED:
      return {...state, uploading:false, dishname:'',restaurant:'',contributorImage:''}
    case UPLOAD_CONTRIBUTOR_IMAGE:
      return {...state, uploading:true}
    default:
      return state;
  }
};
