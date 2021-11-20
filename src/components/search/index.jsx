import { useEffect, useState } from 'react'
import { Input, View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'

function Search(
  {
    className = '', placeholder = '输入搜索内容', sk,
    isText, hasBtn, autoFocus,
    onConfirm = () => {
    },
    onInput = () => {
    }
  }
) {
  const [keyword, setKeyword] = useState(sk)
  useEffect(() => {
    setKeyword(sk)
  }, [sk])
  
  return (
    <View className={`flex-r ${hasBtn ? `p-10 bg-f ${className}` : ''}`}>
      <View className={`flex ${hasBtn ? '' : className || 'search-sty'}`}>
        <View className='search-block flex-r'>
          <View className='search-icon'>
            <AtIcon className='c-main' value='search' size='17' />
          </View>
          {isText
            ? <View className='search flex' onClick={onConfirm}>
              {sk || placeholder}
            </View>
            : <Input
              className='search flex'
              placeholder={placeholder}
              focus={autoFocus}
              value={keyword}
              onConfirm={() => onConfirm(keyword)}
              onInput={e => {
                const value = e.detail.value
                setKeyword(value)
                onInput(value)
              }}
              confirmType='search'
            />
          }
          
          {!isText && keyword &&
          <View className='search-close'>
            <AtIcon
              value='close' size='14' color='#999'
              onClick={() => {
                setKeyword('')
                onConfirm('')
                onInput('')
              }}
            />
          </View>
          }
        </View>
      </View>
      
      {hasBtn &&
      <View
        className='search-btn f-15'
        onClick={() => onConfirm(keyword)}
      >
        搜索
      </View>
      }
    </View>
  )
}

export default Search
