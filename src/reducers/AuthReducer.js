import { EMAIL_CHANGED
    , PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_SUCCESS,
    USERNAME_CHANGED,
    AUTH_FAILED,
    AUTH_STATE
  } from '../actions/types';


const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  isLoggedin: false,
  error: '',
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
        return { ...state,
          user: action.payload,
          error: '',
          loading: false,
          isLoggedin: true,
          password: '',
          email: ''
         };
    case AUTH_STATE:
      return {...state, loading: true, isLoggedin: false};
    case LOGIN_USER_FAIL:
        return { ...state,
           error: 'Authentication Error, please try again',
           password: '',
           loading: false,
            email: ''
          };
    case LOGIN_USER:
        return { ...state, loading: true, error:'' };
    case LOGOUT_SUCCESS:
      return {...state, isLoggedin:false };
    case AUTH_FAILED:
      return {...state, loading:false};
    default:
        return state;
  }
};
