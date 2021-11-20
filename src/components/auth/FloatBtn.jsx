import React from 'react'
import { Button, Image, View } from '@tarojs/components'
import './FloatBtn.scss'

function FloatBtn({ items = [], showBack = {} }) {
  
  return (
    <View className='g-fixed-btn'>
      {items.map((item, index) => {
        const onClick = () => {
          item.onTap && item.onTap()
        }
        
        return (
          <React.Fragment key={index}>
            {item.showImg
              ? <Image
                className='fixed-img'
                mode='widthFix'
                src={item.image}
                onClick={onClick}
              />
              : <Button
                className='fixed-btn'
                openType={item.openType || ''}
                style={{ color: item.color, background: item.background }}
                onClick={onClick}
              >
                {item.text}
              </Button>
            }
          </React.Fragment>
        )
      })}
      
      {showBack.show &&
      <View
        className='fixed-btn iconfont icon-hddb'
        style='background: #666;'
        onClick={() => {
          showBack.onTap && showBack.onTap()
        }}
      />
      }
    </View>
  )
}

export default FloatBtn
