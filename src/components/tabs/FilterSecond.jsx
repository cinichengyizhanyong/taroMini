import { useEffect, useRef, useState } from 'react'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './FilterSecond.scss'

let isFirst = true

export default function FilterSecond(
  {
    placeholder = '分类',
    items = [], idKey = 'id', nameKey = 'name', nameKeyTwo, itemIsSwap,
    initId, selectOne = {}, selectTwo = {}, ids, onChange
  }
) {
  const [act, setAct] = useState(selectOne || {})
  const second = useRef(selectTwo || {})
  const oneIndex = useRef(0)
  
  useEffect(() => {
    if (selectOne && act.id !== selectOne.id) {
      second.current = {}
      setAct(selectOne)
    }
  }, [selectOne])
  
  useEffect(() => {
    second.current = selectTwo || {}
  }, [selectTwo])
  
  const actClick = (item, index) => {
    second.current = {}
    setAct(item)
    oneIndex.current = index
    if (item.child ? !item.child.length : true) {
      onChange(item, { level: 1, oneItem: item, oneIndex: index, twoItem: null })
    }
  }
  
  return (
    <View className='filter-second flex-c'>
      <View
        className='p-10 f-16 text-center bg-f5'
      >
        {placeholder}
      </View>
      
      <View className='flex-auto flex-n'>
        <View className='left-warp f-14'>
          {items.map((item, index) => {
            const hasId = ids ? ids.includes(item.id) : true
            if (!hasId) {
              return null
            }
            if (initId && isFirst && (item[idKey] + '' === initId + '')) {
              isFirst = false
              second.current = {}
              setAct(item)
              onChange(item, index)
            }
            
            return (
              <View
                key={index}
                className={
                  `p-10 bd-f5 ${act[idKey] === item[idKey] ? 'c-f bg-red' : ''}`
                }
                onClick={() => actClick(item, index)}
              >
                {item[nameKey]} {nameKeyTwo ? item[nameKeyTwo] || '' : ''}
              </View>
            )
          })}
        </View>
        
        <View className='flex-hide'>
          {act.child && act.child.length > 0 &&
          <View className='right-line flex-r'>
            <View
              className='flex'
              onClick={() => {
                second.current = act
                onChange(act, { level: 1, oneItem: act, oneIndex: oneIndex.current, twoItem: null })
              }}
            >
              全部
            </View>
            {second.current[idKey] === act[idKey] &&
            <AtIcon value='check' size='14' color='#999' />
            }
          </View>
          }
          
          {act.child && act.child.length > 0
            ? act.child.map((item, index) => {
              const one = item[nameKey]
              const two = nameKeyTwo ? item[nameKeyTwo] || '' : ''
              const hasId = ids ? ids.includes(item.id) : true
              if (!hasId) {
                return null
              }
              
              return (
                <View
                  key={index}
                  className='flex-r right-line'
                  onClick={() => {
                    second.current = item
                    onChange(item, {
                      level: 2,
                      oneItem: act,
                      oneIndex: oneIndex.current,
                      twoItem: item,
                      twoIndex: index
                    })
                  }}
                >
                  <View className='flex'>
                    {itemIsSwap ? `${two} ${one}` : `${one} ${two}`}
                  </View>
                  {second.current[idKey] === item[idKey] &&
                  <AtIcon value='check' size='14' color='#999' />
                  }
                </View>
              )
            })
            : <View className='right-line c-9'>暂无二级分类</View>
          }
        </View>
      </View>
    </View>
  )
}
