import { useEffect, useState } from 'react'
import Taro, { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { setShareUid } from '@config/global'
import { getUserSync } from '@inc/store/user'
import router from '@inc/router'

export function useShare(genShareInfoCallback, path, args = {}) {
  Taro.showShareMenu({
    menus: ['shareAppMessage', 'shareTimeline']
  }).catch(err => console.log('showShareMenuErr', err))

  const getShare = e => {
    const data = e?.target?.dataset?.share
    appendShareUid(args)

    const shareInfo = genShareInfoCallback(data)
    if (!shareInfo.path) {
      shareInfo.path = router.genUrl(path, args)
    } else if (!shareInfo.path.includes('shareUid=')) {
      shareInfo.path +=
        (shareInfo.path.includes('?') ? '&' : '?') + `shareUid=${args.shareUid}`
    }

    console.log('DEBUG:share', shareInfo)

    return shareInfo
  }

  useShareAppMessage(getShare)

  useShareTimeline(getShare)
}

export const appendShareUid = (args) => {
  const userInfo = getUserSync()
  args.shareUid = userInfo ? userInfo.info.uid : 0
}

const hookApiReq = (id) => {
  return {
    args: { id },
    deps: [id],
    checker: () => id > 0
  }
}

const parseRequestKey = (params, key, autoGenShareUid = true) => {
  if (params[key]) {
    if (params.shareUid && autoGenShareUid) {
      setShareUid(params.shareUid)
    }
    return params[key]
  }
  if (params.scene) {
    console.log('DEBUG:scene', params.scene)
    let parts = params.scene.split('_')
    if (parts[1] && autoGenShareUid) {
      console.log('DEBUG:scene:uid', parts[1])
      setShareUid(parts[1])
    }
    return parts[0]
  }
  return 0
}

/**
 * 解析path参数, 或是解决扫码进入的参数
 * @param idKey
 * @returns {{isParse: boolean, setId: Taro.Dispatch<Taro.SetStateAction<string | number>>, id: string | number, apiParams: (function(): {args: {id: *}, deps: [*], checker: (function(): boolean)})}}
 */
export const useReqId = function (idKey = 'id') {
  const { params, path } = useRouter()
  const [id, setId] = useState(parseRequestKey(params, idKey))
  const [isParse, setIsParse] = useState(!!id)

  useEffect(() => {
    if (path.length === 0) {
      return
    }

    if (!isParse) {
      setIsParse(true)
    }

    const value = parseRequestKey(params, idKey)
    if (value && id !== value) {
      console.log('DEBUG:ID:lazy', value)
      setId(value)
    }
  }, [params, path])

  return { id, isParse, setId, apiParams: () => hookApiReq(id), params }
}

export const useArgsObj = (keys = {}, initArgs = {}) => {
  const [args, setArgs] = useState(initArgs)
  const [items, setItems] = useState([])
  const [isParse, setIsParse] = useState(false)

  useEffect(() => {
    let count = 0
    for (let key in keys) {
      if (keys[key]) {
        count += 1
        args[key] = keys[key]
      }
    }
    if (count) {
      setArgs({ ...args })
    }
    !isParse && setIsParse(true)
  }, [...Object.values(keys)])

  return { args, setArgs, items, setItems, isParse }
}
