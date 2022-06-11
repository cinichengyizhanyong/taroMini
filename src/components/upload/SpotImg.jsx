import { Canvas, View } from '@tarojs/components'
import { hideLoading, showLoading } from '@util/message'
import { uploadFile } from '@inc/api'
import { chooseImg } from './util'

function SpotImg(
  {
    className = '', isSpot = true, params,
    count = 1, isUpload = true, children,
    onChoose = () => {
    }
  }
) {
  const onSpot = () => {
    chooseImg(res => {
      if (!isUpload) {
        onChoose(res)
        return
      }
      showLoading(`${isSpot ? '识别' : '上传'}中！`)
      uploadFile(res[0], isSpot ? '/card/manage/save/ocr' : '', params).then(rs => {
        onChoose(rs.data)
        hideLoading()
      }).catch((err) => {
        console.log('spotErr', err)
        hideLoading()
      })
    }, count)
  }

  return (
    <>
      <Canvas
        className='photo_canvas'
        type='2d'
        style='position: fixed; left: -9999px; opacity: 0; width: 750px; height: 2730px;'
      />

      <View
        className={className}
        onClick={onSpot}
      >
        {children}
      </View>
    </>
  )
}

export default SpotImg
