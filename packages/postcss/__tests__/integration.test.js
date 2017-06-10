import test from 'ava'
import { css } from '@webpack-blocks/assets'
import { createConfig, match } from '@webpack-blocks/core'
import postcss from '../index'

function LoaderOptionsPlugin (loaderOptions) {
  this.loaderOptions = loaderOptions
}

test('Postcss works with defaults, without match()', t => {
  const config = createConfig({}, [
    postcss()
  ])

  t.deepEqual(config.plugins, [])
  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
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

  t.deepEqual(config.plugins, [])
  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {}
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

  const config = createConfig({ webpack: { LoaderOptionsPlugin } }, [
    match('*.css', [
      postcss([
        fakePostcssPlugin
      ], { parser: 'sugarss' })
    ])
  ])

  t.deepEqual(config.plugins, [
    new LoaderOptionsPlugin({
      options: {
        postcss: [ fakePostcssPlugin ],
        context: '/'
      }
    })
  ])
  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            parser: 'sugarss'
          }
        }
      ]
    }
  ])
})
