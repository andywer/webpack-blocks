import test from 'ava'
import sinon from 'sinon'
import babel6 from '../index'

test('Babel default options work', (t) => {
  const block = babel6()

  const addLoader = sinon.spy((loaderDef) => config => config)
  const context = {
    fileType: () => '*.js'
  }

  t.deepEqual(block(context, { addLoader })({}), {})
  t.deepEqual(block.post(context, { addLoader })({}), {})

  t.is(addLoader.callCount, 1)
  t.deepEqual(addLoader.lastCall.args, [
    {
      test: '*.js',
      exclude: [ /node_modules/ ],
      loaders: [ 'babel-loader?{"cacheDirectory":true}' ]
    }
  ])
})

test('Babel options and exclude work', (t) => {
  const block = babel6({
    exclude: 'foo/',
    presets: ['es2015'],
    plugins: ['bar']
  })

  const addLoader = sinon.spy((loaderDef) => config => config)
  const context = {
    fileType: () => '*.js'
  }

  t.deepEqual(block(context, { addLoader })({}), {})
  t.deepEqual(block.post(context, { addLoader })({}), {})

  t.is(addLoader.callCount, 1)
  t.deepEqual(addLoader.lastCall.args, [
    {
      test: '*.js',
      exclude: [ 'foo/' ],
      loaders: [ 'babel-loader?{"cacheDirectory":true,"plugins":["bar"],"presets":["es2015"]}' ]
    }
  ])
})

test('Babel `include` option works', (t) => {
  const block = babel6({
    exclude: null,
    include: 'src/**/*.js'
  })

  const addLoader = sinon.spy((loaderDef) => config => config)
  const context = {
    fileType: () => '*.js'
  }

  t.deepEqual(block(context, { addLoader })({}), {})
  t.deepEqual(block.post(context, { addLoader })({}), {})

  t.is(addLoader.callCount, 1)
  t.deepEqual(addLoader.lastCall.args, [
    {
      test: '*.js',
      include: [ 'src/**/*.js' ],
      loaders: [ 'babel-loader?{"cacheDirectory":true}' ]
    }
  ])
})
