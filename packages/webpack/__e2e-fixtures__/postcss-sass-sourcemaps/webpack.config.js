const { createConfig, entryPoint, setMode, setOutput } = require('../../index')

const path = require('path')
const postcss = require('@webpack-blocks/postcss')
const sass = require('@webpack-blocks/sass')
const postcssVars = require('postcss-simple-vars')

module.exports = createConfig([
  setMode('development'),
  entryPoint(path.join(__dirname, 'styles.sass')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  postcss({
    plugins: [postcssVars]
  }),
  sass({ indentSyntax: true, sourceMap: true })
])
