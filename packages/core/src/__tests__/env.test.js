import test from 'ava'
import sinon from 'sinon'
import { env } from '../index'

process.env.NODE_ENV = 'testing'

test('env() merges correctly', (t) => {
  const envBlock = env(process.env.NODE_ENV, [
    entryPoint1(),
    entryPoint2()
  ])

  t.deepEqual(envBlock(null, {}), {
    entry: {
      foo: './src/foo',
      bar: './src/bar'
    }
  })
})

test('env() respects the NODE_ENV', (t) => {
  const envBlock = env('foo-bar', [
    entryPoint1(),
    entryPoint2()
  ])

  t.deepEqual(envBlock(null, {}), {})
})

test('env() block passes complete config to child blocks', (t) => {
  const spyBlock1 = sinon.spy(() => ({ entry: { foo: 'foo' } }))
  const spyBlock2 = sinon.spy(() => ({}))

  const envBlock = env(process.env.NODE_ENV, [ spyBlock1, spyBlock2 ])

  envBlock(null, {
    entry: { baz: 'baz' }
  })

  t.is(spyBlock1.callCount, 1)
  t.deepEqual(spyBlock1.lastCall.args, [ null, { entry: { baz: 'baz' } } ])

  t.is(spyBlock2.callCount, 1)
  t.deepEqual(spyBlock2.lastCall.args, [ null, { entry: { baz: 'baz', foo: 'foo' } } ])
})

test('env() block merges only child blocks, not parent config', (t) => {
  const envBlock = env(process.env.NODE_ENV, [
    entryPoint1(),
    entryPoint2()
  ])

  const prevConfig = {
    entry: { baz: 'baz' }
  }

  t.deepEqual(envBlock(null, prevConfig), {
    entry: {
      foo: './src/foo',
      bar: './src/bar'
    }
  })
})

function entryPoint1 () {
  return () => ({
    entry: {
      foo: './src/foo'
    }
  })
}

function entryPoint2 () {
  return () => ({
    entry: {
      bar: './src/bar'
    }
  })
}
