import { Image } from '@tarojs/components'
import SwipeWrap from '@com/slider/SwipeWrap'
import { showImg } from '@com/upload/util'
import { pxTransform } from '@util/style'

/**
 * @param style
 * @param autoPlay
 * @param height
 * @param items<[string] | [{ imgKey }]>
 * @param imgKey
 * @param imgMode
 * @param onClick
 * @returns {JSX.Element|null}
 * @constructor
 */
function JSlider(
  {
    style = {}, autoPlay = true, height = 380,
    items = [], imgKey = 'image', imgMode = 'aspectFill', onClick
  }
) {
  const _h = pxTransform(height)
  const onTap = (item, index, arr) => {
    if (onClick) {
      onClick(item, index, arr)
    } else {
      showImg(index, arr)
    }
  }

  const slider = (item, { image }) => {
    return (
      <Image
        className='w-100'
        mode={imgMode}
        src={image}
        style={{ height: _h }}
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
      style={style}
      onClick={onTap}
      renderItem={slider}
    />
  )
}

export default JSlider
