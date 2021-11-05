import { httpReq, httpReqAuth } from "../axios/axios";

export const httpRegisterPost = (params) => httpReqAuth.post('/api/auth/register', params)

export const httpLoginPost = (params) => httpReqAuth.post('/api/auth/login', params)

export const httpLinksGet = () => httpReq.get('/api/links')
export const httpLinkPost = (params) => httpReq.post('/api/links/create', params)
export const httpLinkPut = (params) => httpReq.put('/api/links', params)
export const httpLinksGetById = (link) => httpReq.get(`api${link}`)
export const httpLinkDelete = (id) => httpReq.delete(`/api/links/${id}`)