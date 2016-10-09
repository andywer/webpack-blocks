import test from 'ava'
import { createConfig } from '../'
import { entryPoint, setOutput } from '../lib/webpack'
import babel from '../lib/babel6'
import devServer from '../lib/dev-server'

test('complete webpack config creation', (t) => {
  const webpackConfig = createConfig([
    entryPoint('./src/main.js'),
    setOutput('./build/bundle.js'),
    babel(),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:8080' }
    })
  ])

  t.deepEqual(webpackConfig.module.loaders, [
    {
      test: /\.jsx?$/,
      exclude: [ /node_modules/ ],
      loaders: [ 'react-hot', 'babel?cacheDirectory' ]
    }, {
      test: /\.eot$|\.ttf$|\.woff$|\.svg$|\.png$/,
      loader: 'file'
    }, {
      test: /\.json$/,
      loader: 'json'
    }
  ])

  t.deepEqual(webpackConfig.entry, {
    app: './src/main.js',
    devServer: [ 'webpack/hot/dev-server', 'webpack/hot/only-dev-server' ]
  })

  t.deepEqual(webpackConfig.devServer, {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/*': { target: 'http://localhost:8080' }
    }
  })

  t.deepEqual(webpackConfig.output, {
    filename: 'bundle.js',
    path: './build'
  })

  t.deepEqual(Object.keys(webpackConfig).sort(), [ 'devServer', 'entry', 'module', 'output' ])
})
