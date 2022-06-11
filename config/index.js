const path = require('path')

const config = {
  env: {
    TAG: process.env.TAG
  },
  projectName: `${process.env.TAG || 'dev'}`,
  date: '2020-8-24',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist-${process.env.TAG || 'dev'}`,
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@com': path.resolve(__dirname, '..', 'src/components'),
    '@util': path.resolve(__dirname, '..', 'src/utils'),
    '@inc': path.resolve(__dirname, '..', 'src/inc'),
    '@img': path.resolve(__dirname, '..', 'src/resource/img'),
    '@style': path.resolve(__dirname, '..', 'src/resource'),
    '@config': path.resolve(__dirname, '..', 'src/config')
  },

  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/resource/theme.scss'),
      path.resolve(__dirname, '..', 'src/resource/base.scss')
    ],
    projectDirectory: path.resolve(__dirname, '..')
  },

  defineConstants: {
    TAG: JSON.stringify(process.env.TAG)
  },
  plugins: [],

  copy: {
    patterns: [],
    options: {}
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
