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

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = expirationTime => (
  /* Асинхронный action creator, который на вход принимает время жизни токена
  и по истечению этого времени диспатчит функцию AUTH_LOGOUT.
  AUTH_LOGOUT меняет состояние с "авторизирован" на "не авторизирован".
  Так как в качестве бекенда использую Firebase, то время жизни токена равно 3600 секундам,
  т.е. 1 час.
  Firebase кроме токена еще присылает refreshToken,
  по которому можно получить новый токен для авторизированного пользователя.
  Но пока что я буду просто делать LOGOUT по истечению 3600 секунд. */
  dispatch => (
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  )
);

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
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  }
);
