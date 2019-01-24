const {
  createConfig,
  defineConstants,
  entryPoint,
  performance,
  setDevTool,
  setMode,
  setOutput
} = require('../../index')

const typescript = require('@webpack-blocks/typescript')
const tslint = require('@webpack-blocks/tslint')
const path = require('path')

module.exports = createConfig([
  setDevTool(false),
  setMode('development'),
  entryPoint(path.join(__dirname, 'app.ts')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  typescript({ configFileName: path.resolve(__dirname, './tsconfig.json') }),
  tslint({
    emitErrors: true,
    configuration: {
      rules: {
        'typedef-whitespace': false
      }
    }
  }),
  performance({
    maxAssetSize: 100000,
    maxEntrypointSize: 500000,
    hints: 'error'
  }),
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
