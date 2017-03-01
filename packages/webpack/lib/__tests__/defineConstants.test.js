const test = require('ava')
const { createConfig } = require('@webpack-blocks/core')
const defineConstants = require('../defineConstants')

const webpack = {
  DefinePlugin: function DefinePluginMock (definitions) {
    this.definitions = definitions
  }
}

test('defineConstants() creates a single DefinePlugin instance only', (t) => {
  const config = createConfig({ webpack }, [
    defineConstants({ a: 'a' }),
    defineConstants({ b: 'b' })
  ])

  t.is(Object.keys(config.plugins).length, 1)
  t.deepEqual(Object.keys(config.plugins[0].definitions), [ 'a', 'b' ])
})

test('defineConstants() encodes the values', (t) => {
  const config = createConfig({ webpack }, [
    defineConstants({
      foo: 'foo',
      bar: {
        baz: 3
      }
    })
  ])

  t.is(Object.keys(config.plugins).length, 1)
  t.deepEqual(config.plugins[0].definitions, {
    foo: '"foo"',
    bar: '{\n  "baz": 3\n}'
  })
})
