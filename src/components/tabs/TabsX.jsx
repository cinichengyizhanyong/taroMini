import { useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import './TabsX.scss'

function TabsX(
  {
    renderLabel, isBtn, column = 4, style = {}, activeColor,
    items = [], idKey = 'id', nameKey = 'name',
    isInit, initId, initIndex = 0, ids, isMulRow, onChange
  }
) {
  const isFirst = useRef(true)
  const [current, setCurrent] = useState(initIndex)

  useEffect(() => {
    if (items.length && isInit) {
      onChange(items[0], 0)
    }
  }, [items])

  // tab初始值
  useEffect(() => {
    setCurrent(initIndex)
  }, [initIndex])

  return (
    <View
      className={`tabs-x${isBtn ? '-btn' : ''}${isMulRow ? '-mul flex-r' : ''} bd-f5 bg-f`}
      style={style}
    >
      {renderLabel}

      {items.map((item, index) => {
        const hasId = ids ? ids.includes(item[idKey]) : true
        if (!hasId) {
          return null
        }
        const isInitId = initId && isFirst.current
        const act = isInitId ? item[idKey] + '' === initId + '' : current === index
        const name = nameKey ? item[nameKey] : item
        const itemSty = isBtn || name === '全部' ? {} : { [isMulRow ? 'width' : 'minWidth']: `${100 / column}%` }

        return (
          <View
            key={index}
            className={`pos-r dis-i plr-13 text-center ${act ? 'tabs-active' : ''} ${isMulRow ? 'text-line1' : ''}`}
            style={act ? { ...itemSty, color: activeColor } : itemSty}
            onClick={() => {
              isFirst.current = false

              if (item.onTap) {
                item.onTap()
                return
              }
              setCurrent(index)
              onChange(item, index)
            }}
          >
            {name}
            <View
              className='tab-line'
              style={act ? { background: activeColor } : {}}
            />
          </View>
        )
      })}
    </View>
  )
}

export default TabsX
