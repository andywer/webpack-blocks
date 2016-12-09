import test from 'ava'
import { entryPoint } from '../index'

test('entryPoint() should normalize string to object entry', (t) => {
  let config = {}

  config = entryPoint('./test.js')(null, config)
  t.deepEqual(config.entry.main, { main: ['./test.js'] })
})

test('entryPoint() should normalize array to object entry', (t) => {
  let config = {}

  config = entryPoint(['./test.js'])(null, config)
  t.deepEqual(config.entry.main, { main: ['./test.js'] })
})

test('entryPoint() should keep intact object entry', (t) => {
  let config = {}

  config = entryPoint({ main: './test.js' })(null, config)
  t.deepEqual(config.entry.main, { main: ['./test.js'] })
})
