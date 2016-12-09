import test from 'ava'
import { entryPoint } from '../index'

test('entryPoint() should normalize string to object entry', (t) => {
  let config = {}

  config = entryPoint('./test.js')(null, config)
  t.deepEqual(config.entry, { main: ['./test.js'] })
})
