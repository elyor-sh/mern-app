import axios from 'axios'

export const  httpReq = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
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
      'Content-Type': 'application/json; charset=utf-8',
    },
    transformRequest: [
      (data) => {
        return JSON.stringify(data);
      },
    ],
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