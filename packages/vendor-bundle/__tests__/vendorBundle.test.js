import test from 'ava'
const webpack = require('webpack')
import { createConfig } from '@webpack-blocks/core'
import vendorBundle from '../index'

const moduleInNode = {
  userRequest: '/Users/gendalf/moria/node_modules/decko/dist/decko.js'
}
const moduleInNode2 = {
  userRequest: '/Users/gendalf/moria/node_modules/lodash/noop.js'
}
const moduleNotInNode = {
  userRequest: '/Users/gendalf/moria/src/components/Button.js'
}

test('Vendor bundle default options work', t => {
  const config = createConfig({}, [
    vendorBundle()
  ])

  t.true(config.plugins[0] instanceof webpack.optimize.CommonsChunkPlugin)
  t.false(config.plugins[0].minChunks(moduleNotInNode, 1))
  t.false(config.plugins[0].minChunks(moduleInNode, 0))
  t.true(config.plugins[0].minChunks(moduleInNode, 1))
})

test('Vendor bundle minChunks option', t => {
  const config = createConfig({}, [
    vendorBundle({
      minChunks: 42
    })
  ])

  t.false(config.plugins[0].minChunks(moduleNotInNode, 50))
  t.false(config.plugins[0].minChunks(moduleInNode, 20))
  t.true(config.plugins[0].minChunks(moduleInNode, 50))
})

test('Vendor bundle exclude option, string', t => {
  const config = createConfig({}, [
    vendorBundle({
      exclude: 'lodash'
    })
  ])

  t.true(config.plugins[0].minChunks(moduleInNode, 1))
  t.false(config.plugins[0].minChunks(moduleInNode2, 1))
})

test('Vendor bundle exclude option, RegExp', t => {
  const config = createConfig({}, [
    vendorBundle({
      exclude: /lodash/
    })
  ])

  t.true(config.plugins[0].minChunks(moduleInNode, 1))
  t.false(config.plugins[0].minChunks(moduleInNode2, 1))
})

test('Vendor bundle exclude option, string[]', t => {
  const config = createConfig({}, [
    vendorBundle({
      exclude: ['lodash']
    })
  ])

  t.true(config.plugins[0].minChunks(moduleInNode, 1))
  t.false(config.plugins[0].minChunks(moduleInNode2, 1))
})

test('Vendor bundle exclude option, RegExp[]', t => {
  const config = createConfig({}, [
    vendorBundle({
      exclude: [/lodash/]
    })
  ])

  t.true(config.plugins[0].minChunks(moduleInNode, 1))
  t.false(config.plugins[0].minChunks(moduleInNode2, 1))
})
