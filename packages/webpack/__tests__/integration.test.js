import test from 'ava'
import path from 'path'
import {
  createConfig,
  entryPoint,
  match,
  setOutput,
  sourceMaps,
  resolve,
  setMode,
  optimization
} from '../index'
import { css, file, url } from '@webpack-blocks/assets'
import babel from '@webpack-blocks/babel'
import devServer from '@webpack-blocks/dev-server'
import postcss from '@webpack-blocks/postcss'
import sass from '@webpack-blocks/sass'

test('complete webpack config creation', t => {
  const images = ['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp']
  const fonts = ['*.eot', '*.ttf', '*.woff', '*.woff2']

  const webpackConfig = createConfig([
    setMode('development'),
    entryPoint('./src/main.js'),
    setOutput('./build/bundle.js'),
    babel(),
    sourceMaps(),
    devServer({
      proxy: {
        '/api/*': { target: 'http://localhost:8080' }
      }
    }),
    match('*.scss', [
      css.modules({
        modules: {
          localIdentName: '[name]--[local]--[hash:base64:5]'
        }
      }),
      postcss(),
      sass()
    ]),
    match(images, { exclude: /node_modules/ }, [
      url({
        limit: 10000
      })
    ]),
    match(fonts, [file()]),
    optimization({
      splitChunks: 'all'
    })
  ])

  t.is(webpackConfig.module.rules.length, 4)
  t.deepEqual(webpackConfig.module.rules[0], {
    test: /^.*\.scss$/,
    use: [
      {
        loader: 'style-loader',
        options: {}
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]--[local]--[hash:base64:5]'
          },
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {}
      },
      {
        loader: 'sass-loader',
        options: {}
      }
    ]
  })
  t.deepEqual(webpackConfig.module.rules[1], {
    test: [/^.*\.gif$/, /^.*\.jpg$/, /^.*\.jpeg$/, /^.*\.png$/, /^.*\.webp$/],
    exclude: /node_modules/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  })
  t.deepEqual(webpackConfig.module.rules[2], {
    test: [/^.*\.eot$/, /^.*\.ttf$/, /^.*\.woff$/, /^.*\.woff2$/],
    use: [
      {
        loader: 'file-loader',
        options: {}
      }
    ]
  })
  t.deepEqual(webpackConfig.module.rules[3], {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  })

  t.is(webpackConfig.mode, 'development')

  t.deepEqual(webpackConfig.entry, { main: ['./src/main.js'] })

  t.deepEqual(webpackConfig.devServer, {
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    inline: true,
    clientLogLevel: 'error',
    stats: 'errors-only',
    proxy: {
      '/api/*': { target: 'http://localhost:8080' }
    }
  })

  t.deepEqual(webpackConfig.output, {
    filename: 'bundle.js',
    path: path.resolve('./build')
  })

  t.is(webpackConfig.devtool, 'cheap-module-eval-source-map')

  t.deepEqual(webpackConfig.optimization, {
    splitChunks: 'all'
  })

  t.deepEqual(Object.keys(webpackConfig).sort(), [
    'devServer',
    'devtool',
    'entry',
    'mode',
    'module',
    'optimization',
    'output',
    'plugins',
    'resolve',
    'stats'
  ])
})

test('createConfig() creates a minimal configuration', t => {
  const webpackConfig = createConfig([entryPoint('./src/main.js'), setOutput('./build/bundle.js')])

  t.deepEqual(webpackConfig, {
    entry: {
      main: ['./src/main.js']
    },
    module: {
      rules: []
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve('./build')
    },
    stats: {
      children: false,
      chunks: false,
      modules: false,
      reasons: false
    },
    plugins: [],
    resolve: {
      extensions: ['.js', '.json']
    }
  })
})

test('context contains necessary properties', t => {
  t.plan(5)

  createConfig([
    context => {
      // context.webpack
      t.is(typeof context.webpack, 'function')
      t.is(typeof context.webpack.EnvironmentPlugin, 'function')

      // context.webpackVersion
      t.is(typeof context.webpackVersion, 'object')
      t.is(typeof context.webpackVersion.major, 'number')
      t.is(typeof context.webpackVersion.minor, 'number')

      return prevConfig => prevConfig
    }
  ])
})

test('prepends custom extension to default ones', t => {
  const expectedExtensionOrder = ['.custom.js', '.js', '.json']

  const webpackConfig = createConfig([resolve({ extensions: ['.custom.js'] })])

  const actualExtensions = webpackConfig.resolve.extensions

  t.deepEqual(actualExtensions, expectedExtensionOrder)
})
