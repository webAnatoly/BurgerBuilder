import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
/* Этот Action Creators просто возвращает объект,
и будет использоваться для изменения свойства loading в сторе.
На основе loading буду показывать/непоказывать спиннер. */
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password) => (
  /* Возвращает функцию, которая в качестве аргумента принимает dispatch,
  это возможно благодоря подключенному middleware redux-thunk */
  (dispatch) => {
    dispatch(authStart());
    // здесь будем авторизировать юзера
    /*
    В качестве бекенда использую Firebase.
    Докуметацию по Firebase Auth REST API см. тут https://firebase.google.com/docs/reference/rest/auth/
    */
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDulYYUqaUNuVVCTPlrjoDYQSC4DBPuaQQ', authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
);
