/* eslint-env browser */
/* eslint-env browser добавил, что-бы линтер не выдавал ошибку document is undefined
эта дериктива дает понят selint'y что в качестве окружения используется браузер */
import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './styles.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
