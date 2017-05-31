import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import elm from '../index'

test('Elm default options work', t => {
  const config = createConfig({}, [
    elm()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.elm$/,
      exclude: [ /elm-stuff/, /node_modules/ ],
      use: [
        {
          loader: 'elm-hot-loader'
        },
        {
          loader: 'elm-webpack-loader',
          options: {
            verbose: true,
            warn: true,
            debug: true
          }
        }
      ]
    }
  ])
})

test('Elm default production options work', t => {
  const config = createConfig({}, [
    elm({}, true)
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.elm$/,
      exclude: [ /elm-stuff/, /node_modules/ ],
      use: [
        {
          loader: 'elm-webpack-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Elm options and custom match() work', t => {
  const config = createConfig({}, [
    match('*.elmfile', { exclude: 'foo/' }, [
      elm({
        maxInstances: 4
      })
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.elmfile$/,
      exclude: 'foo/',
      use: [
        {
          loader: 'elm-hot-loader'
        },
        {
          loader: 'elm-webpack-loader',
          options: {
            verbose: true,
            warn: true,
            debug: true,
            maxInstances: 4
          }
        }
      ]
    }
  ])
})
