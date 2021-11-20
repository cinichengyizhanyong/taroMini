import { isH5 } from '@config'
import { goto } from '@inc/router'
import { rMine } from '@inc/router/url'
import { useUserStore } from '@inc/store/user'
import { showAuthInfo, showAuthPhone } from '@inc/store/auth'

export const typeLink = (link, args) => {
  if (typeof link === 'function') {
    link()
  } else if (link) {
    goto(link, args)
  }
}

// 手机号是否授权
export const useUserTel = () => {
  const { isBindPhone } = useUserStore()
  return (link, args) => {
    if (isBindPhone) {
      typeLink(link, args)
    } else {
      if (isH5()) {
        goto(rMine.login)
      } else {
        showAuthPhone(true, () => {
          typeLink(link, args)
        })
      }
    }
  }
}

// 头像等是否授权
export const useUserAvatar = () => {
  const { isAuthBaseInfo } = useUserStore()
  return (link, args) => {
    if (isAuthBaseInfo) {
      typeLink(link, args)
    } else {
      if (isH5()) {
        goto(rMine.login)
      } else {
        showAuthInfo(true, () => {
          typeLink(link, args)
        })
      }
    }
  }
}
