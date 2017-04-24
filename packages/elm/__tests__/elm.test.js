import test from 'ava'
import elm from '../index'

test('Elm default options work', t => {
  t.plan(1)

  const block = elm()
  const context = {
    fileType: () => '*.elm'
  }

  const fakeMerge = configSnippet => {
    t.deepEqual(configSnippet.module.rules, [
      {
        test: '*.elm',
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
    return prevConfig => configSnippet
  }

  const intermediateConfig = block(context)({})
  block.post(context, { merge: fakeMerge })(intermediateConfig)
})

test('Elm default production options work', t => {
  t.plan(1)

  const block = elm({}, true)
  const context = {
    fileType: () => '*.elm'
  }

  const fakeMerge = configSnippet => {
    t.deepEqual(configSnippet.module.rules, [
      {
        test: '*.elm',
        exclude: [ /elm-stuff/, /node_modules/ ],
        use: [
          {
            loader: 'elm-webpack-loader',
            options: {}
          }
        ]
      }
    ])
    return prevConfig => configSnippet
  }

  const intermediateConfig = block(context)({})
  block.post(context, { merge: fakeMerge })(intermediateConfig)
})

test('Elm options and exclude work', t => {
  t.plan(1)

  const block = elm({
    exclude: 'foo/',
    maxInstances: 4
  })
  const context = {
    fileType: () => '*.elm'
  }

  const fakeMerge = configSnippet => {
    t.deepEqual(configSnippet.module.rules, [
      {
        test: '*.elm',
        exclude: [ 'foo/' ],
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
    return prevConfig => configSnippet
  }

  const intermediateConfig = block(context)({})
  block.post(context, { merge: fakeMerge })(intermediateConfig)
})

test('Elm `include` option works', t => {
  t.plan(1)

  const block = elm({
    exclude: null,
    include: 'src/**/*.elm'
  })
  const context = {
    fileType: () => '*.elm'
  }

  const fakeMerge = configSnippet => {
    t.deepEqual(configSnippet.module.rules, [
      {
        test: '*.elm',
        include: [ 'src/**/*.elm' ],
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
    return prevConfig => configSnippet
  }

  const intermediateConfig = block(context)({})
  block.post(context, { merge: fakeMerge })(intermediateConfig)
})
