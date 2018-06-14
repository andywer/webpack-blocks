const { createConfig, entryPoint, setMode, setOutput } = require('../../index')

const path = require('path')
const postcss = require('@webpack-blocks/postcss')
const precss = require('precss')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  setMode('development'),
  entryPoint(path.join(__dirname, 'styles.sass')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  postcss({
    plugins: [precss]
  }),
  sass({ indentSyntax: true, sourceMap: true })
])
