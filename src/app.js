import Taro from '@tarojs/taro'
import { Component } from 'react'
import { isH5 } from '@/config'
import { setGlobal, setShareUid } from '@config/global'
import { showConfirm } from '@util/message'

import 'taro-ui/dist/style/index.scss'
import './app.scss'
import './resource/unit.scss'
import './resource/color.scss'
import './resource/style/iconfont.css'


let firstVisit = true

class App extends Component {
  onFirstVisit(options) {
    const query = options.query
    console.log('app.onLaunch()', options)
    
    // 设置shareUid
    if (query) {
      if (!isH5() && query.scene) {
        // 扫码进入
        let parts = query.scene.split('_')
        if (parts[1]) {
          console.log('app.onLaunch.setShareUid', parts[1])
          setShareUid(parts[1])
          setGlobal('scene', parts[0])
        } else {
          setGlobal('scene', parts[0])
        }
      } else {
        setShareUid(query.shareUid)
        setGlobal('scene', options.scene)
      }
    }
    !isH5() && this.checkUpdateVersion()
  }
  
  checkUpdateVersion() {
    // 创建 UpdateManager 实例
    const updateManager = Taro.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 监听小程序有版本更新事件
        updateManager.onUpdateReady(function () {
          showConfirm({
            fn: () => {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            },
            msg: '新版本已经准备好，是否重启应用？',
            title: '更新提示'
          })
        })
        
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          showConfirm({
            msg: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~',
            title: '已经有新版本咯~'
          })
        })
      }
    })
  }
  
  componentDidShow(options) {
    if (firstVisit) {
      firstVisit = false
      this.onFirstVisit(options)
    }
  }
  
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
