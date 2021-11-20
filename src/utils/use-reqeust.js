import { useEffect, useRef, useState } from 'react'
import { hideLoading, showErrs, showLoading } from '@util/message'

/**
 * use api
 * @param service
 * @param args
 * @param otherArgs
 * @param normalizer
 * @param initValue
 * @param deps
 * @param checker
 * @param isLoading
 * @param onError
 * @param onSuccess
 * @param onlyData
 * @param retry
 * @returns {*}
 */
export const useApi = (
  {
    service, args, otherArgs, normalizer, initValue = {}, deps = [],
    checker, isLoading, onSuccess, onError, onlyData = true, retry
  }
) => {
  const count = useRef(0)
  const [data, setData] = useState(initValue)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const onReq = () => {
    count.current += 1
    isLoading && showLoading('加载中')
    service(args, otherArgs).then((rs) => {
      isLoading && hideLoading()
      const res = (normalizer ? normalizer(rs) : rs) || initValue
      onSuccess && onSuccess(res, rs)
      setData(res)
      setIsLoaded(true)
    }).catch(err => {
      isLoading && hideLoading()
      setIsLoaded(true)
      onError && onError(err.message)
      retry && count.current < retry && onReq()
    })
  }
  
  useEffect(() => {
    if (checker && !checker()) {
      return
    }
    onReq()
  }, deps)
  return onlyData ? data : [data, setData, isLoaded]
}

// 提交数据+动画
export const onSubData = ({ service, args, onSuccess, onError }) => {
  showLoading('数据提交中！')
  service(args).then(res => {
    hideLoading()
    onSuccess && onSuccess(res)
  }).catch(err => {
    hideLoading()
    showErrs(err)
    onError && onError(err)
  })
}
