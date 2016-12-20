import test from 'ava'
import { createConfig } from '@webpack-blocks/core'
import { defineConstants } from '../index'

test('defineConstants() creates a single DefinePlugin instance only', (t) => {
  const config = createConfig([
    defineConstants({ a: 'a' }),
    defineConstants({ b: 'b' })
  ])

  t.is(Object.keys(config.plugins).length, 1)
  t.deepEqual(config.plugins[0].definitions, {
    a: 'a',
    b: 'b'
  })
})
