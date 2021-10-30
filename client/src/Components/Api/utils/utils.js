import { httpReqAuth } from "../axios/axios";

export const httpRegisterPost = (params) => httpReqAuth.post('/api/auth/register', params)

export const httpLoginPost = (params) => httpReqAuth.post('/api/auth/login', params)