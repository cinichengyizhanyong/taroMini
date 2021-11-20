import { AtActivityIndicator } from 'taro-ui'
import { ScrollView, View } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import NoData from '@com/no-data'
import { useRefresher } from '@inc/use-dom'
import { hideLoading, showLoading } from '@util/message'

function JScrollView(
  {
    className = '',
    service = () => {
    },
    args, normalizer,
    onData = () => {
    },
    children,
    isReq = true, hasNoData = true, noDataSty, hasEndText,
    top,
    onScroll = () => {
    },
    isRefresh = true
  }
) {
  const [noData, setNoData] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { triggered, onRefresherPulling } = useRefresher()
  const finished = useRef(false)
  const page = useRef(1)
  const items = useRef([])

  const fetchData = () => {
    if (finished.current || !isReq) {
      return
    }

    setLoading(true)
    showLoading('加载中')
    service({
      ...args,
      page: page.current++
    }).then(res => {
      const data = normalizer ? normalizer(res, page.current) : res
      finished.current = data.length === 0
      items.current = page.current === 2 ? data : [...items.current, ...data]
      onData(items.current, res)

      setNoData(items.current.length === 0)
      onFinish()
    }).catch(() => {
      finished.current = true
      setNoData(true)
      onFinish()
    })
  }

  const onReset = () => {
    page.current = 1
    finished.current = false
    items.current = []
    setNoData(false)
    fetchData()
  }

  const onFinish = () => {
    hideLoading()
    setLoading(false)
  }

  // 特别注意, args需要使用hook setState()生成
  useEffect(() => {
    if (!isReq) {
      return
    }
    onReset()
  }, [args, isReq])

  return (
    <ScrollView
      className={`screen ${className}`}
      scrollY
      scrollTop={top}
      onScrollToLower={fetchData}
      onScroll={onScroll}
      refresherEnabled={isRefresh}
      refresherTriggered={triggered}
      onRefresherPulling={() => onRefresherPulling(onReset)}
    >
      {children}

      <View>
        {noData && hasNoData && <NoData className={noDataSty} />}
      </View>

      <View className='text-center'>
        {isLoading &&
        <AtActivityIndicator content='加载中...' />
        }
      </View>

      {hasEndText && !noData && finished.current &&
      <View className='text-center f-12 c-9 p-13'>数据已加载完, 我是有底线的</View>
      }
    </ScrollView>
  )
}

export default JScrollView
