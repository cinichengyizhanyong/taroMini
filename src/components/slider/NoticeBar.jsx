import { View } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
import './NoticeBar.scss'

function NoticeBar(
  {
    defaultClass = 'bg-f', className = '', iconClass = 'c-red',
    notice, speed = 50, hasMore, onClick
  }
) {
  return (
    <View
      className={`notice-bar pos-r ${defaultClass} ${className} ${hasMore ? 'notice-bar-more' : ''}`}
      onClick={onClick}
    >
      <View
        className={`at-icon at-icon-volume-plus f-18 ${iconClass}`}
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
