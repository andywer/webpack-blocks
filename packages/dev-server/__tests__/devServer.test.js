import test from 'ava'
import devServer from '../index'

test('devServer() add himself to every entries', (t) => {
  let config = {
    entry: {
      main: ['./test.js'],
      second: ['./second.js']
    }
  }

  config = devServer('entry')(null, config)
  t.deepEqual(config.entry, { main: ['entry'], second: ['entry'] })
})

test('devServer() use webpack/hot/only-dev-server as default', (t) => {
  let config = {
    entry: {
      main: ['./test.js']
    }
  }

  config = devServer()(null, config)
  t.deepEqual(config.entry.main, ['webpack/hot/only-dev-server'])
})
