import { View } from '@tarojs/components'
import './index.scss'

function Skeleton(
  {
    type = '', rows = 1,
    hasBtn = true, leftImg = true,
    rightList, isHide, children
  }
) {
  const getArr = (num, _type) => {
    let arr = []
    if (_type !== type) {
      return []
    }
    for (let i = 0; i < num; i++) {
      arr.push(1)
    }
    return arr
  }
  const items = getArr(rows, type === 'row' || type === 'list' ? type : '')
  const column = getArr(5 * rows, 'column')
  const des1 = getArr(4, 'detail')
  const des2 = getArr(8, 'detail')
  
  return (
    <>
      {children}
      
      {!isHide &&
      <View className='skeleton-bd'>
        {type === 'row' && items.map((item, index) => {
          return (
            <View
              className='skeleton-row g-list-r'
              key={index}
            >
              <View className='img' />
              <View className='flex'>
                <View className='tit' />
                <View className='desc1' />
                <View className='desc2' />
              </View>
              {hasBtn && <View className='btn' />}
            </View>
          )
        })}
        
        {type === 'column' &&
        <View className='skeleton-column flex-r'>
          {column.map((item, index) => {
            return (
              <View className='box' key={index}>
                <View className='img' />
                <View className='tit' />
              </View>
            )
          })}
        </View>
        }
        
        {type === 'list' && items.map((item, index) => {
          return (
            <View
              className='skeleton-list g-list-r'
              key={index}
            >
              {leftImg && <View className='img' />}
              <View className='flex'>
                <View className='clear'>
                  {rightList &&
                  <View className='desc float-r r1' />
                  }
                  <View className={`tit ${rightList ? 'tit-w' : ''}`} />
                </View>
                <View className='clear mt-10'>
                  {rightList &&
                  <View className='desc float-r' />
                  }
                  <View className={`desc ${rightList ? 'l1' : 'l2'}`} />
                </View>
                <View className='clear mt-10'>
                  {rightList &&
                  <View className='desc float-r' />
                  }
                  <View className={`desc ${rightList ? '' : 'l3'}`} />
                </View>
              </View>
              {!leftImg && <View className='img-r' />}
            </View>
          )
        })}
        
        {type === 'slider' && <View className='skeleton-slider' />}
        
        {type === 'detail' &&
        <View className='skeleton-detail bg-f'>
          <View className='tit' />
          <View className='desc' />
          {des1.map((item, index) => {
            return (
              <View className='desc2' key={index} />
            )
          })}
          <View className='img' />
          <View className='desc desc1' />
          {des2.map((item, index) => {
            return (
              <View className='desc2' key={index} />
            )
          })}
        </View>
        }
      </View>
      }
    </>
  )
}

export default Skeleton
