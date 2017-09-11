const test = require('ava')
const { createConfig } = require('@webpack-blocks/core')
const setEnv = require('../setEnv')

const webpack = {
  EnvironmentPlugin: function EnvironmentPluginMock (definitions) {
    this.definitions = definitions
  }
}

test('setEnv() creates a single EnvironmentPlugin instance only', (t) => {
  const config = createConfig({ webpack }, [
    setEnv(['a']),
    setEnv({b: 'foo'})
  ])

  t.is(Object.keys(config.plugins).length, 1)
  t.deepEqual(config.plugins[0].definitions, {a: undefined, b: 'foo'})
})
