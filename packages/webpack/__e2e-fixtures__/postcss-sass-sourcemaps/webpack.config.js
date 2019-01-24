const { createConfig, entryPoint, setMode, setOutput } = require('../../index')

const path = require('path')
const { match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const postcss = require('@webpack-blocks/postcss')
const sass = require('@webpack-blocks/sass')
const postcssVars = require('postcss-simple-vars')

module.exports = createConfig([
  setMode('development'),
  entryPoint(path.join(__dirname, 'styles.sass')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  match('*.sass', [
    css({ sourceMap: true }),
    postcss({
      plugins: [postcssVars]
    }),
    sass({ indentSyntax: true, sourceMap: true })
  ])
])
