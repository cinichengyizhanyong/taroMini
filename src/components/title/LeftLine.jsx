import { Text, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './LeftLine.scss'

function LeftLine(
  {
    className = '', iconPrefix = 'iconfont', icon,
    txtSty = 'f-17', text = '',
    moreText = '更多', hasLine = true,
    hasMore, children,
    onClick = () => {
    },
    renderRight
  }
) {
  return (
    <View
      className={`p-13 bd-f5 ${className}`}
      onClick={onClick}
    >
      <View className='left-line-warp flex-r'>
        {icon &&
        <View className={`mr-10 ${iconPrefix} ${icon} c-main`} />
        }
        
        <View className={`flex pos-r ${hasLine ? 'left-line' : ''}`}>
          <Text className={txtSty}>{text}</Text>
          {children}
        </View>
        
        {renderRight}
        
        {hasMore &&
        <View
          className='line-more flex-r f-11 c-f'
        >
          <AtIcon className={moreText ? 'mr-5' : ''} value='chevron-right' size='12' />
          {moreText}
        </View>
        }
      </View>
    </View>
  )
}

export default LeftLine
