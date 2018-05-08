import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import { url } from '../lib/index'

test('url() works with match', t => {
  const config = createConfig({}, [match('*.jpg', [url()])])

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
