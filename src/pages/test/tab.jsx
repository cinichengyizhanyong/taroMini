import React from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import BaseView from '@com/BaseView'
import { useTabs } from '@inc/use-dom'
import { View } from '@tarojs/components'

function TabPage() {
  const tabList = [{ title: '精选直播' }, { title: '直播专题' }]
  const { act, hasVisit, onSet } = useTabs()
  
  return (
    <BaseView className='bg-f'>
      <AtTabs
        className='screen-tabs'
        current={act}
        tabList={tabList}
        onClick={onSet}
      >
        <AtTabsPane current={act} index={0}>
          {tabList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.title}
              </React.Fragment>
            )
          })}
          {hasVisit[0] &&
          <>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>
              还有球一天我去我饿人他有㔿啊是的放个好
              还有球一天我去我饿人他有㔿啊是的放个好
              还有球一天我去我饿人他有㔿啊是的放个好
            </View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
          </>
          }
        </AtTabsPane>
        <AtTabsPane current={act} index={1}>
          {hasVisit[1] &&
          <>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>
              还有球一天我去我饿人他有㔿啊是的放个好
              还有球一天我去我饿人他有㔿啊是的放个好
            </View>
            <View className='p-10'>
              还有球一天我去我饿人他有㔿啊是的放个好
              还有球一天我去我饿人他有㔿啊是的放个好
              还有球一天我去我饿人他有㔿啊是的放个好
            </View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好</View>
            <View className='p-10'>还有球一天我去我饿人他有㔿啊是的放个好--end</View>
          </>
          }
        </AtTabsPane>
      </AtTabs>
    </BaseView>
  )
}

export default TabPage
