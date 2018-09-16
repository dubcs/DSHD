import firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import {
  LOGIN_USER_SUCCESS,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_STATE,
  LOGOUT,
  LOGOUT_SUCCESS,
  AUTH_FAILED,
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const usernameChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    setTimeout(() =>
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch)),2000);
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({type: LOGIN_USER_SUCCESS, payload: user});

};

export const logout = () => {
  return (dispatch) => {
  //  dispatch({ type: LOGOUT })
    firebase.auth().signOut().then(() => LogoutSuccess(dispatch));
      //.catch((error) => console.log(error));
  };
};
const logoutSuccess = (dispatch) => {
  console.log('in the success');
  dispatch( {type: LOGOUT_SUCCESS} );
};

const loginUserFail = (dispatch) => {
console.log('fail');
  dispatch({ type: LOGIN_USER_FAIL});
};
export const createUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};
const authFailed = (dispatch) => {
  dispatch({type: AUTH_FAILED});
}

export const authState = () => {

  return (dispatch) => {
    dispatch({ type: AUTH_STATE });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      console.log('user is logged');
        loginUserSuccess(dispatch, user);
      } else {
        console.log('no user');
        authFailed(dispatch);

      }
    });
  };
};
