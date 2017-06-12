import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { url } from '../lib/index'

test('url() works with match', t => {
  const config = createConfig({}, [
    match('*.jpg', [
      url()
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.jpg$/,
      use: [
        {
          loader: 'url-loader',
          options: {}
        }
      ]
    }
  ])
})

test('url() works with options and match()', t => {
  const config = createConfig({}, [
    match('*.gif', { exclude: /node_modules/ }, [
      url({
        mimetype: 'image/gif'
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.gif$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            mimetype: 'image/gif'
          }
        }
      ]
    }
  ])
})

test('deprecated url(<fileType>) still works', t => {
  const config = createConfig({}, [
    url('image')
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
      use: [
        {
          loader: 'url-loader',
          options: {}
        }
      ]
    }
  ])
})

test('deprecated url(<fileType>, { exclude }) still works', t => {
  const config = createConfig({}, [
    url('image', { exclude: /node_modules/ })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'url-loader',
          options: {
            exclude: /node_modules/
          }
        }
      ]
    }
  ])
})
