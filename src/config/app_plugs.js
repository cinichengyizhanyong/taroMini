let plugs = {}

if (process.env.TAG && process.env.TAG.includes('live')) {
  plugs = {
    'live-player-plugin': {
      'version': '1.0.5',
      'provider': 'wx2b03c6e691cd7370'
    }
  }
}

module.exports = plugs
