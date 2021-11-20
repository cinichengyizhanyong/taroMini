import { Text, View } from '@tarojs/components'
import './TitImg.scss'

//v：竖线，o：斜线
function TitImg(
  {
    tit = '', type = 'v', className = ''
  }
) {
  return (
    <View className={`tit-img-${type} ${className}`}>
      <Text className='t' />
      {tit}
      <Text className='t t-r' />
    </View>
  )
}

export default TitImg
