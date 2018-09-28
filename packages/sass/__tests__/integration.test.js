import test from 'ava'
import { css } from '@webpack-blocks/assets'
import { createConfig, match } from '@webpack-blocks/core'
import sass from '../index'

test('Sass works with defaults, inside match()', t => {
  const config = createConfig({}, [match('*.sass', [sass()])])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.sass$/,
      use: [
        {
          loader: 'sass-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Sass works with css()', t => {
  const config = createConfig({}, [match('*.sass', { exclude: /node_modules/ }, [css(), sass()])])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.sass$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: {}
        },
        {
          loader: 'css-loader',
          options: {}
        },
        {
          loader: 'sass-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Sass should pass sourceMap option to sass-loader', t => {
  const config = createConfig({}, [match('*.sass', [sass({ sourceMap: true })])])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.sass$/,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }
  ])
})
