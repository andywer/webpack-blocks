import test from 'ava'
import inspect from '../inspect'

test('inspect() exists', (t) => {
  t.is(typeof inspect, 'function')
})
