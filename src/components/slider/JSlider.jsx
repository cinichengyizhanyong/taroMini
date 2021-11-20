import { Image } from '@tarojs/components'
import SwipeWrap from '@com/slider/SwipeWrap'
import { showImg } from '@com/upload/util'

function JSlider(
  {
    style = {}, autoPlay = true, height = 380,
    items = [], imgKey = 'image', imgMode = 'aspectFill', onClick
  }
) {
  const onTap = (item, index, arr) => {
    if (onClick) {
      onClick(item, index, arr)
    } else {
      showImg(index, arr)
    }
  }
  
  const slider = (item, { image, heightStr }) => {
    return (
      <Image
        className='w100'
        mode={imgMode}
        src={image}
        style={{ height: heightStr, ...style }}
      />
    )
  }
  
  if (!items.length) return null
  
  return (
    <SwipeWrap
      autoPlay={autoPlay}
      height={height}
      items={items}
      imgKey={imgKey}
      onClick={onTap}
      renderItem={slider}
    />
  )
}

export default JSlider
