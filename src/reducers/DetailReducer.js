import {
  COMMENT_CREATE,
  COMMENT_SAVE_SUCCESS,
  GET_POST_LOCATION,
  POST_LOCATION_FETCH_SUCCESS,
  SAVE_DISH,
  RECOMMEND_DISH
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  location:[0,0]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMMENT_CREATE:
      return { ...state, text: action.payload };
    case COMMENT_SAVE_SUCCESS:
      //return {...state, text: ''};
        return {text:''};
      case POST_LOCATION_FETCH_SUCCESS:
      //  console.log(action.payload);
        return {...state, location: action.payload};
        //return {...state, [action.payload.prop]: action.payload.value};
      case GET_POST_LOCATION:
        return state;
      case SAVE_DISH:
        return state;
    default:
      return state;
  }
};
