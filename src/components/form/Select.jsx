import { useEffect, useState } from 'react'
import { Picker, View } from '@tarojs/components'

function PickerSel(
  {
    className = 'at-input f-16', txtSty = '',
    mode = 'selector', label, txt, placeholder = '请选择',
    required, error, items = [], itemKey = 'name',
    value, tip, showArr,
    onChange = () => {
    },
    children
  }
) {
  const isArea = mode === 'region'
  const [text, setText] = useState(txt)
  
  useEffect(() => {
    setText(txt)
  }, [txt])
  
  const change = e => {
    const res = e.detail.value
    if (mode === 'selector') {
      let item = items[res]
      onChange(item, parseInt(res))
      setText(itemKey ? item[itemKey] : item)
      return
    }
    if (isArea) {
      setText(res.join(' '))
      onChange(res, res.join(' '))
    }
  }
  
  return (
    <Picker
      mode={mode}
      range={isArea ? null : items}
      rangeKey={isArea ? null : itemKey}
      value={value}
      onChange={change}
    >
      <View className={`flex-r ${className}`}>
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
            <View
              className={`flex ${text ? '' : 'placeholder'} ${txtSty}`}
            >
              {text || placeholder}
            </View>
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

export default PickerSel
