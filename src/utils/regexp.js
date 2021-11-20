import { showMsg } from '@util/message'

// 验证是否是手机号码
export const vailPhone = (number, msg = '请输入正确的手机号码！') => {
  const reg = /^(1[0-9]{10})$/
  
  if (!number || number.length !== 11 || !reg.test(number)) {
    msg && showMsg(msg)
    return false
  }
  return true
}

// 验证是否是身份证号码
export const vailIdCard = (number, msg = '请输入正确的身份证号码！') => {
  const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  
  if (!number || !reg.test(number)) {
    msg && showMsg(msg)
    return false
  }
  
  return true
}

// 是否为中文姓名
export const isChinaName = (name, msg = '请输入2个或以上的中文！') => {
  const reg = /.*[\u4e00-\u9fa5]+.*$/
  
  if (!name || name.length < 2 || !reg.test(name)) {
    msg && showMsg(msg)
    return false
  }
  return true
}
