import test from 'ava'
import { createConfig, customConfig, env, sourceMaps } from '../index'

test('env()', (t) => {
  const originalEnv = process.env.NODE_ENV

  const create = () => createConfig([
    env('development', [
      sourceMaps()
    ]),
    env('production', [
      customConfig({
        foo: 'bar'
      })
    ])
  ])

  try {
    process.env.NODE_ENV = ''
    const defaultConfig = create()

    t.is(defaultConfig.devtool, 'cheap-module-source-map')
    t.is(defaultConfig.foo, undefined)

    process.env.NODE_ENV = 'development'
    const devConfig = create()

    t.is(devConfig.devtool, 'cheap-module-source-map')
    t.is(devConfig.foo, undefined)

    process.env.NODE_ENV = 'production'
    const prodConfig = create()

    t.is(prodConfig.devtool, undefined)
    t.is(prodConfig.foo, 'bar')
  } finally {
    process.env.NODE_ENV = originalEnv
  }
})
