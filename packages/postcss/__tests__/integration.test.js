import test from 'ava'
import { css } from '@webpack-blocks/assets'
import { createConfig, match } from '@webpack-blocks/core'
import postcss from '../index'

test('Postcss works with defaults, without match()', t => {
  const config = createConfig({}, [
    postcss()
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: undefined
          }
        },
        {
          loader: 'postcss-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Postcss works with css() & match()', t => {
  const config = createConfig({}, [
    match('*.css', { exclude: /node_modules/ }, [
      css(),
      postcss()
    ])
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.css$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
          options: {}
        },
        {
          loader: 'css-loader',
          options: {
            minimize: undefined
          }
        },
        {
          loader: 'postcss-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Postcss should pass minimize option to css-loader', t => {
  const config = createConfig({}, [
    postcss({ minimize: true })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {}
        }
      ]
    }
  ])
})

test('Postcss allows inline plugin config and custom options', t => {
  const fakePostcssPlugin = { id: 'fakePostcssPlugin' }

  const config = createConfig({}, [
    postcss({
      plugins: [ fakePostcssPlugin ],
      parser: 'sugarss'
    })
  ])

  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: undefined
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [ fakePostcssPlugin ],
            parser: 'sugarss'
          }
        }
      ]
    }
  ])
})
