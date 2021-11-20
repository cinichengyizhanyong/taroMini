import { useEffect } from 'react'
import { showAuthInfo, showAuthPhone, useAuthStore } from '@inc/store/auth'
import { useUserStore } from '@inc/store/user'
import { isH5, isWeApp } from '@config'
import Phone from './Phone'
import Avatar from './Avatar'

function Auth({ checkPhone, mustCheckPhone, checkAvatar, mustCheckAuth, loginMsg = {} }) {
  const { isAuthBaseInfo, isBindPhone, isLoadedUser } = useUserStore()
  const { showBaseInfo, showPhone } = useAuthStore()
  console.log('auth:showPhone:init', showPhone)

  useEffect(() => {
    if (!isLoadedUser || !isWeApp()) {
      // 会员信息未加载
      // 非微信小程序不显示弹窗
      if (!isH5()) {
        return
      }
    }
    // 授权弹窗
    if (!isBindPhone && checkPhone) {
      showAuthPhone(true, (phone) => {
        console.log('auth:phone:success', phone)
      })
      return
    }
    if (!isAuthBaseInfo && checkAvatar) {
      showAuthInfo(true)
    }
  }, [isLoadedUser, isBindPhone, checkPhone, isAuthBaseInfo, checkAvatar])

  return (
    <>
      <Phone isOpened={showPhone} mustCheckPhone={mustCheckPhone} loginMsg={loginMsg} />
      {isWeApp() && <Avatar isOpened={showBaseInfo} mustCheckAuth={mustCheckAuth} />}
    </>
  )
}

export default Auth
