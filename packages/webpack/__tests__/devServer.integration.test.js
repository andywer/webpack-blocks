const test = require('ava')
const { createConfig } = require('@webpack-blocks/core')
const devServer = require('@webpack-blocks/dev-server')
const { entryPoint } = require('../index')

const webpack = {
  // Cannot use shorthand notation, since this would cause an 'is not a constructor' error
  HotModuleReplacementPlugin: function HotModuleReplacementPlugin () {}
}

test('devServer() without options provides expected defaults', (t) => {
  const config = createConfig({ webpack }, [
    entryPoint({
      main: ['./test.js']
    }),
    devServer()
  ])

  t.deepEqual(config, {
    entry: {
      main: ['./test.js', 'webpack/hot/only-dev-server']
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      inline: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
  t.true(config.plugins[0] instanceof webpack.HotModuleReplacementPlugin)
})

test('devServer() uses custom options and can be composed', (t) => {
  const config = createConfig({ webpack }, [
    entryPoint({
      main: ['./test.js'],
      second: ['./second.js']
    }),
    devServer({
      inline: false
    }),
    devServer('some-entry-point')
  ])

  t.deepEqual(config, {
    entry: {
      main: ['./test.js', 'some-entry-point'],
      second: ['./second.js', 'some-entry-point']
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
      inline: false
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
  t.true(config.plugins[0] instanceof webpack.HotModuleReplacementPlugin)
})

// Regression test for https://github.com/andywer/webpack-blocks/issues/76
test('devServer block extends multiple entry points correctly', (t) => {
  const config = createConfig({ webpack }, [
    entryPoint({
      a: './a',
      b: ['./b']
    }),
    devServer()
  ])

  t.deepEqual(config.entry, {
    a: ['./a', 'webpack/hot/only-dev-server'],
    b: ['./b', 'webpack/hot/only-dev-server']
  })
})
