const {
  createConfig,

  // Feature blocks
  addPlugins,
  defineConstants,
  entryPoint,
  env,
  group,
  performance,
  setOutput,
  sourceMaps,

  // Shorthand setters
  babel,
  css,
  devServer,
  extractText,
  typescript,
  uglify
} = require('webpack-blocks')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const developmentConfig = () =>
  group([
    sourceMaps(),
    devServer({
      proxy: {
        '/api/*': { target: 'http://localhost:4000' }
      }
    }),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    })
  ])

const productionConfig = () =>
  group([
    extractText(),
    uglify(),
    addPlugins([
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    ])
  ])

module.exports = createConfig([
  babel(),
  typescript({ configFileName: path.resolve(__dirname, './tsconfig.json') }),
  css.modules(),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  env('development', [entryPoint('./src/index.dev.js'), developmentConfig()]),
  env('production', [
    entryPoint('./src/index.js'),
    setOutput('./build/bundle.js'),
    productionConfig()
  ])
])
