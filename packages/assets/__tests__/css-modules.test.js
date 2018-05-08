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
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:5]',
            modules: true
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
          loader: 'style-loader',
          options: {}
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:5]',
            modules: true,
            minimize: true
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
        hmr: true
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
            hmr: true
          }
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:5]',
            modules: true
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
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:5]',
            modules: true
          }
        }
      ]
    }
  ])
})
