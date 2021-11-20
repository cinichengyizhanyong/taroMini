import { useState } from 'react'
import { View } from '@tarojs/components'
import './FilterArea.scss'

function FilterArea(
  {
    items = [],
    onChange = () => {
    }
  }
) {
  const [areaAct, setAreaAct] = useState(null)
  const [cityAct, setCityAct] = useState({})
  
  const reset = () => {
    setAreaAct(null)
    setCityAct({})
    onChange(null)
  }
  
  return (
    <View className='filter-area-box'>
      <View className='filter-top f-16 text-center bg-gray'>地区</View>
      
      <View className='a-title'>省份</View>
      <View className='area-btn-box'>
        {items.map((item, i) => {
          return (
            <View
              key={i}
              className={`area-btn ${areaAct === i ? 'active' : ''}`}
              onClick={() => {
                setAreaAct(i)
                setCityAct(item)
              }}
            >
              {item.name}
            </View>
          )
        })}
      </View>
      
      {items[areaAct] && items[areaAct].child.length > 0 &&
      <View>
        <View className='a-title'>城市</View>
        <View className='area-btn-box'>
          {items[areaAct || 0].child.map((item, i) => {
            return (
              <View
                key={i}
                className={`area-btn ${cityAct.value === item.value ? 'active' : ''}`}
                onClick={() => setCityAct(item)}
              >
                {item.name}
              </View>
            )
          })}
        </View>
      </View>
      }
      
      <View className='flex-r sub-warp'>
        <View
          className='flex sub-btn1'
          onClick={reset}
        >
          重置
        </View>
        <View
          className='flex sub-btn1 sub-btn2'
          onClick={() => onChange(cityAct.value ? cityAct : null)}
        >
          确认
        </View>
      </View>
    </View>
  )
}

export default FilterArea
