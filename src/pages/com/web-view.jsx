import { useRef } from 'react'
import { WebView } from '@tarojs/components'
import { useReqId, useShare } from '@inc/share'
import { useUserStore } from '@inc/store/user'
import router, { rCom } from '@inc/router'

function ComWebView() {
  const share = useRef({})
  const { params: { path, time, wechat } } = useReqId()
  const { siteInfo } = useUserStore()
  let _path = decodeURIComponent(path)
  
  if (time) {
    _path += (_path.indexOf('?') > -1 ? '&' : '?') + 'time=' + time
  }
  
  if (wechat) {
    _path += '#wechat_redirect'
  }
  
  const message = (e) => {
    let data = e.detail.data[e.detail.data.length - 1]
    if (data.type === 'share') {
      share.current = data
    }
  }
  
  useShare(
    () => ({
      title: share.current.title || (siteInfo && siteInfo.name),
      path: share.current.path || router.genUrl(rCom.webView, { path: _path }),
      imageUrl: share.current.image
    })
  )
  
  return (
    <WebView src={_path} onMessage={message} />
  )
}

export default ComWebView
