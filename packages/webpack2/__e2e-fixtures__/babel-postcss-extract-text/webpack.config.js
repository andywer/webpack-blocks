const {
  addPlugins, createConfig, entryPoint, setOutput, webpack
} = require('../../index')

const babel = require('@webpack-blocks/babel6')
const postcss = require('@webpack-blocks/postcss')
const extractText = require('@webpack-blocks/extract-text2')
const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  babel(),
  postcss(),
  extractText(
    path.join('styles.css')
  ),
  addPlugins([
    new webpack.DefinePlugin({
      'process.env': { TEST: '"This is the injected process.env.TEST!"' }
    })
  ])
])
