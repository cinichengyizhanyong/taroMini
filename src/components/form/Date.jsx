import { useEffect, useState } from 'react'
import { Picker, View } from '@tarojs/components'

function PickerDate(
  {
    className = '', defaultClass = 'at-input f-16', txtSty = '', mode = 'date',
    fields, label, txt, placeholder = '请选择',
    required, error, tip, showArr, start = '',
    onChange = () => {
    },
    children
  }
) {
  const [text, setText] = useState(txt)

  useEffect(() => {
    setText(txt)
  }, [txt])

  const change = e => {
    const value = e.detail.value
    onChange(value)
    setText(value)
  }

  return (
    <Picker
      mode={mode}
      fields={fields}
      start={start}
      onChange={change}
    >
      <View className={`flex-r ${defaultClass} ${className}`}>
        {label &&
        <View
          className={`at-input__title ${required ? 'at-input__title--required' : ''} ${error ? 'c-red' : ''}`}
        >
          {label}
        </View>
        }

        {children}

        <View className='flex'>
          <View className='flex-r v-input pr-6'>
            <View className={`flex ${text ? '' : 'placeholder'} ${txtSty}`}>{text || placeholder}</View>

            {error &&
            <View className='at-icon at-icon-alert-circle f-16 c-red' />
            }

            {showArr &&
            <View className='at-icon at-icon-chevron-right f-18 c-9' />
            }
          </View>

          {tip &&
          <View className='mt-5 mr-10 f-12 c-red'>{tip}</View>
          }
        </View>
      </View>
    </Picker>
  )
}

export default PickerDate
