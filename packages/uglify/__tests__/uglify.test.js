import test from 'ava'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import { createConfig } from '@webpack-blocks/core'
import uglify from '../index'

test('Uglify default options work', t => {
  const config = createConfig({}, [uglify()])

  t.true(config.optimization.minimizer[0] instanceof UglifyJSPlugin)
})

test('Uglify options work', t => {
  const config = createConfig({}, [
    uglify({
      parallel: 42
    })
  ])

  t.truthy(config.optimization.minimizer[0].options.parallel)
  t.truthy(config.optimization.minimizer[0].options.cache)
  t.deepEqual(config.optimization.minimizer[0].options.parallel, 42)
  t.deepEqual(config.optimization.minimizer[0].options.cache, true)
})
