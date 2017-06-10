import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import babel6 from '../index'

test('Babel default options work', t => {
  const config = createConfig({}, [
    babel6()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ]
    }
  ])
})

test('Babel options work', t => {
  const config = createConfig({}, [
    babel6({
      presets: ['es2015'],
      plugins: ['bar']
    })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['es2015'],
            plugins: ['bar']
          }
        }
      ]
    }
  ])
})

test('using custom match() works', t => {
  const config = createConfig({}, [
    match('*.js', { exclude: [] }, [
      babel6({
        cacheDirectory: false
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.js$/,
      exclude: [],
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false
          }
        }
      ]
    }
  ])
})
