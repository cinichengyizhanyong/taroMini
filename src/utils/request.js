import Taro from '@tarojs/taro'
import { getGateWay, httpHeader, isEnvDev } from '@config'

function TokenNullException(msg) {
  if (!msg) {
    msg = 'Token is null'
  }
  this.code = 404
  this.msg = msg
}

async function $http(url, data, method) {
  if (!data) {
    data = {}
  }
  
  let header = {}
  if (method === 'post' || method === 'json') {
    if (!data.token) {
      throw new TokenNullException()
    }
    if (method === 'json') {
      method = 'post'
    }
    header['content-type'] = 'application/json'
  }
  
  if (isEnvDev()) {
    console.log(data, { ...httpHeader, ...header })
  }
  
  return Taro.request({
    url: getGateWay(url),
    method: method,
    data: data,
    header: { ...httpHeader, ...header }
  }).then(res => {
    const { statusCode } = res
    if (statusCode >= 200 && statusCode < 300) {
      return res.data
    } else {
      throw new Error(`网络缓慢，请稍后重试${statusCode}`)
    }
  })
}

function isSuccessReq(res) {
  return res.code === 200
}

export function request(api, data, method) {
  return $http(api, data, method).then(res => {
    if (isSuccessReq(res)) {
      return res.data
    } else {
      throw res
    }
  })
}

export default request
