import Taro from '@tarojs/taro'
import { AtModal } from 'taro-ui'
import { Button, View } from '@tarojs/components'
import { getInfo, showAuthInfo } from '@inc/store/auth'
import { getGlobal } from '@config/global'
import './Auth.scss'

const onGetUser = () => {
  Taro.getUserProfile({
    desc: '用于完善会员资料'
  }).then(res => {
    getInfo(res.detail ? res : { detail: res })
  })
}

export const AvatarBtnAttr = Taro.getUserProfile
  ? { onClick: onGetUser }
  : { openType: 'getUserInfo', onGetuserinfo: getInfo }


function Avatar({ isOpened, mustCheckAuth }) {
  const nums = getGlobal('avatarNums')

  return (
    <AtModal
      isOpened={isOpened && nums < 4}
      closeOnClickOverlay={false}
    >
      <View className='g-auth'>
        <View className='tit'>温馨提示</View>
        <View className='c-9'>为了获取更好的服务体验，</View>
        <View className='c-9'>请先完成微信授权！</View>
        
        <Button
          className='zc-btn'
          {...AvatarBtnAttr}
        >
          允许
        </Button>
        
        {!mustCheckAuth &&
        <View onClick={() => showAuthInfo(false)}>取消</View>
        }
      </View>
    </AtModal>
  )
}

export default Avatar
