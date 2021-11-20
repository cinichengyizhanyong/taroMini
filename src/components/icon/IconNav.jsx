import { Button, Image, View } from '@tarojs/components'
import { pxTransform } from '@util/style'
import './IconNav.scss'

function IconNav(
  {
    className = '', style = {}, active = '', showTitle = true,
    iconTit, iconPrefix = 'iconfont', iconKey = 'icon', iconKeyPrefix = '',
    items = [], type = 'nav', column = 4, textKey = 'text',
    bgArr, bgNum, onClick, children, hasItemLine, imgKey
  }
) {
  
  return (
    <View
      className={`${iconTit ? 'icon-tit-box' : ''} ${className}`}
    >
      {iconTit &&
      <View className='icon-tit flex-r'>
        <View className='flex'>{iconTit}</View>
        {children}
      </View>
      }
      
      <View
        className={`icon-wrap icon-${type}`}
        style={style}
      >
        {items.map((item, index) => {
          const options = {}
          if (item.openType) {
            options.id = JSON.stringify(item)
          }
          
          return (
            <Button
              key={index}
              className={`icon-item ${hasItemLine ? 'icon-item-line' : ''} ${item.name === active ? 'c-red' : ''}`}
              openType={item.openType || ''}
              {...options}
              style={`width: ${100 / column}%`}
              onClick={() => {
                item.onTap ? item.onTap() : (onClick && onClick(item))
              }}
            >
              {imgKey && item[imgKey]
                ? <Image className='icon-bg' mode='aspectFill' src={item[imgKey]} />
                : <View
                  className={`${iconPrefix} icon-${bgNum ? `bg bg${bgArr[index % bgNum]}` : 'text'} ${iconKeyPrefix}${item[iconKey === 'mul' ? `icon${item.name === active ? 2 : 1}` : iconKey]}`}
                  style={`${item.color ? `color: ${item.color};` : ''} ${item.size ? `font-size: ${pxTransform(item.size)}` : ''}`}
                />
              }
              
              {showTitle &&
              <View className='text-line1'>{item[textKey]}</View>
              }
            </Button>
          )
        })}
      </View>
    </View>
  )
}

export default IconNav
