import { useCallback, useEffect, useRef, useState } from 'react'
import { userInfoApi } from '@inc/service/user'
import { handlePhone } from '@inc/store/auth'
import { showMsg } from '@util/message'
import { vailPhone } from '@util/regexp'

export function useInput(
  isGetTel,
  initialValue = {},
  nameKey = 'name',
  initFocus = {}
) {
  const user = useRef({})
  const other = useRef({})
  const value = useRef(initialValue)
  const [focus, setFocus] = useState(initFocus)
  const [, setCount] = useState(0)
  const phoneKey = typeof isGetTel === 'string' ? isGetTel : 'phone'

  useEffect(() => {
    if (!isGetTel) {
      return
    }
    userInfoApi().then(res => {
      user.current = res
      value.current = {
        ...value.current,
        [nameKey]: res.nickname,
        [phoneKey]: res.phone
      }
      setCount(c => c + 1)
    })
  }, [isGetTel])

  const handler = {
    get: (target, name) => {
      return e => {
        value.current[name] = e.detail ? e.detail.value : e
      }
    }
  }

  const onChange = new Proxy({}, handler)

  const checkPhone = useCallback(function (e) {
    //弹窗授权
    handlePhone(e, data => {
      onUpdate({ [phoneKey]: data })
    })
  }, [])

  const onFocus = useCallback(key => {
    setFocus({ [key]: true })
  }, [])

  const onUpdate = (key, val) => {
    if (key === 'disabled') {
      other.current.disabled = val
    } else if (typeof key === 'string') {
      value.current[key] = val
    } else {
      value.current = { ...value.current, ...key }
    }
    setCount(c => c + 1)
  }

  const onError = (data, msg, isReset) => {
    if (data) {
      other.current = isReset ? data : { ...other.current, ...data }
    }
    msg && showMsg(msg)
    setCount(c => c + 1)
  }

  const onBlur = useCallback(key => {
    other.current[key] = !value.current[key]
    onError(other)
  }, [])

  return {
    value: value.current,
    other: other.current,
    user: user.current,
    originValue: value,
    focus,
    onChange,
    onFocus,
    onBlur,
    onUpdate,
    onError,
    checkPhone
  }
}

// 手机号授权
export function useAuthPhone() {
  const user = useRef({})
  const [tel, setTel] = useState('')

  useEffect(() => {
    userInfoApi().then(res => {
      user.current = res
      setTel(res.phone)
    })
  }, [])

  const onChange = useCallback(function (e) {
    setTel(e.detail ? e.detail.value : e)
  }, [])

  const checkPhone = useCallback(function (e) {
    //弹窗授权
    handlePhone(e, (data) => {
      setTel(data)
    })
  }, [])

  return {
    tel,
    user: user.current,
    setTel,
    onChange,
    checkPhone
  }
}

/**
 * 必填项是否全部输入
 * @param value<object>
 * @param fields<[string] | [{tip, name, [other]}]>
 * @param tips?<[string]>
 * @param preTip?<bool>
 * @returns {*}
 */
export const isAllInput = (value, fields, tips, preTip = true) => {
  return fields.every((item, index) => {
    const isStr = typeof item === 'string'
    const key = isStr ? item : item.name
    const tip = isStr ? tips[index] : item.tip
    const val = value[key]

    if (key === 'phone' ? vailPhone(val) : val) {
      return true
    }
    showMsg(`${preTip ? `请输入${tip}` : tip}！`)
  })
}
