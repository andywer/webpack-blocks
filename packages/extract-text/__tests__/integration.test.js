import test from 'ava'
import { createConfig, match } from '@webpack-blocks/core'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import extractText from '../index'

test('works with css() without match()', t => {
  const config = createConfig({}, [
    css(),
    extractText('css/[name].css')
  ])

  const id = config.plugins[0].id
  const plugin = Object.assign(new ExtractTextPlugin('css/[name].css'), { id })

  t.deepEqual(config.plugins, [ plugin ])
  t.deepEqual(config.module.rules, [
    {
      test: /\.css$/,
      use: plugin.extract({
        fallback: [ 'style-loader' ],
        use: [ 'css-loader' ]
      })
    }
  ])
})

test('works with css() and match()', t => {
  const config = createConfig({}, [
    match('*.css', { exclude: /node_modules/ }, [
      css(),
      extractText()
    ])
  ])

  const id = config.plugins[0].id
  const plugin = Object.assign(new ExtractTextPlugin('css/[name].[contenthash:8].css'), { id })

  t.deepEqual(config.plugins, [ plugin ])
  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.css$/,
      exclude: /node_modules/,
      use: plugin.extract({
        fallback: [ 'style-loader' ],
        use: [ 'css-loader' ]
      })
    }
  ])
})

test('works with sass()', t => {
  const config = createConfig({}, [
    match('*.scss', [
      sass(),
      extractText('css/styles.css')
    ])
  ])

  const id = config.plugins[0].id
  const plugin = Object.assign(new ExtractTextPlugin('css/styles.css'), { id })

  t.deepEqual(config.plugins, [ plugin ])
  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.scss$/,
      use: plugin.extract({
        fallback: [ 'style-loader' ],
        use: [ 'css-loader', 'sass-loader' ]
      })
    }
  ])
})

test('works with html()', t => {
  const config = createConfig({}, [
    match('*.html', [
      html(),
      extractText('build/layout.html')
    ])
  ])

  const id = config.plugins[0].id
  const plugin = Object.assign(new ExtractTextPlugin('build/layout.html'), { id })

  t.deepEqual(config.plugins, [ plugin ])
  t.deepEqual(config.module.rules, [
    {
      test: /^.*\.html$/,
      use: plugin.extract({
        fallback: [ ],
        use: [ 'html-loader' ]
      })
    }
  ])
})

test('fails properly if nothing to extract can be found', t => {
  t.throws(() => createConfig({}, [
    extractText()
  ]), /No loaders found to extract contents from/)
})

test('deprecated fileType parameter does still work', t => {
  const config = createConfig({}, [
    sass(),
    extractText('css/styles.css', 'text/x-sass')
  ])

  const id = config.plugins[0].id
  const plugin = Object.assign(new ExtractTextPlugin('css/styles.css'), { id })

  t.deepEqual(config.plugins, [ plugin ])
  t.deepEqual(config.module.rules, [
    {
      test: /\.(sass|scss)$/,
      use: plugin.extract({
        fallback: [ 'style-loader' ],
        use: [ 'css-loader', 'sass-loader' ]
      })
    }
  ])
})

function css () {
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }, context.match)
  )
}

function sass () {
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.(sass|scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' }
      ]
    }, context.match)
  )
}

function html () {
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.html$/,
      use: [ 'html-loader' ]
    }, context.match)
  )
}
