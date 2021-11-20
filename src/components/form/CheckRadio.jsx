import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import { pxTransform } from '@util/style'
import './Check.scss'

function CheckRadio(
  {
    className = 'at-input f-16', label, required,
    items = [], itemKey = 'name',
    column = 2, checked, checkKey = 'id',
    isParse, width = 40, radius = 100,
    error, tip,
    onChange = () => {
    },
    children
  }
) {
  const w = pxTransform(width)
  const [check, setCheck] = useState(checked)
  
  useEffect(() => {
    if (checked) {
      setCheck(checked)
    }
  }, [checked])
  
  return (
    <View className={`flex-r ${className}`}>
      {label &&
      <View
        className={`at-input__title ${required ? 'at-input__title--required' : ''}`}
      >
        {label}
      </View>
      }
      {children}
      
      <View className='flex'>
        <View className='flex-r pr-6'>
          <View className='flex-r flex'>
            {items.map((item, index) => {
              const value = item[checkKey] || item
              
              return (
                <View
                  key={index}
                  className={index < column ? '' : 'mt-5'}
                  style={`width: ${100 / column}%`}
                  onClick={() => {
                    setCheck(value)
                    onChange(value)
                  }}
                >
                  <View
                    className={`check dis-i vtm ${value === (isParse ? parseInt(check) : check) ? 'checked' : ''}`}
                    style={`width: ${w}; height: ${w}; border-radius: ${pxTransform(radius)}`}
                  />
                  {item[itemKey] || item}
                </View>
              )
            })}
          </View>
          
          {error &&
          <View className='at-icon at-icon-alert-circle f-16 c-red' />
          }
        </View>
        
        {tip &&
        <View className='mt-5 mr-10 f-12 c-red'>{tip}</View>
        }
      </View>
    </View>
  )
}

export default CheckRadio
