import { Button, View } from '@tarojs/components'
import { pxTransform } from '@util/style'
import './IconText.scss'

function IconText(
  {
    leftArr = [], leftWidth = 130,
    rightArr = [], rightMg,
    active = '', iconPrefix = 'iconfont', children
  }
) {
  
  return (
    <View className='icon-text flex-r bt-f5 text-center c-6 bg-f'>
      <View className='flex-r box-l'>
        {leftArr.map((item, index) => {
          return (
            <Button
              key={index}
              className={`${active === item.name ? 'c-red' : ''} ${item.className || ''}`}
              style={`width: ${pxTransform(leftWidth)}`}
              openType={item.openType || ''}
              onClick={() => {
                item.onTap && item.onTap()
              }}
            >
              <View
                className={`icon-l ${iconPrefix} ${item.icon}`}
                style={item.size ? `font-size: ${pxTransform(item.size)}` : ''}
              />
              <View className='text-l'>{item.text}</View>
            </Button>
          )
        })}
      </View>
      
      {rightArr.map((item, index) => {
        return (
          <Button
            key={index}
            className={`box-r${rightMg ? '-btn' : ''} flex ${item.bg || ''} c-f`}
            disabled={item.disabled}
            openType={item.openType || ''}
            onClick={() => {
              item.onTap && item.onTap()
            }}
          >
            {item.text}
          </Button>
        )
      })}
      
      {children}
    </View>
  )
}

export default IconText
