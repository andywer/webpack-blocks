import test from 'ava'
import { css } from '@webpack-blocks/assets'
import { createConfig, match } from '@webpack-blocks/core'
import sass from '../index'

test('Sass works with defaults, without match()', t => {
  const config = createConfig({}, [
    sass()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: undefined
          }
        },
        {
          loader: 'sass-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Sass works with css() & match()', t => {
  const config = createConfig({}, [
    match('*.sass', { exclude: /node_modules/ }, [
      css(),
      sass()
    ])
  ])

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
          options: {
            sourceMap: false,
            minimize: undefined
          }
        },
        {
          loader: 'sass-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Sass should pass sourceMap option to sass-loader and css-loader', t => {
  const config = createConfig({}, [
    sass({ sourceMap: true })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            minimize: undefined
          }
        },
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

test('Sass should pass minimize option to css-loader', t => {
  const config = createConfig({}, [
    sass({ minimize: true })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            minimize: true
          }
        },
        {
          loader: 'sass-loader',
          options: {}
        }
      ]
    }
  ])
})
