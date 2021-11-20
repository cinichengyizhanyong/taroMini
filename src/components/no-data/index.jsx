import { Image, View } from '@tarojs/components'
import img from '@img/bg_data_default.png'
import './index.scss'

function NoData({ className = '-pos' }) {
  return (
    <View
      className={`no-data${className} text-center c-9`}
    >
      <Image className='no-data-img' src={img} />
      <View>暂无数据</View>
    </View>
  )
}

export default NoData
