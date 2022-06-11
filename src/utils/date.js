import { numLen } from '@util/tool'

export const _seconds = 1000
export const _minutes = 60 * _seconds
export const _hours = 60 * _minutes
export const _day = 24 * _hours

// 获取时间
export const getNewTime = time => {
  return new Date(typeof time === 'string' ? time.replace(/-/g, '/') : time)
}

//时间转换
export const timeParse = (time, noDeal) => {
  const date = time ? getNewTime(time) : new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  if (!noDeal) {
    month = numLen(month)
    day = numLen(day)
    hours = numLen(hours)
    minutes = numLen(minutes)
    seconds = numLen(seconds)
  }
  return { year, month, day, hours, minutes, seconds }
}

//时间格式化
export const formatTime = (time, unit, noDeal) => {
  const { year, month, day, hours, minutes, seconds } = timeParse(time, noDeal)
  const ny = `${year}-${month}`
  const nyr = `${ny}-${day}`
  const sf = `${nyr} ${hours}:${minutes}`
  const sfm = `${sf}:${seconds}`
  const res = { ny, nyr, sf, sfm }
  return unit ? res[unit] : ny
}

// 时间差
export const timeDiffer = time => {
  if (!time) {
    return null
  }

  return getNewTime(time) - new Date()
}

export const timeSpace = (time) => {
  const date = timeDiffer(time)

  if (date > 0) {
    const sDay = date % _day
    const sHours = sDay % _hours
    const sMinutes = sHours % _minutes

    const day = Math.floor(date / _day)
    const hours = Math.floor(sDay / _hours)
    const minutes = Math.floor(sHours / _minutes)
    const seconds = Math.round(sMinutes / _seconds)
    return { day, hours, minutes, seconds }
  }
  return null
}

// 获取月份天数
export const getDays = (year, month) => {
  const days = []
  const d = new Date(year, month, 0)

  for (let i = 1; i <= d.getDate(); i++) {
    days.push(i)
  }

  return days
}

// 根据日期返回星期几，date为时间格式
export const getMyDay = (date) => {
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return week[date.getDay()]
}
