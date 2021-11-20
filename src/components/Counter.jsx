import { View } from '@tarojs/components'
import { useEffect, useState } from 'react'

function Counter(
  {
    max = 60, start,
    onClick = () => {
    },
    onFinish = () => {
    }
  }
) {
  const [time, setTime] = useState(max)

  useEffect(() => {
    if (!start) {
      return
    }

    let interval = setInterval(() => {
      setTime(t => {
        if (t === 0) {
          clearInterval(interval)
          onFinish()
          return max
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [start])

  return (
    <View
      className='phone-code plr-13'
      style={`color: #${start ? 'ccc' : '333'}`}
      onClick={onClick}
    >
      {start ? time + '秒后重发' : '发送验证码'}
    </View>
  )
}

export default Counter
