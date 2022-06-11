import Taro from '@tarojs/taro'
import { uploadFile } from '@inc/api'
import { dealErrs, hideLoading, showLoading, showMsg } from '@util/message'

const maxWidth = 750

// 预览图片
export const showImg = (index, list, isUrl) => {
  Taro.previewImage({
    current: isUrl ? index : list[index],
    urls: list
  })
}

/**
 * 选择图片
 * @param fn
 * @param count
 */
export function chooseImg(fn, count = 1) {
  Taro.chooseImage({
    count,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera']
  }).then(res => {
    const arr = res.tempFiles.map(item => ({ file: item }))
    scaleImgArr(arr, 0, (imgArr) => {
      fn && fn(imgArr)
    })
  }).catch(err => {
    console.log('chooseImgErr', err)
  })
}

// 保存图片
export const saveImg = (path, fn, onErr) => {
  Taro.getImageInfo({ src: path }).then(res1 => {
    Taro.saveImageToPhotosAlbum({ filePath: res1.path }).then(() => {
      showMsg('图片已保存！')
      fn && fn()
    }).catch(res2 => {
      const err = res2.errMsg
      if (err.indexOf('auth den') > -1) {
        onErr && onErr()
      }
      showMsg(err.indexOf('cancel') > -1 ? '取消保存！' : '保存失败！')
    })
  }).catch(res => console.log(res))
}

// 上传数据
export const saveData = ({ service, args, onSuc, onFail, showLoad }) => {
  onFail && onFail({ disabled: true })
  showLoad && showLoading('上传中...！')
  service(args).then(res => {
    const isFun = typeof onSuc === 'function'
    hideLoading()
    onFail && onFail({ disabled: false })
    showMsg('操作成功！', isFun ? () => onSuc(res) : onSuc)
  }).catch(err => {
    hideLoading()
    if (err.errMsg && err.errMsg.includes('request:fail')) {
      if (onFail) {
        onFail({ disabled: false }, '网络错误，请稍后重试！', true)
      } else {
        showMsg('网络错误，请稍后重试！')
      }
      return
    }
    const { tip, isMark } = dealErrs(err)
    const errMsg = tip && !isMark ? tip : err.message
    if (onFail) {
      onFail({ ...err.errors, disabled: false }, errMsg, true)
    } else {
      showMsg(errMsg)
    }
  })
}

/**
 * 裁剪图片
 * @see https://github.com/NervJS/taro/issues/4127
 * @param tpmFile
 * @param callback
 */
export const scaleImg = (tpmFile, callback) => {
  const query = Taro.createSelectorQuery()
  query.select('.photo_canvas')
  .fields({ node: true, size: true })
  .exec((res) => {
    const { node, width, height } = res[0]

    // 解决PC打开小程序无法获得node的问题，直接返回元数据，不进行裁剪
    if (!node) {
      callback(tpmFile)
      return
    }
    const ctx = node.getContext('2d')
    const img = node.createImage()

    node.width = width
    node.height = height

    img.onload = () => {
      if (img.width <= maxWidth) {
        callback(tpmFile)
        return
      }

      const canvasHeight = img.height / img.width * maxWidth

      ctx.drawImage(img, 0, 0, maxWidth, canvasHeight)
      Taro.canvasToTempFilePath({
        canvas: node,
        width: maxWidth,
        height: canvasHeight,
        success: rr => {
          callback(rr.tempFilePath)
        }
      })
    }

    img.src = tpmFile
  })
}

/**
 * 循环裁剪图片
 * @see https://github.com/NervJS/taro/issues/4127
 * @param res
 * [
 *  {file: {path: string}},
 *  {file: {path: string}}
 * ]
 * @param index
 * @param callback
 * @param imgArr
 * [path: string, path: string]
 */
export const scaleImgArr = (res, index, callback, imgArr = []) => {
  if (index < res.length) {
    const img = res[index]
    if (img.file) {
      scaleImg(img.file.path, rs => {
        if (rs) {
          img.url = rs
          img.file.path = rs
        }
        imgArr.push(rs || img.url)
        scaleImgArr(res, index + 1, callback, imgArr)
      })
      return
    }
    imgArr.push(img.url)
    scaleImgArr(res, index + 1, callback, imgArr)
    return
  }
  callback(imgArr)
}

/**
 * 上传图片
 * @param images
 * [
 *  {file: {path: string}},
 *  {file: {path: string}}
 * ]
 * @param onCanTap
 * @returns {Promise<{images: [], isFail: boolean}|{imgArr: [], imgObj: *, isFail: boolean}>}
 */
export const uploadImages = async (images, onCanTap) => {
  const imgUrls = []
  let isFail = false

  if (!images) {
    return { images: [], isFail }
  }

  onCanTap && onCanTap('disabled', true)
  showLoading('图片上传中...！')
  for (let i = 0; i < images.length; i++) { // 上传图片
    const file = images[i]
    if (file.file) {
      const data = (await uploadFile(file.file.path)).data
      if (data) {
        file.url = data
        file.file = false
      } else {
        images.splice(i, 1)
        i--
        isFail = true
        showMsg('图片上传失败！')
      }
    }
    file.url && imgUrls.push(file.url)
  }
  hideLoading()

  return {
    imgArr: imgUrls,
    imgObj: images,
    isFail
  }
}

/**
 * 循环上传图片
 * @param value object
 * @param imgKeys array or objectArray
 * [
 * key: string,
 * key: string
 * ]
 * or
 * [
 * {
 *   key: string,
 *   single: true or undefined
 * }
 * ]
 * @param onFail function
 */
export const uploadImagesObj = async (value, imgKeys, onFail) => {
  let imgRes = {}
  let errKey = []

  // eslint-disable-next-line no-unused-vars
  for (let item of imgKeys) {
    const key = item.key || item

    const { imgArr, isFail } = await uploadImages(item.single ? [value[key]] : value[key], onFail)

    imgRes[key] = item.single ? imgArr[0] || '' : imgArr
    if (isFail) {
      onFail && onFail(key, imgArr)
      errKey.push(key)
    }
  }

  return { imgRes, errKey }
}
