let pages = ['pages/index/index']

if (process.env.TARO_ENV === 'weapp') {
  pages = [
    'pages/test/index',
    
    'pages/index/index',

    'pages/mine/login',

    'pages/test/tab'
  ]
}

module.exports = pages
