import { httpReqAuth } from "../axios/axios";

export const httpRegisterPost = (params) => httpReqAuth.post('/api/auth/register', params)