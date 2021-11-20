const APP_PAGES = require('./config/app_pages')
const APP_SUB_PACK_PAGES = require('./config/app_subPackPages')
const APP_TAB_BAR = require('./config/app_tabBar')
const APP_WINDOW = require('./config/app_window')
const APP_PLUGS = require('./config/app_plugs')

export default {
  pages: APP_PAGES,
  subPackages: APP_SUB_PACK_PAGES,
  tabBar: APP_TAB_BAR,
  window: APP_WINDOW,
  plugins: APP_PLUGS,
  
  networkTimeout: {
    request: 10000,
    connectSocket: 10000,
    uploadFile: 10000,
    downloadFile: 10000
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
