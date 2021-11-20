import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Auth from '@com/auth/Auth'
import FloatBtn from '@com/auth/FloatBtn'
import { getUserAsync } from '@inc/store/user'

function BaseView(
  {
    className = '', pageSty = '', renderHeader, renderFooter, children,
    checkPhone, mustCheckPhone, loginMsg, checkAvatar, mustCheckAuth,
    floatBtnItems, showBack
  }
) {
  const isHF = renderHeader || renderFooter
  
  useEffect(() => {
    getUserAsync()
  }, [])
  
  return (
    <View
      className={`screen ${isHF ? 'flex-c' : 'over-auto'} ${className}`}
      style={pageSty}
    >
      {renderHeader}
      
      {isHF
        ? <View className='flex-auto'>
          {children}
        </View>
        : children
      }
      
      {renderFooter}
      
      <Auth
        checkPhone={checkPhone}
        mustCheckPhone={mustCheckPhone}
        loginMsg={loginMsg}
        checkAvatar={checkAvatar}
        mustCheckAuth={mustCheckAuth}
      />
      
      <FloatBtn
        items={floatBtnItems}
        showBack={showBack}
      />
    </View>
  )
}

export default BaseView
