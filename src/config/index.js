import Taro from '@tarojs/taro'

export function isH5() {
  return Taro.getEnv() === Taro.ENV_TYPE.WEB
}

export function isWeApp() {
  return Taro.getEnv() === Taro.ENV_TYPE.WEAPP
}

export function isBdApp() {
  return Taro.getEnv() === Taro.ENV_TYPE.SWAN
}

export function isEnvProduct() {
  return process.env.NODE_ENV === 'production'
}

export function isEnvPre() {
  return false
}

export function getEnv() {
  return Taro.getEnv()
}

export function isEnvDev() {
  return !(isEnvPre() || isEnvProduct())
}

export function isEnvTag(tag) {
  return TAG === tag
}

export function isEnvTagIncludes(tag) {
  return TAG ? TAG.includes(tag) : false
}

// 网关地址
let url

export function getGateWay(path) {
  if (!url) {
    if (isEnvProduct()) {
      if (isH5()) {
        url = 'https://h5-agent.jiuzheng.com'
      } else if (isBdApp()) {
        url = 'https://bd-agent-api.jc001.cn'
      } else {
        url = 'https://wx-demo-api.jc001.cn'
      }
    } else if (isEnvPre()) {
      url = 'https://uc.jc001.cn/pre-r'
    } else {
      // url = 'https://wx-demo-api.jc001.cn'
      url = 'http://wxapi.market.jz.cn'
    }
  }
  
  if (path) {
    return url + path
  } else {
    return url
  }
}

// 全局参数 extInfo
let ext = {}
if (!isH5() && Taro.getExtConfigSync) {
  ext = Taro.getExtConfigSync()
}

export const extInfo = Object.assign({
  client_v: '1.0',
  weblabel: 73,
  name: '九正集客宝',
  address: '四川省成都市金牛区沙湾东二路一号'
}, ext)

// header
export const httpHeader = {
  'X-APP': extInfo.weblabel,
  'X-APP-CLIENT': getEnv(),
  'X-APP-CLIENT-V': extInfo.client_v,
  'X-API-VERSION': 3,
  'X-APP-DEV': isEnvDev() ? '' : '1'
}
