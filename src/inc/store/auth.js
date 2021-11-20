import { Store } from 'laco'
import { makeStore } from '@util'
import { showMsg } from '@util/message'
import { isH5, isWeApp } from '@config'
import { getUserAsync, setUserInfo } from '@inc/store/user'
import { accredit, decode, userInfoApi } from '@inc/service/user'

export const AuthStore = new Store({
  showPhone: false,
  phone: '',
  showBaseInfo: false
}, 'AuthStore')

export const useAuthStore = makeStore(AuthStore)

export const setAuthStore = (key, val) => {
  AuthStore.set((state) => {
    return { ...state, [key]: val }
  })
}

/**
 * @param isShow
 * @param onPhoneSuccess
 */
export const showAuthPhone = (isShow, onPhoneSuccess) => {
  if (!(isWeApp() || isH5())) {
    return
  }
  callback.onPhoneSuccess = onPhoneSuccess
  // Phone 组件 authStore init, 得到初始化值
  // BaseView 组件 useEffect 执行, set authStore
  // Phone 组件 useEffect 执行, 订阅authStore变化
  AuthStore.set((state) => {
    console.log('auth:set:showPhone', isShow)
    return { ...state, showPhone: isShow }
  }, 'AuthStore.set')
}

export const handlePhone = (e, suc) => {
  console.log('auth: phone')
  disposeAuth(e, 'phone').then(({ data, userInfo }) => {
    authPhoneSuccess(data)
    suc && suc(data, userInfo)

    AuthStore.set((state) => {
      return { ...state, phone: data }
    }, 'AuthStore.set')
    setUserInfo('isBindPhone', true)
    showMsg('授权成功')
    showAuthPhone(false)
    userInfoApi({}, true).then(res1 => {
      setUserInfo('userInfo', res1)
    })
  }).catch((err) => {
    showMsg('授权失败')
    authPhoneFail()
    console.log('error:', err)
    showAuthPhone(false)
  })
}

export const getInfo = (e, suc) => {
  disposeAuth(e, 'userInfo').then(() => {
    authInfoSuccess()
    suc && suc(e.detail.userInfo)
    setUserInfo('isAuthBaseInfo', true)
    showMsg('授权成功')
    showAuthInfo(false)
    userInfoApi({}, true).then(res1 => {
      setUserInfo('userInfo', res1)
    })
  }).catch(() => {
    showAuthInfo(false)
  })
}

let callback = {}

export const showAuthInfo = (isShow, onInfoSuccess) => {
  if (!isWeApp()) {
    return
  }
  callback.onInfoSuccess = onInfoSuccess
  AuthStore.set((state) => {
    return { ...state, showBaseInfo: isShow }
  })
}

export const authPhoneSuccess = (data) => {
  callback.complete && callback.complete()
  callback.onPhoneSuccess && callback.onPhoneSuccess(data)
  callback.success && callback.success(data)
  callback = {}
}

export const authPhoneFail = () => {
  callback.complete && callback.complete()
  callback.cancel && callback.cancel()
  callback = {}
}

export const authInfoSuccess = () => {
  callback.onInfoSuccess && callback.onInfoSuccess()
  callback = {}
}

export const disposeAuth = async function (e, type) {
  let params = {
    encryptedData: e.detail.encryptedData,
    iv: e.detail.iv
  }

  let data
  if (type === 'userInfo') {
    data = await accredit(params, 'post')
  } else {
    data = await decode(params, 'post')
  }

  const userInfo = getUserAsync(true)
  return { data, userInfo }
}
