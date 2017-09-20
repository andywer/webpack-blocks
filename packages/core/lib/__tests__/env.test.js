import test from 'ava'
import sinon from 'sinon'
import env from '../env'

process.env.NODE_ENV = 'testing'

test('env() merges correctly', (t) => {
  const envBlock = env(process.env.NODE_ENV, [
    entryPoint1(),
    entryPoint2()
  ])

  t.deepEqual(envBlock(null, {})({}), {
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

  const emptyConfig = { entry: {} }
  t.deepEqual(envBlock(null, {})(emptyConfig), emptyConfig)
})

test('env() block passes complete config to child blocks', (t) => {
  const spyBlock1 = sinon.spy(() => prevConfig => ({
    ...prevConfig,
    entry: {
      ...prevConfig.entry,
      foo: 'foo'
    }
  }))
  const spyBlock2 = sinon.spy(() => prevConfig => prevConfig)

  const envBlock = env(process.env.NODE_ENV, [ spyBlock1, spyBlock2 ])

  const createdConfig = envBlock({}, {})({
    entry: { baz: 'baz' }
  })

  t.is(spyBlock1.callCount, 1)
  t.is(spyBlock2.callCount, 1)

  t.deepEqual(createdConfig, {
    entry: {
      baz: 'baz',
      foo: 'foo'
    }
  })
})

function entryPoint1 () {
  return () => prevConfig => ({
    ...prevConfig,
    entry: {
      ...prevConfig.entry,
      foo: './src/foo'
    }
  })
}

function entryPoint2 () {
  return () => prevConfig => ({
    ...prevConfig,
    entry: {
      ...prevConfig.entry,
      bar: './src/bar'
    }
  })
}
