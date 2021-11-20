import { View } from '@tarojs/components'

function Test({ text, children }) {
  return (
    <View className='flex-r bg-f mt-10 mb-15'>
      {text}
      <View className='flex-hide'>
        {children}
      </View>
    </View>
  )
}

export default Test
