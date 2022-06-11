import Taro from '@tarojs/taro'
import { showMsg } from '@util/message'

// 手机号中间隐藏
export function hidePhone(tel) {
  return tel ? tel.slice(0, 3) + '****' + tel.slice(7, 11) : ''
}

export function hideText(txt, num = 6) {
  return txt ? txt.substring(0, txt.length - num) + '******' : ''
}

export function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

export function call(phone = '4006464001') {
  if (!phone) {
    return
  }
  Taro.makePhoneCall({
    phoneNumber: phone
  }).catch(() => {
  })
}

//数字返回2位数
export function numLen(num) {
  num = num + ''
  return num.length === 1 ? 0 + num : num
}

// 元素滚动高度获取
export function getScrollTop(ele, fn) {
  const query = Taro.createSelectorQuery()
  setTimeout(() => {
    query.select(ele).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => fn(res[0] && res[0].top, res[0]))
  }, 600)
}

// 数组去重
export function uniq(array) {
  let temp = [] //一个新的临时数组
  for (let i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) === -1) {
      temp.push(array[i])
    }
  }
  return temp
}

// 异步设置本地缓存
export function setStore(key, value) {
  Taro.setStorage({ key, data: value })
}

export function getStore(key, suc, err) {
  Taro.getStorage({ key }).then(res => {
    suc && suc(res.data)
  }).catch(() => {
    err && err()
  })
}

export function removeStore(key) {
  Taro.removeStorage({ key })
}

// 复制
export function onCopy(data) {
  Taro.setClipboardData({ data }).then(() => {
    Taro.getClipboardData().then(res => console.log(res.data))
  })
}

// 导航
export function daoHang(x, y, name, address) {
  if (x && y) {
    Taro.openLocation({
      latitude: parseFloat(x),
      longitude: parseFloat(y),
      scale: 18,
      name: name,
      address: address || name
    })
  } else {
    showMsg('定位存在异常,请稍后重试！')
  }
}

// 拆分数组
export function sliceArray(arr, num) {
  const items = []
  for (let i = 0; i < arr.length; i += num) {
    items.push(arr.slice(i, i + num))
  }
  return items
}

// 防抖
let debounceTime = null

export const debounce = (fn, wait) => {
  if (debounceTime !== null) clearTimeout(debounceTime)
  debounceTime = setTimeout(fn, wait)
}
