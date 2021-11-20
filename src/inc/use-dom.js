import { useEffect, useRef, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { getScrollTop } from '@util/tool'
import { useReqId } from '@inc/share'

const setTitle = (title) => {
  Taro.setNavigationBarTitle({
    'title': title
  })
}

export function useDocumentTitle(value) {
  useEffect(() => {
    value && setTitle(value)
  }, [value])
  
  return { setTitle }
}

export const useElementFixedOnScroll = (select, initTop = 340, isReq = true) => {
  const top = useRef(initTop)
  const elInfo = useRef()
  const canSet = useRef(true)
  const [fixed, setFixed] = useState(false) // 是否设置为固定模式
  
  useEffect(() => {
    if (!select || !isReq) {
      return
    }
    // 获取当前实际 top
    getScrollTop(select, (realTop, e) => {
      top.current = realTop
      elInfo.current = e
    })
  }, [isReq])
  
  const handleScroll = (e, fn) => {
    if (!isReq) {
      return
    }
    const isFixed = e.detail.scrollTop > top.current
    if (canSet.current && fixed !== isFixed) {
      canSet.current = false
      setFixed(isFixed)
      setTimeout(() => canSet.current = true, 600)
    }
    fn && fn(e)
  }
  
  return {
    handleScroll, fixed, elInfo
  }
}

export const systemSetting = (type, fn) => {
  Taro.getSetting().then(res => {
    const end = res.authSetting[`scope.${type}`]
    if (typeof end !== 'undefined') {
      fn && fn(end)
    }
  })
}

export const useOpenType = (type) => {
  const [isOpen, setIsOpen] = useState(true)
  
  useDidShow(() => {
    systemSetting(type, setIsOpen)
  })
  
  const onCloseOpen = () => setIsOpen(false)
  
  return { isOpen, onCloseOpen }
}

// 页面初始化时只请求当前TabsPane所在版块的接口
export const useTabs = () => {
  const { id: type, isParse } = useReqId('type')
  const [act, setAct] = useState(-1)
  const [, setCount] = useState(0)
  const hasVisit = useRef([])
  
  useEffect(() => {
    isParse && onSet(parseInt(type) || 0)
  }, [isParse, type])
  
  const onSet = num => {
    if (!hasVisit.current[num]) {
      hasVisit.current[num] = true
    }
    setAct(num)
  }
  
  const onClear = () => {
    hasVisit.current = []
    setCount(c => c + 1)
    
    setTimeout(() => {
      hasVisit.current[act] = true
      setCount(c => c + 1)
    }, 0)
  }
  
  return { act, hasVisit: hasVisit.current, onSet, onClear }
}

// 回到顶部
export const useBackTop = (select, initTop, isReq) => {
  const top = useRef(0)
  const [topCount, setTopCount] = useState(0)
  const { fixed, handleScroll } = useElementFixedOnScroll(select, initTop, isReq)
  
  const onBackScroll = e => {
    top.current = e.detail.scrollTop
    handleScroll(e)
  }
  
  const onBackTop = () => {
    top.current = 0
    setTopCount(topCount + 1)
  }
  
  return { fixed, top, onBackTop, onBackScroll }
}

// 切换到前台，数据刷新
export const useShowReq = () => {
  const [isReq, setIsReq] = useState(0)
  
  useDidShow(() => setIsReq(isReq + 1))
  
  return { isReq }
}

// 下拉刷新
export const useRefresher = () => {
  const _triggered = useRef(false)
  const [triggered, setTriggered] = useState(false)
  const [isReq, setIsReq] = useState(0)
  
  const onRefresherPulling = (fn) => {
    if (_triggered.current) {
      return
    }
    _triggered.current = true
    setTriggered(true)
    
    setTimeout(() => {
      fn && fn()
      setTriggered(false)
      _triggered.current = false
    }, 2000)
  }
  
  const onSetReq = () => setIsReq(isReq + 1)
  
  return { triggered, onRefresherPulling, isReq, onSetReq }
}
