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

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

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
        const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  }
);

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

// Проверяет наличие токена доступа в браузерном localStorage и реализует соответствующею логику.
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) { // если токена вообще нет
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) { // если токен есть и его срок годности не истёк
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess({ token, userId }));
      // определяет сколько осталось жить токену в секундах и диспатчит checkAuthTimeout
      const expirationTime = (expirationDate.getTime() - new Date().getTime()) / 1000;
      dispatch(checkAuthTimeout(expirationTime));
    } else { // если токен есть, но срок годности истек
      dispatch(logout());
    }
  }
};
