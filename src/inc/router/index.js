import Taro from '@tarojs/taro'
import { showMsg } from '@util/message'
import { isEnvTagIncludes, isH5 } from '@config'
import { rIndex } from './url'

export * from './url'

export const topPages = [rIndex.index]

const router = {
  genUrl(page, data) {
    return buildQuery(page, data)
  },
  
  /**
   * 打开新页面, 将当前压入路由栈
   * @param page
   * @param data
   * @constructor
   */
  ToPage(page, data) {
    if (isH5()) {
      Taro.navigateTo({
        url: this.genUrl(page, data)
      })
      return
    }
    
    if (topPages.includes(page)) {
      this.ToNavBar(page)
      return
    }
    
    Taro.navigateTo({
      url: this.genUrl(page, data)
    })
  },
  
  /**
   * 关闭当前页面, 重定向到下一页面
   * @param page
   * @param data
   * @constructor
   */
  ToRedirect(page, data) {
    if (isH5()) {
      this.ToPage(page, data)
      return
    }
    
    if (topPages.includes(page)) {
      this.ToNavBar(page)
      return
    }
    
    Taro.redirectTo({
      url: this.genUrl(page, data)
    })
  },
  
  /**
   * 清除路由栈, 跳转到tab对应的页面
   * @param page
   * @constructor
   */
  ToNavBar(page) {
    if (isH5()) {
      this.ToPage(page)
      return
    }
    
    Taro.switchTab({
      url: this.genUrl(page)
    })
  },
  
  reLaunch(page, data) {
    if (isH5()) {
      this.ToPage(page, data)
      return
    }
    
    Taro.reLaunch({
      url: this.genUrl(page, data)
    })
  }
}

export function buildQuery(path, data) {
  if (data && !data.changedTouches) {
    let str = ''
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let val = data[key]
        str = (str ? str + '&' : str) + key + '=' + encodeURIComponent(
          val.trim ? val.trim() : val
        )
      }
    }
    path = path + (path.indexOf('?') > 0 ? '&' : '?') + str
  }
  if (path.substring(0, 1) !== '/') {
    path = '/' + path
  }
  return path
}

export const toMiniProgram = (appId, path) => {
  Taro.navigateToMiniProgram({
    appId,
    path,
    envVersion: 'release',
    success(res) {
      console.log('Go jz app:', res)
    }
  })
}

export default router

export function go(...args) {
  return () => {
    router.ToPage(...args)
  }
}

export function goto(...args) {
  return router.ToPage(...args)
}

export function goRedirect(...args) {
  return router.ToRedirect(...args)
}

export function goReLaunch(...args) {
  return router.reLaunch(...args)
}

export const toLiveRoom = roomId => {
  if (!isEnvTagIncludes('live')) {
    return
  }
  
  if (!roomId) {
    showMsg('没有房间id！')
    return
  }
  
  Taro.navigateTo({ url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}` })
}
