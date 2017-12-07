import test from 'ava'
import sinon from 'sinon'
import when from '../when'

test('when() merges correctly', (t) => {
  const whenBlock = when(true, [
    entryPoint1(),
    entryPoint2()
  ])

  t.deepEqual(whenBlock(null, {})({}), {
    entry: {
      foo: './src/foo',
      bar: './src/bar'
    }
  })
})

test('when() respects the condition', (t) => {
  const whenBlock = when(false, [
    entryPoint1(),
    entryPoint2()
  ])

  const emptyConfig = { entry: {} }
  t.deepEqual(whenBlock(null, {})(emptyConfig), emptyConfig)
})

test('when() block passes complete config to child blocks', (t) => {
  const spyBlock1 = sinon.spy(() => prevConfig => ({
    ...prevConfig,
    entry: {
      ...prevConfig.entry,
      foo: 'foo'
    }
  }))
  const spyBlock2 = sinon.spy(() => prevConfig => prevConfig)

  const whenBlock = when(true, [ spyBlock1, spyBlock2 ])

  const createdConfig = whenBlock({}, {})({
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
