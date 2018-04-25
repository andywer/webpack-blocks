const {
  createConfig,
  defineConstants,
  entryPoint,
  match,
  performance,
  setDevTool,
  setMode,
  setOutput
} = require('../../index')

const babel = require('@webpack-blocks/babel')
const postcss = require('@webpack-blocks/postcss')
const extractText = require('@webpack-blocks/extract-text')
const path = require('path')
const precss = require('precss')

module.exports = createConfig([
  setMode('development'),
  setDevTool(false),
  entryPoint(
    path.join(__dirname, 'app.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  babel(),
  match('*.css', [
    postcss({
      plugins: [
        precss
      ]
    }),
    extractText(
      'styles.css'
    )
  ]),
  performance({
    maxAssetSize: 100000,
    maxEntrypointSize: 500000,
    hints: 'error'
  }),
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
