import { Swiper, SwiperItem } from '@tarojs/components'
import { pxTransform } from '@util/style'

function SwipeWrap(
  {
    className = '', autoPlay = true, circular = true,
    indicatorDots = true, indicatorColor = 'rgba(255,255,255)', indicatorActiveColor = '#ddd',
    interval = 3000, duration = 1000, vertical,
    height = 380, items = [], imgKey = 'image', onClick, renderItem
  }
) {
  let imgArr = []
  const _h = pxTransform(height)
  
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
      style={`height:${_h}`}
    >
      {items.map((item, index) => {
        const image = item[imgKey] || item
        imgArr.push(image)
        
        return (
          <SwiperItem
            key={index}
            onClick={() => onClick && onClick(item, index, imgArr)}
          >
            {renderItem(item, { index, image, heightStr: _h })}
          </SwiperItem>
        )
      })}
    </Swiper>
  )
}

export default SwipeWrap
