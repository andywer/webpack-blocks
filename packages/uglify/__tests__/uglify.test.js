import test from 'ava'
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
import { createConfig } from '@webpack-blocks/core'
import uglify from '../index'

test('Uglify default options work', t => {
  const config = createConfig({}, [
    uglify()
  ])

  t.true(config.plugins[0] instanceof UglifyJSPlugin)
})

test('Uglify options work', t => {
  const config = createConfig({}, [
    uglify({
      parallel: {
        workers: 42
      }
    })
  ])

  t.truthy(config.plugins[0].options.parallel)
  t.deepEqual(config.plugins[0].options.parallel, {
    cache: true,
    workers: 42
  })
})
