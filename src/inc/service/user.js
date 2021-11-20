import { cacheGet, get, post } from '@inc/api'

export const sendSmsCode = (data) => get('/user/phonecode', data, true)

export const loginSubmit = (data) => get('/user/login', data)

export const userInfoApi = (data, refresh) =>
  cacheGet('userInfoApi', '/user/info', data, refresh, true)

export const clientVerifyReg = (data) => get('/com/clientSecurity/reg', data)

export const decode = (data) => post('/wxapp/decodePhone', data)

export const accredit = (data) => post('/wxapp/bindBaseInfo', data)
