import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import babel from '../index'

test('Babel default options work', t => {
  const config = createConfig({}, [
    babel()
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
    babel({
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
    match('*.js', { exclude: null }, [
      babel({
        cacheDirectory: false
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.js$/,
      exclude: null,
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
