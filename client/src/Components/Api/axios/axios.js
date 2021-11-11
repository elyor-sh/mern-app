import axios from 'axios'

export const  httpReq = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json; charset=utf-8'
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
  });
  
  export const httpReqAuth = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json; charset=utf-8',
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
  });

  export const httpReqUpload = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    method: 'post',
    mode: 'cors',
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
      'Language': 'ru',
    },
  });
  

  httpReqAuth.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // localStorage.removeItem('token');
      console.log(error);
      return Promise.reject(error);
    },
  );

  httpReqAuth.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    // localStorage.removeItem('token');
    return Promise.reject(error);
  },
);

  httpReq.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem('token');
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  

  httpReq.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      return Promise.reject(error.response);
    },
  );

  httpReqUpload.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem('token');
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );