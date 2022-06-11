import { useCallback, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { goto } from '@inc/router'
import { getStore, removeStore, setStore } from '@util/tool'

const operate = ope => {
  if (!ope) {
    return
  }

  if (typeof ope === 'function') {
    ope()
    return
  }

  if (ope.indexOf('back') > -1) {
    if (ope === 'backRefresh') {
      setStore('backRefresh', true)
    }

    pageBack()
    return
  }

  goto(ope)
}

export const pageBack = back => {
  Taro.navigateBack({
    delta: typeof back === 'number' ? back : 1
  })
}

export const showMsg = (msg = '', ope, wait, icon = 'none') => {
  Taro.showToast({
    title: msg,
    icon
  })

  if (wait) {
    setTimeout(() => {
      operate(ope)
    }, wait)
    return
  }

  operate(ope)
}

export const dealErrs = err => {
  const errs = err.errors
  const errKey = errs && Object.keys(errs)[0]
  const tip = errKey && errs[errKey]
  return { errKey, tip, isMark: tip === '*' }
}

export const showErrs = err => {
  const { errKey, tip, isMark } = dealErrs(err)
  showMsg(err.message + (tip ? `：${isMark ? errKey : tip}` : ''))
}

//返回上页并刷新数据
export const pageRefresh = (fn, remove = true, refreshKey = 'backRefresh') => {
  getStore(refreshKey, res => {
    if (res && fn) {
      fn()
      remove && removeStore(refreshKey)
    }
  })
}

export const usePageRefresh = (remove, refreshKey) => {
  const [reqCount, setReqCount] = useState(1)

  const refresh = useCallback(() => {
    setReqCount((n) => n + 1)
  }, [])

  useDidShow(
    () => pageRefresh(
      () => refresh(), remove, refreshKey
    )
  )

  return { reqCount, refresh }
}

export const showConfirm = (
  {
    fn,
    msg = '您确定要进行删除吗？',
    title = '',
    showCancel = true,
    confirmText = '确定'
  }
) => {
  Taro.showModal({
    title: title,
    content: msg,
    showCancel,
    confirmText,
    cancelText: typeof showCancel === 'string' ? showCancel : '取消'
  }).then(res => {
    res.confirm && operate(fn)
  }).catch(err => console.log(err))
}

export const showLoading = (title = 'loading') => {
  Taro.showLoading({
    title: title,
    mask: true
  })
}

export const hideLoading = () => {
  Taro.hideLoading()
}
