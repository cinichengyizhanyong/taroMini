import { useEffect, useRef, useState } from 'react'
import { AtFloatLayout } from 'taro-ui'
import { PickerView, PickerViewColumn, View } from '@tarojs/components'
import { formatTime, getDays, getNewTime, timeParse } from '@util/date'
import { numLen } from '@util/tool'

// 获取最近的年、月、日、时、分的集合
const getPickerViewList = () => {
  const yearList = []
  const monthList = []
  const hourList = []
  const minuteList = []
  
  for (let i = 1970; i <= 2100; i++) {
    yearList.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    monthList.push(i)
  }
  for (let i = 0; i <= 23; i++) {
    hourList.push(i)
  }
  for (let i = 0; i <= 59; i++) {
    minuteList.push(i)
  }
  
  return {
    yearList,
    monthList,
    hourList,
    minuteList
  }
}

function DateTime(
  {
    className = 'at-input f-16', txtSty = '',
    initValue, label, placeholder,
    required, error, tip, showArr,
    minDate, maxDate,
    onSure = () => {
    },
    children
  }
) {
  const current = useRef('')
  const limit = useRef(false)
  const [time, setTime] = useState('')
  const [show, setShow] = useState(false)
  const [values, setValues] = useState([])
  const [state, setState] = useState({
    yearList: [],   //年 -下拉
    monthList: [], //月 -下拉
    dayList: [], //日 -下拉
    hourList: [], //时 -下拉
    minuteList: [] //分 -下拉
  })
  
  useEffect(() => {
    const t = formatTime(initValue, 'sf')
    current.current = t
    if (initValue) {
      limit.current = true
      onSure(t)
      setTime(t)
    }
  }, [initValue])
  
  useEffect(() => {
    const date = timeParse(minDate, true)
    const { yearList, monthList, hourList, minuteList } = getPickerViewList()
    const dayList = getDays(date.year, date.month)
    
    setState({
      yearList,
      monthList,
      dayList,
      hourList,
      minuteList
    })
    
    setTimeout(() => {
      setValues([
        yearList.indexOf(date.year),
        monthList.indexOf(date.month),
        dayList.indexOf(date.day),
        hourList.indexOf(date.hours),
        minuteList.indexOf(date.minutes)
      ])
    })
  }, [minDate])
  
  const onClose = () => {
    limit.current = false
    setShow(false)
  }
  
  const onOpen = () => {
    setShow(true)
    if (!limit.current) {
      return
    }
    const date = timeParse(time, true)
    const { yearList, monthList, dayList, hourList, minuteList } = state
    setValues([
      yearList.indexOf(date.year),
      monthList.indexOf(date.month),
      dayList.indexOf(date.day),
      hourList.indexOf(date.hours),
      minuteList.indexOf(date.minutes)
    ])
  }
  
  const onSureHandel = () => {
    let t = current.current
    limit.current = false
    if (getNewTime(t) < getNewTime(minDate)) {
      limit.current = true
      t = minDate
    } else if (getNewTime(t) > getNewTime(maxDate)) {
      limit.current = true
      t = maxDate
    }
    setShow(false)
    setTime(t)
    onSure(t)
  }
  
  const onChange = e => {
    const v = e.detail.value
    const year = state.yearList[v[0]]
    const month = state.monthList[v[1]]
    const dayList = getDays(year, month)
    
    current.current = `${year}-${numLen(month)}-${numLen(dayList[v[2]])} `
    current.current += `${numLen(state.hourList[v[3]])}:${numLen(state.minuteList[v[4]])}`
    state.dayList = dayList
    setState({ ...state })
    setValues(v)
  }
  
  return (
    <>
      <View
        className={`flex-r ${className}`}
        onClick={onOpen}
      >
        {label &&
        <View
          className={`at-input__title ${required ? 'at-input__title--required' : ''} ${error ? 'c-red' : ''}`}
        >
          {label}
        </View>
        }
        
        {children}
        
        <View className='flex'>
          <View className='flex-r v-input pr-6'>
            <View
              className={`flex ${time ? '' : 'placeholder'} ${txtSty}`}
            >
              {time || placeholder}
            </View>
            
            <View
              className={time ? 'plr-13 at-icon at-icon-close-circle f-19' : ''}
              onClick={e => {
                e.stopPropagation()
                setTime('')
                onSure('')
              }}
            />
            
            {error &&
            <View className='at-icon at-icon-alert-circle f-16 c-red' />
            }
            
            {showArr &&
            <View className='at-icon at-icon-chevron-right f-18 c-9' />
            }
          </View>
          
          {tip &&
          <View className='mt-5 mr-10 f-12 c-red'>{tip}</View>
          }
        </View>
      </View>
      
      {show &&
      <AtFloatLayout
        isOpened
        onClose={onClose}
      >
        <View className='flex-r p-13 bd-f5 bg-f c-lan'>
          <View className='flex' onClick={onClose}>取消</View>
          <View className='flex text-right' onClick={onSureHandel}>确定</View>
        </View>
        
        <PickerView
          className='text-center bg-f'
          style='height: 300px; line-height: 50px;'
          indicatorStyle='height: 50px;'
          value={values}
          onChange={onChange}
        >
          {/*年*/}
          <PickerViewColumn>
            {state.yearList.map((item, index) =>
              <View key={index}>{item}年</View>)
            }
          </PickerViewColumn>
          {/*月*/}
          <PickerViewColumn>
            {state.monthList.map((item, index) =>
              <View key={index}>{item}月</View>)
            }
          </PickerViewColumn>
          {/*日*/}
          <PickerViewColumn>
            {state.dayList.map((item, index) =>
              <View key={index}>{item}日</View>)
            }
          </PickerViewColumn>
          {/*时*/}
          <PickerViewColumn>
            {state.hourList.map((item, index) =>
              <View key={index}>{item}点</View>)
            }
          </PickerViewColumn>
          {/*分*/}
          <PickerViewColumn>
            {state.minuteList.map((item, index) =>
              <View key={index}>{item}分</View>)
            }
          </PickerViewColumn>
        </PickerView>
      </AtFloatLayout>
      }
    </>
  )
}

export default DateTime
