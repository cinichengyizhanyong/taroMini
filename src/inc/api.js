import Taro from '@tarojs/taro'
import request from '@util/request'
import { showMsg } from '@util/message'
import { cacheAsyncData, debug } from '@util'
import { getGateWay, httpHeader } from '@config'
import { getUserAsync, getUserSync, logout } from '@inc/store/user'

export function get(api, data, authToken) {
  return requestData('get', api, data, authToken)
}

export function cacheGet(key, api, data, refresh = false, authToken) {
  return cacheAsyncData(key, () => {
    return requestData('get', api, data, authToken)
  }, refresh)
}

export function post(api, data) {
  return requestData('post', api, data, true)
}

export function cachePost(key, api, data, refresh = false) {
  return cacheAsyncData(key, () => {
    return requestData('post', api, data, true)
  }, refresh)
}

const requestData = async (method, api, data, authToken) => {
  if (!data) {
    data = {}
  }

  // 生成api签名
  // data = await makeSign(api, data)

  // console.log('debug: data', data)
  let rs
  if (authToken) {
    rs = getUserAsync().then(function (user) {
      if (!data.token) {
        data.token = user.getToken()
      }
      return request(api, data, method)
    })
  } else {
    let user = getUserSync()
    if (user && !data.token) {
      data.token = user.getToken()
    }
    rs = request(api, data, method)
  }

  return rs.catch((e) => {
    debug('err：', api)
    if (e.code === 5006) {
      // 退出登录
      console.log('error: invalid user, logout')
      logout()
    }
    throw e
  })
}

/**
 * 上传文件
 * @param path
 * @param apiPath
 * @param params
 * @returns {Promise<*>}
 */
export async function uploadFile(path, apiPath, params) {
  if (!params) {
    params = {}
  }
  let user = getUserSync()
  params.token = user.getToken()
  let res = await Taro.uploadFile({
    url: getGateWay(apiPath || '/com/upload/media'), // 上传地址
    filePath: path,
    name: 'file',
    formData: params,
    httpHeader,
    fail: e => {
      showMsg(e.errMsg)
    }
  })

  if (typeof res.data === 'string') {
    res.data = JSON.parse(res.data)
  }

  if (!res.data) {
    res.data = {}
  }

  return res.data
}
