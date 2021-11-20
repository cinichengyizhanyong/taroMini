import Taro from '@tarojs/taro'
import { isH5 } from '@config'

let globalData = {
  headerBtnPosi: isH5() ? {} : Taro.getMenuButtonBoundingClientRect(),
  statusBarHeight: Taro.getSystemInfoSync()['statusBarHeight'] // 获取状态栏高度
}

export function getGlobal(key) {
  return globalData[key]
}

export function setGlobal(key, value) {
  globalData[key] = value
}

/**
 * 分享用户id
 * @returns {*}
 */
export function getShareUid() {
  return getGlobal('shareUid') || 0
}

export function setShareUid(uid) {
  setGlobal('shareUid', uid)
}
