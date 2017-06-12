import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { file } from '../lib/index'

test('file() works with match', t => {
  const config = createConfig({}, [
    match('*.jpg', [
      file()
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.jpg$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }
  ])
})

test('file() works with options and match()', t => {
  const config = createConfig({}, [
    match('*.gif', { exclude: /node_modules/ }, [
      file({
        emitFile: false
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.gif$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            emitFile: false
          }
        }
      ]
    }
  ])
})

test('deprecated file(<fileType>) still works', t => {
  const config = createConfig({}, [
    file('image')
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    }
  ])
})

test('deprecated file(<fileType>, { exclude }) still works', t => {
  const config = createConfig({}, [
    file('image', { exclude: /node_modules/ })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'file-loader',
          options: {
            exclude: /node_modules/
          }
        }
      ]
    }
  ])
})
