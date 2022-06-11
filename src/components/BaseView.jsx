import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Auth from '@com/auth/Auth'
import FloatBtn from '@com/auth/FloatBtn'
import { getUserAsync } from '@inc/store/user'

function BaseView(
  {
    className = '', pageClass = '', style = '', renderHeader, renderFooter, children,
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
      style={style}
    >
      {renderHeader}

      {isHF
        ? <View className={`flex-auto ${pageClass}`}>
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
