import { useEffect, useRef, useState } from 'react'
import { Canvas, View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'
import { scaleImgArr, showImg } from './util'

function UpLoadImage(
  {
    className = 'at-input', files = [],
    showAddBtn = true, count = 10, length = 4,
    label, required, error, tip,
    onChange = () => {
    },
    children
  }
) {
  const isSingle = count === 1
  const imgs = useRef([])
  const viewEl = useRef()
  const [items, setItems] = useState([])
  
  useEffect(() => {
    if (!files) {
      onChange(isSingle ? '' : [])
      return
    }
    const url = []
    const arr = []
    files.forEach(item => {
      if (item) {
        url.push(item.url || item)
        arr.push(item.url ? item : { url: item })
      }
    })
    imgs.current = url
    setItems(arr)
    onChange(isSingle ? arr[0] || '' : arr)
  }, [files])
  
  return (
    <View
      className={`flex-r pr-6 ${className}`}
    >
      <Canvas
        className='photo_canvas'
        type='2d'
        ref={viewEl}
        style='position: fixed; left: -9999px; opacity: 0; width: 750px; height: 2730px;'
      />
      
      {label &&
      <View
        className={`at-input__title mr-0 ${required ? 'at-input__title--required' : ''} ${error ? 'c-red' : ''}`}
      >
        {label}
      </View>
      }
      
      {children}
      
      <View className='flex'>
        <AtImagePicker
          files={items}
          showAddBtn={showAddBtn}
          count={count}
          length={length}
          onChange={imgFiles => {
            if (!imgFiles.length) {
              setItems([])
              onChange(isSingle ? '' : [])
              return
            }
            
            const arr = isSingle ? [imgFiles[imgFiles.length - 1]] : imgFiles.slice(0, count)
            setItems(arr)
            scaleImgArr(viewEl, arr, 0, (imgArr) => {
              imgs.current = imgArr
              onChange(isSingle ? arr[0] : arr)
            })
          }}
          onImageClick={index => showImg(index, imgs.current)}
          onFail={() => {
          }}
        />
        
        {tip &&
        <View className='plr-10 f-12 c-red'>{tip}</View>
        }
      </View>
      
      {error &&
      <View className='at-icon at-icon-alert-circle f-16 c-red' />
      }
    </View>
  )
}

export default UpLoadImage
