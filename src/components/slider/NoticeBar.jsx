import { View } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import './NoticeBar.scss'

function NoticeBar(
  {
    style = {
      color: '#fff',
      background: '#F9AF57'
    },
    iconColor, notice, speed = 50, hasMore, onClick
  }
) {
  return (
    <View
      className={`notice-bar pos-r ${hasMore ? 'notice-bar-more' : ''}`}
      style={style}
      onClick={onClick}
    >
      <View
        className='iconfont icon-gonggao'
        style={iconColor ? `color: ${iconColor}` : ''}
      />
      
      <AtNoticebar
        className='sty-reset'
        speed={speed}
        single
        marquee
      >
        {notice}
      </AtNoticebar>
      
      {hasMore &&
      <View className='at-icon at-icon-chevron-right' />
      }
    </View>
  )
}

export default NoticeBar
