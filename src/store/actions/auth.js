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
  token: authData.idToken,
  userId: authData.localId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, isSignUp) => (
  /* Возвращает функцию, которая в качестве аргумента принимает dispatch,
  это возможно благодоря подключенному middleware redux-thunk */
  /* Если аргумент isSignUp === true значит происходит регистрация нового пользователя,
  в ином случае происходит авторизация уже существующего пользоваетля */
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
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDulYYUqaUNuVVCTPlrjoDYQSC4DBPuaQQ';
    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDulYYUqaUNuVVCTPlrjoDYQSC4DBPuaQQ';
    }
    axios.post(url, authData)
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
