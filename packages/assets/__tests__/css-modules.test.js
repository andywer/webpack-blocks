import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { css } from '../lib/index'

test('css.modules() works', t => {
  const config = createConfig({}, [css.modules()])

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
          options: {
            modules: {
              localIdentName: '[name]--[local]--[hash:base64:5]'
            },
            importLoaders: 1
          }
        }
      ]
    }
  ])
})

test('css.modules() works with options and match()', t => {
  const config = createConfig({}, [
    match('*.pcss', { exclude: /node_modules/ }, [
      css.modules({
        sourceMap: true
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
            modules: {
              localIdentName: '[name]--[local]--[hash:base64:5]'
            },
            importLoaders: 1,
            sourceMap: true
          }
        }
      ]
    }
  ])
})

test('style-loader can take options', t => {
  const config = createConfig({}, [
    css.modules({
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
          options: {
            modules: {
              localIdentName: '[name]--[local]--[hash:base64:5]'
            },
            importLoaders: 1
          }
        }
      ]
    }
  ])
})

test('style-loader can be disabled', t => {
  const config = createConfig({}, [
    css.modules({
      styleLoader: false
    })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]--[local]--[hash:base64:5]'
            },
            importLoaders: 1
          }
        }
      ]
    }
  ])
})
