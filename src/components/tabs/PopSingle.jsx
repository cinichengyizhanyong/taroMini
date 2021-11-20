import { View } from '@tarojs/components'
import './PopFilter.scss'

function PopSingle(
  {
    placeholder = '综合排序', isSelected,
    onClick = () => {
    }
  }
) {
  const isSel = typeof isSelected !== 'undefined'
  
  return (
    <View
      className={`pop-single pop-bd ${isSel ? 'c-red' : ''}`}
      onClick={onClick}
    >
      {placeholder}
    </View>
  )
}

export default PopSingle
