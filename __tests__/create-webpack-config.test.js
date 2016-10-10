import test from 'ava'
import { createConfig } from '../'
import { entryPoint, setOutput, sourceMaps } from '../lib/webpack'
import babel from '../lib/babel6'
import cssModules from '../lib/css-modules'
import devServer from '../lib/dev-server'

test('complete webpack config creation', (t) => {
  const webpackConfig = createConfig([
    entryPoint('./src/main.js'),
    setOutput('./build/bundle.js'),
    babel(),
    sourceMaps(),
    cssModules({
      localIdentName: '[name]--[local]--[hash:base64:5]'
    }),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:8080' }
    })
  ])

  t.is(webpackConfig.module.loaders.length, 7)
  t.deepEqual(webpackConfig.module.loaders[0], {
    test: /\.css$/,
    exclude: [ /\/node_modules\// ],
    loaders: [ 'style', 'css?importLoaders=1&localIdentName=[name]--[local]--[hash:base64:5]&modules' ]
  })
  t.deepEqual(webpackConfig.module.loaders[1], {
    test: /\.(js|jsx)$/,
    exclude: [ /\/node_modules\// ],
    loaders: [ 'babel?cacheDirectory' ]
  })
  t.deepEqual(webpackConfig.module.loaders[2], {
    test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
    loaders: [ 'file' ]
  })
  t.deepEqual(webpackConfig.module.loaders[3], {
    test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
    loaders: [ 'file' ]
  })
  t.deepEqual(webpackConfig.module.loaders[4], {
    test: /\.json$/,
    loaders: [ 'json' ]
  })
  t.deepEqual(webpackConfig.module.loaders[5], {
    test: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
    loaders: [ 'url' ]
  })
  t.deepEqual(webpackConfig.module.loaders[6], {
    test: /\.(mp4|webm)$/,
    loaders: [ 'url' ]
  })

  t.deepEqual(webpackConfig.entry, [ './src/main.js', 'webpack/hot/only-dev-server' ])

  t.deepEqual(webpackConfig.devServer, {
    hot: true,
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/api/*': { target: 'http://localhost:8080' }
    }
  })

  t.deepEqual(webpackConfig.output, {
    filename: 'bundle.js',
    path: './build'
  })

  t.is(webpackConfig.devtool, 'cheap-module-source-map')

  t.deepEqual(Object.keys(webpackConfig).sort(), [
    'devServer', 'devtool', 'entry', 'module', 'output', 'plugins', 'resolve'
  ])
})
