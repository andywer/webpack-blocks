import test from 'ava'
import { createConfig, entryPoint } from '../../webpack'
import devServer from '../index'

test('devServer() add himself to every entries', (t) => {
  const config = createConfig([
    entryPoint({
      main: [ './test.js' ],
      second: [ './second.js' ]
    }),
    devServer('entry')
  ])

  t.deepEqual(config.entry, {
    main: [ './test.js', 'entry' ],
    second: [ './second.js', 'entry' ]
  })
})

test('devServer() use webpack/hot/only-dev-server as default', (t) => {
  const config = createConfig([
    entryPoint({
      main: [ './test.js' ]
    }),
    devServer()
  ])

  t.deepEqual(config.entry.main, [ './test.js', 'webpack/hot/only-dev-server' ])
})
