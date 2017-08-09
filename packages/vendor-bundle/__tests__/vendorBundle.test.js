import test from 'ava'
const webpack = require('webpack')
import { createConfig } from '@webpack-blocks/core'
import vendorBundle from '../index'

const moduleInNode = {
  context: '/Users/gendalf/moria/node_modules/decko/dist',
  request: '/Users/gendalf/moria/node_modules/decko/dist/decko.js'
}
const moduleNotInNode = {
  context: '/Users/gendalf/moria/webpack/assets/javascripts/components/main/components',
  request: '/Users/gendalf/moria/node_modules/babel-loader/lib/index.js??ref--5-0!/Users/gendalf/moria/src/components/Button.js'
}

test('Vendor bundle default options work', t => {
  const config = createConfig({}, [
    vendorBundle()
  ])

  t.true(config.plugins[0] instanceof webpack.optimize.CommonsChunkPlugin)
  t.false(config.plugins[0].minChunks(moduleNotInNode, 5))
  t.false(config.plugins[0].minChunks(moduleInNode, 2))
  t.true(config.plugins[0].minChunks(moduleInNode, 5))
})

test('Vendo bundle options work', t => {
  const config = createConfig({}, [
    vendorBundle({
      minChunks: 42
    })
  ])

  t.false(config.plugins[0].minChunks(moduleNotInNode, 50))
  t.false(config.plugins[0].minChunks(moduleInNode, 20))
  t.true(config.plugins[0].minChunks(moduleInNode, 50))
})
