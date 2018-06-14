const {
  createConfig,

  // Feature blocks
  addPlugins,
  entryPoint,
  env,
  group,
  performance,
  setMode,
  setOutput,
  sourceMaps,

  // Shorthand setters
  babel,
  css,
  devServer,
  extractText,
  typescript
} = require('webpack-blocks')

const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    }),
    css.modules()
  ])

const productionConfig = () =>
  group([css.modules({ minimize: true }), extractText('css/[name].[contenthash:hex:8].css')])

module.exports = createConfig([
  setMode(process.env.NODE_ENV || 'development'),
  babel(),
  typescript({ configFileName: path.resolve(__dirname, './tsconfig.json') }),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]),
  env('development', [entryPoint('./src/index.dev.js'), developmentConfig()]),
  env('production', [
    entryPoint('./src/index.js'),
    setOutput('./build/bundle.js'),
    productionConfig()
  ])
])
