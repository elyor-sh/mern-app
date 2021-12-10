import axios from "axios";
import { httpReq, httpReqAuth, httpReqDownloadFiles, httpReqUpdate, httpReqUpload } from "../axios/axios";


export const httpGetClientAddress = () => axios.get('https://geolocation-db.com/json/')

export const httpCheckRegisterPost = (params) => httpReqAuth.post('/api/auth/checkRegister', params)

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
export const httpFilesDownload = (params) => httpReqDownloadFiles.get(`/api/files/download?id=${params}`)


export const httpGetUser = () => httpReq.get('/api/user')
export const httpPutUser = (params) => httpReq.put('/api/user', params)
export const httpPostUserAvatar = (data) => httpReqUpload('/api/user/avatar', {data: data})
export const httpPutUserAvatar = (data) => httpReqUpdate('/api/user/avatar', {data: data})
export const httpDeleteUserAvatar = (id) => httpReq.delete(`/api/user/avatar/${id}`)