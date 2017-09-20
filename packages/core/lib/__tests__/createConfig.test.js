import test from 'ava'
import sinon from 'sinon'
import createConfig from '../createConfig'
import blockHelpers from '../blockUtils'

const defaultConfig = {
  distinct1: 'distinct1',
  distinct2: 'distinct2',
  distinct3: 'distinct3',
  shared: 'shared3',
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    children: false,
    chunks: false,
    modules: false,
    reasons: false
  },
  module: {
    rules: []
  },
  plugins: []
}

test('createConfig() invokes blocks (config setters)', (t) => {
  const block1 = () => prevConfig => ({
    ...prevConfig,
    distinct1: 'distinct1',
    shared: 'shared1'
  })
  const block2 = () => prevConfig => ({
    ...prevConfig,
    distinct2: 'distinct2',
    shared: 'shared2'
  })
  const block3 = () => prevConfig => ({
    ...prevConfig,
    distinct3: 'distinct3',
    shared: 'shared3'
  })

  const resultingConfig = createConfig({}, [ block1, block2, block3 ])

  t.deepEqual(resultingConfig, defaultConfig)
})

test('createConfig() invokes pre hooks', (t) => {
  const block1 = Object.assign(() => config => config, {
    pre: sinon.spy(() => {})
  })
  const block2 = Object.assign(() => config => config, {
    pre: sinon.spy(() => {})
  })
  const block3 = Object.assign(() => config => config, {
    pre: sinon.spy(() => {})
  })

  createConfig({}, [ block1, block2, block3 ])

  t.is(block1.pre.callCount, 1)
  t.is(block2.pre.callCount, 1)
  t.is(block3.pre.callCount, 1)

  t.is(block1.pre.lastCall.args.length, 1)
  const context = block1.pre.lastCall.args[0]
  t.is(typeof context, 'object')

  t.is(block2.pre.lastCall.args.length, 1)
  t.is(block2.pre.lastCall.args[0], context)

  t.is(block3.pre.lastCall.args.length, 1)
  t.is(block3.pre.lastCall.args[0], context)
})

test('createConfig() invokes post hooks', (t) => {
  const block1 = Object.assign(() => config => config, {
    post: sinon.spy(() => prevConfig => ({
      ...prevConfig,
      distinct1: 'distinct1',
      shared: 'shared1'
    }))
  })
  const block2 = Object.assign(() => config => config, {
    post: sinon.spy(() => prevConfig => ({
      ...prevConfig,
      distinct2: 'distinct2',
      shared: 'shared2'
    }))
  })
  const block3 = Object.assign(() => config => config, {
    post: sinon.spy(() => prevConfig => ({
      ...prevConfig,
      distinct3: 'distinct3',
      shared: 'shared3'
    }))
  })

  const resultingConfig = createConfig({}, [ block1, block2, block3 ])
  t.deepEqual(resultingConfig, defaultConfig)

  t.is(block1.post.callCount, 1)
  t.is(block2.post.callCount, 1)
  t.is(block3.post.callCount, 1)

  t.is(block1.post.lastCall.args.length, 2)
  t.is(typeof block1.post.lastCall.args[0], 'object')
  t.is(block1.post.lastCall.args[1], blockHelpers)
  const context = block1.post.lastCall.args[0]

  t.deepEqual(block2.post.lastCall.args, [ context, blockHelpers ])
  t.deepEqual(block3.post.lastCall.args, [ context, blockHelpers ])
})

test('createConfig() invokes hooks and setters in the right order', (t) => {
  const block1 = Object.assign(sinon.spy(() => config => config), {
    pre: sinon.spy(() => config => config),
    post: sinon.spy(() => config => config)
  })
  const block2 = Object.assign(sinon.spy(() => config => config), {
    pre: [
      sinon.spy(() => config => config),
      sinon.spy(() => config => config)
    ],
    post: [
      sinon.spy(() => config => config),
      sinon.spy(() => config => config)
    ]
  })
  const block3 = Object.assign(sinon.spy(() => config => config), {
    pre: sinon.spy(() => config => config),
    post: sinon.spy(() => config => config)
  })

  createConfig({}, [ block1, block2, block3 ])

  t.true(block1.pre.called)
  t.true(block1.pre.calledBefore(block2.pre[0]))
  t.true(block2.pre[0].called)
  t.true(block2.pre[0].calledBefore(block2.pre[1]))
  t.true(block2.pre[1].called)
  t.true(block2.pre[1].calledBefore(block3.pre))
  t.true(block3.pre.called)
  t.true(block3.pre.calledBefore(block1))

  t.true(block1.called)
  t.true(block1.calledBefore(block2))
  t.true(block2.called)
  t.true(block2.calledBefore(block3))
  t.true(block3.called)
  t.true(block3.calledBefore(block1.post))

  t.true(block1.post.called)
  t.true(block1.post.calledBefore(block2.post[0]))
  t.true(block2.post[0].called)
  t.true(block2.post[0].calledBefore(block2.post[1]))
  t.true(block2.post[1].called)
  t.true(block2.post[1].calledBefore(block3.post))
  t.true(block3.post.called)
})

test('createConfig() ignores duplicate hooks', (t) => {
  const block1 = Object.assign(sinon.spy(() => config => config), {
    pre: sinon.spy(() => config => config),
    post: sinon.spy(() => config => config)
  })
  const block2 = Object.assign(sinon.spy(() => config => config), {
    pre: [ sinon.spy(() => config => config), block1.pre ],
    post: [ sinon.spy(() => config => config), block1.post ]
  })
  const block3 = Object.assign(sinon.spy(() => config => config), {
    pre: block1.pre,
    post: block1.post
  })

  createConfig({}, [ block1, block2, block3 ])

  t.is(block1.pre.callCount, 1)
  t.is(block1.post.callCount, 1)

  t.is(block2.pre[0].callCount, 1)
  t.is(block2.post[0].callCount, 1)

  // no need to test block3's pre/post hook spies or block2's 2nd hooks,
  // since they equal block1's
})
