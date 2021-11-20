import { AtInput } from 'taro-ui'
import { Button, Image, OpenData, View } from '@tarojs/components'
import BaseView from '@com/BaseView'
import PhoneCode from '@com/PhoneCode'
import { useInput } from '@inc/use-form'
import { saveUser, useUserStore } from '@inc/store/user'
import { handlePhone } from '@inc/store/auth'
import { loginSubmit } from '@inc/service/user'
import { showMsg } from '@util/message'
import { isH5 } from '@config'
import logo from '@img/avatar.jpg'
import './login.scss'

function MineLogin() {
  const { value, focus, onChange, onFocus } = useInput()

  useUserStore() // 不能删除

  const goLogin = () => {
    if (value.phone && value.code) {
      loginSubmit({
        phone: value.phone,
        phone_code: value.code
      }).then((rs) => {
        saveUser(rs)
        showMsg('登录成功！', 'back')
      }).catch((error) => {
        showMsg(error.message)
      })
    } else {
      showMsg('请输入正确的手机号和验证码！')
    }
  }

  return (
    <BaseView>
      <View className='mine'>
        <View className='top text-center mb-15'>
          {isH5()
            ? <Image className='head' mode='aspectFill' src={logo} />
            : <View className='head'>
              <OpenData type='userAvatarUrl' />
            </View>
          }

          <View className='f-15 c-f'>
            {isH5() ? '您好' : <OpenData type='userNickName' />}
          </View>
        </View>

        <View className='bg-f'>
          <AtInput
            name='phone'
            title='手机号'
            placeholder='请输入手机号'
            type='number'
            focus={focus.phone}
            value={value.phone}
            onChange={onChange.phone}
          />

          <PhoneCode form={value} onFocus={onFocus} />
        </View>

        <Button
          className='login-btn'
          onClick={goLogin}
        >
          登录
        </Button>
        
        {!isH5() &&
        <Button
          className='wx-btn' openType='getPhoneNumber'
          onGetPhoneNumber={e => handlePhone(e, () => showMsg('登录成功！', 'back'))}
        >
          微信快捷登录
        </Button>
        }
      </View>
    </BaseView>
  )
}

export default MineLogin
