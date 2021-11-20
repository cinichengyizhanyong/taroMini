import { AtIcon } from 'taro-ui'
import { View } from '@tarojs/components'

let isFirst = true

function FilterOne(
  {
    placeholder = '分类',
    items = [], idKey = 'value',
    selectItem = {}, initId, ids, onChange
  }
) {

  return (
    <>
      <View
        className='p-10 f-16 text-center bg-f5'
      >
        {placeholder}
      </View>

      {items.map((item, index) => {
        const hasId = ids ? ids.includes(item.id) : true
        if (!hasId) {
          return null
        }
        if (initId && isFirst && (item[idKey] + '' === initId + '')) {
          isFirst = false
          onChange(item, index)
        }

        return (
          <View
            key={index}
            className='p-10 flex-r bd-f5'
            onClick={() => onChange(item, index)}
          >
            <View className='flex f-15'>{item.name}</View>
            {selectItem[idKey] === item[idKey] &&
            <AtIcon value='check' size='14' color='#999' />
            }
          </View>
        )
      })}
    </>
  )
}

export default FilterOne
