import axios from 'axios'
import { useToaster } from '../../hooks/useToaster';

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

  export const httpReqUpdate = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    method: 'put',
    mode: 'cors',
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
      'Language': 'ru',
    },
  });

  export const httpReqDownloadFiles = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    timeout: 30000,
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      'Language': 'ru',
    },
    responseType: 'blob'
  });
  

  httpReqAuth.interceptors.response.use(
    (response) => {
      
      return response;
    },
    (error) => {
      // localStorage.removeItem('token');
      console.log(error);
      useToaster(error.response.data.message)
      return Promise.reject(error);
    },
  );

  httpReqAuth.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    // localStorage.removeItem('token');
    useToaster(error.response.data.message)
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

      useToaster(error.response.data.message)
      return Promise.reject(error);
    },
  );
  

  httpReq.interceptors.response.use(
    (response) => {
      
      return response;
    },
    async function (error) {

      useToaster(error.response.data.message)
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

      useToaster(error.response.data.message)
      return Promise.reject(error);
    },
  );
  httpReqUpload.interceptors.response.use(
    (response) => {
      
      return response;
    },
    async function (error) {

      useToaster(error.response.data.message)
      return Promise.reject(error.response);
    },
  );

  httpReqUpdate.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem('token');
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    (error) => {

      useToaster(error.response.data.message)
      return Promise.reject(error);
    },
  );
  
  httpReqUpdate.interceptors.response.use(
    (response) => {
      
      return response;
    },
    async function (error) {

      useToaster(error.response.data.message)
      return Promise.reject(error.response);
    },
  );

  httpReqDownloadFiles.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem('token');
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    (error) => {

      useToaster(error.response.statusText)
      return Promise.reject(error);
    },
  );
  
  httpReqDownloadFiles.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {

      useToaster(error.response.statusText)
      return Promise.reject(error.response);
    },
  );