import { View } from '@tarojs/components'
import './PopFilter.scss'

function PopFilter(
  {
    placeholder = '分类', nameKey = 'name',
    nameKeyTwo, itemIsSwap, hasBorder = true,
    show,
    onShow = () => {
    },
    selectItem = null,
    onClear = () => {
    },
    children
  }
) {
  let one
  let two
  if (selectItem) {
    one = selectItem[nameKey]
    two = nameKeyTwo ? selectItem[nameKeyTwo] || '' : ''
  }
  
  
  const handleClear = e => {
    e.stopPropagation()
    if (selectItem) {
      onClear()
    } else {
      onShow(true)
    }
  }
  
  return (
    <>
      <View
        className={`pop-filter ${hasBorder ? 'pop-bd' : ''} ${selectItem ? 'c-red bold' : ''}`}
        onClick={() => onShow(true)}
      >
        <View className='pop-text'>
          {selectItem
            ? (itemIsSwap ? `${two} ${one}` : `${one} ${two}`)
            : placeholder
          }
          <View
            className={`icon ${selectItem ? 'has' : ''}`}
            onClick={handleClear}
          >
            {selectItem ? 'x' : ''}
          </View>
        </View>
      </View>
      
      <View
        className={`bg-mask ${show ? '' : 'hide'}`}
        onClick={() => onShow(false)}
      >
        <View
          className='tabs-con bg-f'
          onClick={e => e.stopPropagation()}
        >
          {children}
        </View>
      </View>
    </>
  )
}

export default PopFilter
