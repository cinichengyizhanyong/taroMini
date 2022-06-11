import { Swiper, SwiperItem } from '@tarojs/components'
import { pxTransform } from '@util/style'

/**
 * @param className
 * @param height
 * @param style
 * @param autoPlay
 * @param circular
 * @param indicatorDots
 * @param indicatorColor
 * @param indicatorActiveColor
 * @param interval
 * @param duration
 * @param vertical
 * @param items<[string] | [{ imgKey }]>
 * @param imgKey
 * @param onClick
 * @param renderItem
 * @returns {JSX.Element|null}
 * @constructor
 */
function SwipeWrap(
  {
    className = '', height = 380, style = {},
    autoPlay = true, circular = true,
    indicatorDots = true, indicatorColor = 'rgba(255,255,255)', indicatorActiveColor = '#ddd',
    interval = 3000, duration = 1000, vertical,
    items = [], imgKey = 'image', onClick, renderItem
  }
) {
  let imgArr = []

  if (!items.length) return null

  return (
    <Swiper
      className={className}
      autoplay={autoPlay}
      circular={circular}
      indicatorDots={indicatorDots}
      indicatorColor={indicatorColor}
      indicatorActiveColor={indicatorActiveColor}
      interval={interval}
      duration={duration}
      vertical={vertical}
      style={{ height: pxTransform(height), ...style }}
    >
      {items.map((item, index) => {
        const image = item[imgKey] || item
        imgArr.push(image)

        return (
          <SwiperItem
            key={index}
            onClick={() => onClick && onClick(item, index, imgArr)}
          >
            {renderItem(item, { index, image })}
          </SwiperItem>
        )
      })}
    </Swiper>
  )
}

export default SwipeWrap
