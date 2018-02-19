import test from 'ava'
import createConfig from '../createConfig'
import match from '../match'

test('match() sets context.match', t => {
  const matchedLoaderBlock = context => config => {
    t.is(typeof context.match, 'object')
    t.deepEqual(Object.keys(context.match), [ 'test' ])
    t.true(context.match.test instanceof RegExp)
    t.is(context.match.test.toString(), '/^.*\\.css$/')
    return config
  }
  matchedLoaderBlock.pre = context => {
    t.is(typeof context.match, 'object')
    t.is(context.match.test.toString(), '/^.*\\.css$/')
  }
  matchedLoaderBlock.post = context => config => {
    t.is(typeof context.match, 'object')
    t.is(context.match.test.toString(), '/^.*\\.css$/')
    return config
  }

  const unmatchedLoaderBlock = context => config => {
    t.is(typeof context.match, 'undefined')
    return config
  }

  createConfig({}, [
    match('*.css', [
      matchedLoaderBlock
    ]),
    unmatchedLoaderBlock
  ])
})

test('match() supports options and extended regexps', t => {
  const loaderBlock = context => config => {
    t.deepEqual(Object.keys(context.match).sort(), [ 'enforce', 'exclude', 'test' ])
    t.is(context.match.test.toString(), '/^.*\\.(js|jsx)$/')
    t.is(context.match.exclude, 'node_modules')
    return config
  }

  // TODO: Unfortunately you may not have a space after the comma in the glob
  //       or the space will become part of the regex...

  createConfig({}, [
    match('*.{js,jsx}', { exclude: 'node_modules', enforce: 'pre' }, [
      loaderBlock
    ])
  ])
})

test('match() supports negations', t => {
  const loaderBlock = context => config => {
    t.deepEqual(Object.keys(context.match).sort(), [ 'exclude', 'test' ])
    t.is(context.match.test.toString(), '/^.*\\.js$/')
    t.is(context.match.exclude.toString(), '/^.*node_modules.*$/')
    return config
  }

  createConfig({}, [
    match(['*.js', '!*node_modules*'], [
      loaderBlock
    ])
  ])
})

test('match() returns derived context that propagates mutations', t => {
  const mutatingBlock = context => config => {
    context.foo = 'bar'
    return config
  }

  const readingBlock = context => config => {
    t.is(context.foo, 'bar')
    return config
  }

  createConfig({}, [
    match([ '*.sass', '*.scss' ], [
      mutatingBlock
    ]),
    readingBlock
  ])
})

test('match() throws if `options` argument has `test`', t => {
  t.throws(() => createConfig({}, [
    match(['*.js'], {test: /\.jsx/}, [])
  ]))
})
