import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

function Sheet(
  {
    className = '', defaultClass = 'at-input f-16', txtSty = '',
    label, txt = '', placeholder = '请选择',
    required, error, tip, showArr,
    items = [], itemKey = 'name',
    onChange = () => {
    },
    children
  }
) {
  const [text, setText] = useState(txt)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setText(txt)
  }, [txt])

  const onTap = (item, index) => {
    onChange(item, index)
    setText(item[itemKey])
    setShow(false)
  }

  return (
    <>
      <View
        className={`flex-r ${defaultClass} ${className}`}
        onClick={() => setShow(true)}
      >
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

      <AtActionSheet isOpened={show} cancelText='取消'>
        {items.map((item, index) => {
          return (
            <AtActionSheetItem key={index} onClick={() => onTap(item, index)}>
              {item[itemKey]}
            </AtActionSheetItem>
          )
        })}
      </AtActionSheet>
    </>
  )
}

export default Sheet
