import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-45a84.firebaseio.com/',
});

export default instance;
