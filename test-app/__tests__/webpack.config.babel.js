import test from 'ava'
import config from '../webpack.config.babel'

test('it creates the config file', t => {
  const plugins = config.plugins
  delete config.plugins // because it has absolute paths and bring a lot of bloat

  t.snapshot(config)

  config.plugins = plugins
})
