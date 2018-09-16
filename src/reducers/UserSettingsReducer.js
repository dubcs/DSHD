import {
  GET_AVATAR_PHOTOS,
  GET_AVATAR_PHOTOS_CAMERA,
  AVATAR_PHOTO_SAVE_SUCCESS,
  AVATAR_PHOTO_SAVE_CANCELLED,
  USER_EMAIL_CHANGED,
  USER_PASSWORD_CHANGED,
  USER_USERNAME_CHANGED,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  IS_CONTRIBUTOR,
} from '../actions/types';

const INITIAL_STATE = {
  email:'',
  password:'',
  username:'',
  firstname:'',
  lastname:'',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case USER_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case LASTNAME_CHANGED:
      return {...state, lastname: action.payload};
    case FIRSTNAME_CHANGED:
      return {...state, firstname: action.payload};
    case GET_AVATAR_PHOTOS:
      return {...state};
    case IS_CONTRIBUTOR:
      return{...state, contributor: action.payload}
    case AVATAR_PHOTO_SAVE_SUCCESS:
      return {...state, image: action.payload};
    case AVATAR_PHOTO_SAVE_CANCELLED:
      return {...state};
    case UPDATE_USER_PROFILE_SUCCESS:
      return {...state, firstname:'', lastname:''};
    case UPDATE_USER_PROFILE:
        return INITIAL_STATE;
    default:
      return state;
  }
};
