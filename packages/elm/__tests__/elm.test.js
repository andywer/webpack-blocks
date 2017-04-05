import test from 'ava'
import elm from '../index'

test('Elm default options work', (t) => {
  const block = elm()

  const context = {
    fileType: () => '*.elm'
  }

  t.deepEqual(block(context), {})
  t.deepEqual(block.post(context).module.loaders, [
    {
      test: '*.elm',
      exclude: [ /elm-stuff/, /node_modules/ ],
      loader: 'elm-hot-loader!elm-webpack-loader?{"verbose":"true","warn":"true","debug":"true"}'
    }
  ])
})

test('Elm default production options work', (t) => {
  const block = elm({}, true)

  const context = {
    fileType: () => '*.elm'
  }

  t.deepEqual(block(context), {})
  t.deepEqual(block.post(context).module.loaders, [
    {
      test: '*.elm',
      exclude: [ /elm-stuff/, /node_modules/ ],
      loader: 'elm-webpack-loader'
    }
  ])
})

test('Elm options and exclude work', (t) => {
  const block = elm({
    exclude: 'foo/',
    maxInstances: 4
  })

  const context = {
    fileType: () => '*.elm'
  }

  t.deepEqual(block(context), {})
  t.deepEqual(block.post(context).module.loaders, [
    {
      test: '*.elm',
      exclude: [ 'foo/' ],
      loader: 'elm-hot-loader!elm-webpack-loader?{"verbose":"true","warn":"true","debug":"true","maxInstances":4}'
    }
  ])
})

test('Elm `include` option works', (t) => {
  const block = elm({
    exclude: null,
    include: 'src/**/*.elm'
  })

  const context = {
    fileType: () => '*.elm'
  }

  t.deepEqual(block(context), {})
  t.deepEqual(block.post(context).module.loaders, [
    {
      test: '*.elm',
      include: [ 'src/**/*.elm' ],
      loader: 'elm-hot-loader!elm-webpack-loader?{"verbose":"true","warn":"true","debug":"true"}'
    }
  ])
})
