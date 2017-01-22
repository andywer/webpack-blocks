import test from 'ava'
import path from 'path'
import { createConfig, entryPoint, setOutput, sourceMaps } from '../index'
import babel from '@webpack-blocks/babel6'
import cssModules from '@webpack-blocks/css-modules'
import devServer from '@webpack-blocks/dev-server'
import sass from '@webpack-blocks/sass'

test('complete webpack config creation', (t) => {
  const webpackConfig = createConfig([
    entryPoint('./src/main.js'),
    setOutput('./build/bundle.js'),
    babel(),
    sourceMaps(),
    cssModules({
      localIdentName: '[name]--[local]--[hash:base64:5]'
    }),
    sass(),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:8080' }
    })
  ])

  t.is(webpackConfig.module.loaders.length, 8)
  t.deepEqual(webpackConfig.module.loaders[0], {
    test: /\.css$/,
    loaders: [ 'style-loader', 'css-loader?importLoaders=1&localIdentName=[name]--[local]--[hash:base64:5]&modules' ]
  })
  t.deepEqual(webpackConfig.module.loaders[1], {
    test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
    loaders: [ 'file-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[2], {
    test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
    loaders: [ 'file-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[3], {
    test: /\.json$/,
    loaders: [ 'json-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[4], {
    test: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
    loaders: [ 'url-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[5], {
    test: /\.(mp4|webm)$/,
    loaders: [ 'url-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[6], {
    test: /\.(sass|scss)$/,
    loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[7], {
    test: /\.(js|jsx)$/,
    exclude: [ /\/node_modules\// ],
    loaders: [ 'babel-loader?{"cacheDirectory":true}' ]
  })

  t.deepEqual(webpackConfig.entry, { main: [ './src/main.js', 'webpack/hot/only-dev-server' ] })

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
    path: path.resolve('./build')
  })

  t.is(webpackConfig.devtool, 'cheap-module-source-map')

  t.deepEqual(webpackConfig.resolve.extensions.sort(), [ '', '.js', '.json', '.jsx' ])

  t.deepEqual(Object.keys(webpackConfig).sort(), [
    'devServer', 'devtool', 'entry', 'module', 'output', 'plugins', 'resolve'
  ])
})

test('createConfig.vanilla() creates configurations without defaults', (t) => {
  const webpackConfig = createConfig.vanilla([
    entryPoint('./src/main.js'),
    setOutput('./build/bundle.js')
  ])

  t.deepEqual(webpackConfig, {
    entry: {
      main: [ './src/main.js' ]
    },
    module: {
      loaders: []
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve('./build')
    },
    plugins: []
  })
})

test('context contains necessary properties', (t) => {
  t.plan(10)

  createConfig.vanilla([
    (context) => {
      // context.fileType
      t.is(typeof context.fileType, 'function')
      t.is(typeof context.fileType.add, 'function')
      t.is(typeof context.fileType.all, 'function')
      t.is(typeof context.fileType.get, 'function')
      t.is(typeof context.fileType.has, 'function')

      // context.webpack
      t.is(typeof context.webpack, 'function')
      t.is(typeof context.webpack.EnvironmentPlugin, 'function')

      // context.webpackVersion
      t.is(typeof context.webpackVersion, 'object')
      t.is(typeof context.webpackVersion.major, 'number')
      t.is(typeof context.webpackVersion.minor, 'number')
      return {}
    }
  ])
})
