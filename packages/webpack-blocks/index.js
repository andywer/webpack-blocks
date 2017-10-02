const assets = require('@webpack-blocks/assets')
const babel = require('@webpack-blocks/babel')
const devServer = require('@webpack-blocks/dev-server')
const extractText = require('@webpack-blocks/extract-text')
const postcss = require('@webpack-blocks/postcss')
const sass = require('@webpack-blocks/sass')
const typescript = require('@webpack-blocks/typescript')
const uglify = require('@webpack-blocks/uglify')
const webpack = require('@webpack-blocks/webpack')

module.exports = Object.assign(
  {},
  assets,
  webpack,
  {
    babel,
    devServer,
    extractText,
    postcss,
    sass,
    typescript,
    uglify
  }
)
