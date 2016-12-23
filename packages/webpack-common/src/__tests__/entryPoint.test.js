import test from 'ava'
import { entryPoint } from '../webpack'

test('entryPoint() should normalize string to object entry', (t) => {
  let config = {}

  config = entryPoint('./test.js')(null, config)
  t.deepEqual(config.entry, { main: ['./test.js'] })
})

test('entryPoint() should normalize string array to object entry', (t) => {
  let config = {}

  config = entryPoint([ './test.js', './test2.js' ])(null, config)
  t.deepEqual(config.entry, {
    main: [ './test.js', './test2.js' ]
  })
})

test('entryPoint() should normalize an entry object\'s values', (t) => {
  let config = {}

  config = entryPoint({
    main: './app.js',
    test: [ './test.js' ]
  })(null, config)

  t.deepEqual(config.entry, {
    main: [ './app.js' ],
    test: [ './test.js' ]
  })
})
