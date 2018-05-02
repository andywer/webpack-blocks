import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import eslint from '../index'

test('ESLint default options work', t => {
  const config = createConfig({}, [eslint()])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{ loader: 'eslint-loader', options: {} }]
    }
  ])
})

test('ESLint options work', t => {
  const config = createConfig({}, [eslint({ fix: true })])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [
        {
          loader: 'eslint-loader',
          options: { fix: true }
        }
      ]
    }
  ])
})

test('using custom match() works', t => {
  const config = createConfig({}, [match('*.js', { exclude: null }, [eslint({ fix: true })])])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.js$/,
      exclude: null,
      enforce: 'pre',
      use: [
        {
          loader: 'eslint-loader',
          options: { fix: true }
        }
      ]
    }
  ])
})
