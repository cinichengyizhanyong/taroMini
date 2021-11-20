import { AtInput } from 'taro-ui'
import { useState } from 'react'
import { View } from '@tarojs/components'
import { useGeeVerify } from '@inc/use-verify'
import { sendSmsCode } from '@inc/service/user'
import { showErrs, showMsg } from '@util/message'
import { vailPhone } from '@util/regexp'
import { isH5 } from '@config'
import Counter from './Counter'

function PhoneCode(
  {
    required, error, form = {},
    phoneKey = 'phone', codeKey = 'code',
    onFocus = () => {
    },
    onBlur = () => {
    },
    service
  }
) {
  const [start, setStart] = useState(false)
  const { verify } = useGeeVerify()
  
  const sendCode = (args = {}) => {
    setStart(true)
    const _service = service || sendSmsCode
    _service({
      ...args,
      phone: form[phoneKey]
    }).then(() => {
      showMsg('验证码发送成功, 请注意查收！')
    }).catch(err => {
      showErrs(err)
    })
  }
  
  const onSendCode = () => {
    if (start) {
      return
    }
    
    if (vailPhone(form[phoneKey])) {
      if (isH5()) {
        verify((geeParams) => {
          sendCode(geeParams)
        })
      } else {
        sendCode({ style: 2 })
      }
    } else {
      onFocus(phoneKey)
      showMsg('请输入正确手机号！')
    }
  }
  
  return (
    <>
      <AtInput
        required={required}
        error={error}
        title='验证码'
        name={codeKey}
        placeholder='请输入验证码'
        maxLength='6'
        value={form[codeKey]}
        onBlur={() => onBlur(codeKey)}
        onChange={e => form[codeKey] = e}
      >
        <Counter
          start={start}
          onFinish={() => {
            setStart(false)
          }}
          onClick={onSendCode}
        />
      </AtInput>
      
      {error && <View className='error'>请填写验证码！</View>}
    </>
  )
}

export default PhoneCode
