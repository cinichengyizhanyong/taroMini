import Taro from '@tarojs/taro'
import { isH5 } from '@config'

// 尺寸单位转换
export const pxTransform = num => Taro.pxTransform(num, isH5() ? 750 : null)

/**
 * style对象单位转换
 * @param style
 * @param keys
 */
export const getStyleUnit = (style = {}, keys = []) => {
  const sty = { ...style }
  
  keys.forEach(item => {
    const _item = style[item]
    _item && (sty[item] = pxTransform(_item * 2))
  })
  
  return sty
}

/**
 * style数组单位转换
 * @param style
 */
export const getStyArrUnit = (style) => {
  if (!Array.isArray(style)) {
    return ''
  }
  
  const sty = style.map(item => {
    return item ? pxTransform(item * 2) : 0
  })
  
  return sty.join(' ')
}
