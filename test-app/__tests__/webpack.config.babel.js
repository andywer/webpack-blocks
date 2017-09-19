import test from 'ava'

test('it exports the config', t => {
  const originalConfig = require('../webpack.config.babel')
  const config = Object.assign({}, originalConfig, {
    plugins: originalConfig.plugins.map(p => p.constructor.name)
  })
  t.snapshot(config)
})
