import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { css } from '../lib/index'

test('css() works', t => {
  const config = createConfig({}, [
    css()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {}
        }
      ]
    }
  ])
})

test('css() works with options and match()', t => {
  const config = createConfig({}, [
    match('*.pcss', { exclude: /node_modules/ }, [
      css({
        minimize: true
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.pcss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }
      ]
    }
  ])
})

test('deprecated css(<fileType>) still works', t => {
  const config = createConfig({}, [
    css('text/x-sass')
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {}
        }
      ]
    }
  ])
})

test('deprecated css(<fileType>, { exclude }) still works', t => {
  const config = createConfig({}, [
    css('text/x-sass', { exclude: /node_modules/ })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            exclude: /node_modules/
          }
        }
      ]
    }
  ])
})
