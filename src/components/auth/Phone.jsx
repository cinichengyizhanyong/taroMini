import { Button, View } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import { isH5 } from '@config'
import { go } from '@inc/router'
import { rMine } from '@inc/router/url'
import { handlePhone, showAuthPhone } from '@inc/store/auth'
import './Auth.scss'

function Phone({ isOpened, mustCheckPhone, loginMsg = {} }) {
  const login = () => {
    showAuthPhone(false)
    go(rMine.login)()
  }
  return (
    <AtModal
      isOpened={isOpened} closeOnClickOverlay={!mustCheckPhone}
      onClick={() => showAuthPhone(false)}
    >
      <View className='g-auth'>
        <View className='tit'>{loginMsg.title || '登录注册提示'}</View>
        <View className='c-9'>{loginMsg.txt || '请先完成登录，再继续操作'}</View>
        {isH5()
          ? <Button className='zc-btn' onClick={login}>
            {loginMsg.btn || '快捷登录'}
          </Button>
          : <Button
            className='zc-btn' openType='getPhoneNumber'
            onGetPhoneNumber={handlePhone}
          >
            {loginMsg.btn || '微信快捷登录'}
          </Button>
        }
        {!mustCheckPhone &&
        <View onClick={() => showAuthPhone(false)}>取消</View>
        }
      </View>
    </AtModal>
  )
}

export default Phone
