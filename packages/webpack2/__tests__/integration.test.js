import test from 'ava'
import path from 'path'
import { createConfig, entryPoint, setOutput, sourceMaps } from '../index'
import babel from '@webpack-blocks/babel6'
import cssModules from '@webpack-blocks/css-modules'
import devServer from '@webpack-blocks/dev-server2'
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

  t.is(webpackConfig.module.loaders.length, 7)
  t.deepEqual(webpackConfig.module.loaders[0], {
    test: /\.css$/,
    exclude: [ /\/node_modules\// ],
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
    test: /\.(aac|m4a|mp3|oga|ogg|wav)$/,
    loaders: [ 'url-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[4], {
    test: /\.(mp4|webm)$/,
    loaders: [ 'url-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[5], {
    test: /\.(sass|scss)$/,
    loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
  })
  t.deepEqual(webpackConfig.module.loaders[6], {
    test: /\.(js|jsx)$/,
    exclude: [ /\/node_modules\// ],
    loaders: [ 'babel-loader?{"cacheDirectory":true}' ]
  })

  t.deepEqual(webpackConfig.entry, {
    main: [ './src/main.js', 'webpack/hot/only-dev-server' ]
  })

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

  t.deepEqual(webpackConfig.resolve.extensions.sort(), [ '.js', '.json', '.jsx' ])

  t.deepEqual(Object.keys(webpackConfig).sort(), [
    'devServer', 'devtool', 'entry', 'module', 'output', 'plugins', 'resolve'
  ])
})
