import { httpReq, httpReqAuth, httpReqUpload } from "../axios/axios";

export const httpRegisterPost = (data) => httpReqUpload('/api/auth/register', {data: data})

export const httpLoginPost = (params) => httpReqAuth.post('/api/auth/login', params)

export const httpLinksGet = () => httpReq.get('/api/links')
export const httpLinkPost = (params) => httpReq.post('/api/links/create', params)
export const httpLinkPut = (params) => httpReq.put('/api/links', params)
export const httpLinksGetById = (link) => httpReq.get(`api${link}`)
export const httpLinkDelete = (id) => httpReq.delete(`/api/links/${id}`)