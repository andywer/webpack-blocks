import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { css } from '../lib/index'

test('css() works', t => {
  const config = createConfig({}, [css()])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {}
        },
        {
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
        sourceMaps: true
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.pcss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: {}
        },
        {
          loader: 'css-loader',
          options: {
            sourceMaps: true
          }
        }
      ]
    }
  ])
})

test('style-loader can take options', t => {
  const config = createConfig({}, [
    css({
      styleLoader: {
        esModule: true
      }
    })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            esModule: true
          }
        },
        {
          loader: 'css-loader',
          options: {}
        }
      ]
    }
  ])
})

test('style-loader can be disabled', t => {
  const config = createConfig({}, [
    css({
      styleLoader: false
    })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {}
        }
      ]
    }
  ])
})
