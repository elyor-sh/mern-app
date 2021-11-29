import { httpReq, httpReqAuth, httpReqUpdate, httpReqUpload } from "../axios/axios";

export const httpRegisterPost = (data) => httpReqUpload('/api/auth/register', {data: data})

export const httpLoginPost = (params) => httpReqAuth.post('/api/auth/login', params)

export const httpLinksGet = () => httpReq.get('/api/links')
export const httpLinkPost = (params) => httpReq.post('/api/links/create', params)
export const httpLinkPut = (params) => httpReq.put('/api/links', params)
export const httpLinksGetById = (link) => httpReq.get(`api${link}`)
export const httpLinkDelete = (id) => httpReq.delete(`/api/links/${id}`)

export const httpFilesGet = () => httpReq.get('/api/files')
export const httpFilesPost = (data) => httpReqUpload('/api/files/create', {data: data})
export const httpFilesPut = (data) => httpReqUpdate('/api/files', {data: data})
export const httpFilesGetById = (id) => httpReq.get(`api/files/${id}`)
export const httpFilesDelete = (id) => httpReq.delete(`/api/files/${id}`)