import axios from 'axios';
import config from './config'

const instance = axios.create({
  baseURL: config.app.api
});


instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);


export default instance;
