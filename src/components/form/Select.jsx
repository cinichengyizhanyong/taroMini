import { useEffect, useState } from 'react'
import { Picker, View } from '@tarojs/components'

function PickerSel(
  {
    className = '', defaultClass = 'at-input f-16', txtSty = '',
    mode = 'selector', label, txt, placeholder = '请选择',
    required, error, items = [], itemKey = 'name',
    value, tip, showArr,
    onChange = () => {
    },
    onColumnChange = () => {
    },
    children
  }
) {
  const isArea = mode === 'region'
  const [text, setText] = useState(txt)

  useEffect(() => {
    setText(txt)
  }, [txt])

  const changeCall = e => {
    const res = e.detail.value
    if (mode === 'selector') {
      let item = items[res]
      setText(itemKey ? item[itemKey] : item)
      onChange(item, parseInt(res))
      return
    }

    if (isArea) {
      const resStr = res.join(' ')
      setText(resStr)
      onChange(res, resStr)
      return
    }

    const mulRes = res.map((item, index) => {
      const iItem = items[index][item]
      return itemKey ? iItem[itemKey] : iItem
    })
    const mulResStr = mulRes.join(' ')
    setText(mulResStr)
    onChange(mulRes, mulResStr, res)
  }

  return (
    <Picker
      mode={mode}
      range={isArea ? null : items}
      rangeKey={isArea ? null : itemKey}
      value={value}
      onChange={changeCall}
      onColumnChange={onColumnChange}
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
