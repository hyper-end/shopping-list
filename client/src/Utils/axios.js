/*
  This is a module named axios.js which exports an instance of the axios library with some configuration and an interceptor. 
*/

// import the axios library
import axios from 'axios';

// import the configuration object
import config from './config';

// create an instance of axios with the base URL set to the value of the "api" property of the configuration object
const instance = axios.create({
  baseURL: config.app.api
});

// add an interceptor that will run before every request
instance.interceptors.request.use(
  function(config) {
    // get the JWT from local storage
    const token = localStorage.getItem('token');
    // if the JWT exists, add an Authorization header to the request with the value "Bearer <token>"
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    // return the modified config object
    return config;
  },
  function(error) {
    // if there is an error, reject the promise with the error object
    return Promise.reject(error);
  }
);

// export the configured axios instance
export default instance;
