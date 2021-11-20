import { Text, View } from '@tarojs/components'
import './index.scss'

function Breadcrumb({ className = '', items = [], spacing = '>' }) {
  return (
    <View className={`breadcrumb ${className}`}>
      {items.map((item, index) => {
        return (
          <View
            key={index}
            onClick={() => {
              item.onTap && item.onTap()
            }}
          >
            {item.icon &&
            <Text className={`iconfont ${item.icon}`} />
            }
            <Text>{item.text}</Text>
            {index < items.length - 1 &&
            <Text className='spacing'>{spacing}</Text>
            }
          </View>
        )
      })}
    </View>
  )
}

export default Breadcrumb
