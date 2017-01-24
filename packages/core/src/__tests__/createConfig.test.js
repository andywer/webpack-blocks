import test from 'ava'
import sinon from 'sinon'
import { createConfig } from '../index'

test('createConfig() invokes blocks (config setters)', (t) => {
  const block1 = () => ({
    distinct1: 'distinct1',
    shared: 'shared1'
  })
  const block2 = () => ({
    distinct2: 'distinct2',
    shared: 'shared2'
  })
  const block3 = () => ({
    distinct3: 'distinct3',
    shared: 'shared3'
  })

  const resultingConfig = createConfig({}, [ block1, block2, block3 ])

  t.deepEqual(resultingConfig, {
    distinct1: 'distinct1',
    distinct2: 'distinct2',
    distinct3: 'distinct3',
    shared: 'shared3'
  })
})

test('createConfig() invokes pre hooks', (t) => {
  const block1 = Object.assign(() => ({}), {
    pre: sinon.spy(() => {})
  })
  const block2 = Object.assign(() => ({}), {
    pre: sinon.spy(() => {})
  })
  const block3 = Object.assign(() => ({}), {
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
  const block1 = Object.assign(() => ({}), {
    post: sinon.spy(() => ({
      distinct1: 'distinct1',
      shared: 'shared1'
    }))
  })
  const block2 = Object.assign(() => ({}), {
    post: sinon.spy(() => ({
      distinct2: 'distinct2',
      shared: 'shared2'
    }))
  })
  const block3 = Object.assign(() => ({}), {
    post: sinon.spy(() => ({
      distinct3: 'distinct3',
      shared: 'shared3'
    }))
  })

  const resultingConfig = createConfig({}, [ block1, block2, block3 ])
  t.deepEqual(resultingConfig, {
    distinct1: 'distinct1',
    distinct2: 'distinct2',
    distinct3: 'distinct3',
    shared: 'shared3'
  })

  t.is(block1.post.callCount, 1)
  t.is(block2.post.callCount, 1)
  t.is(block3.post.callCount, 1)

  t.is(block1.post.lastCall.args.length, 2)
  t.is(typeof block1.post.lastCall.args[0], 'object')
  t.deepEqual(block1.post.lastCall.args[1], {})
  const context = block1.post.lastCall.args[0]

  t.deepEqual(block2.post.lastCall.args, [
    context,
    { distinct1: 'distinct1', shared: 'shared1' }
  ])

  t.deepEqual(block3.post.lastCall.args, [
    context,
    { distinct1: 'distinct1', distinct2: 'distinct2', shared: 'shared2' }
  ])
})

test('createConfig() invokes hooks and setters in the right order', (t) => {
  const block1 = Object.assign(sinon.spy(() => ({})), {
    pre: sinon.spy(() => {}),
    post: sinon.spy(() => ({}))
  })
  const block2 = Object.assign(sinon.spy(() => ({})), {
    pre: [ sinon.spy(() => {}), sinon.spy(() => {}) ],
    post: [ sinon.spy(() => {}), sinon.spy(() => {}) ]
  })
  const block3 = Object.assign(sinon.spy(() => ({})), {
    pre: sinon.spy(() => {}),
    post: sinon.spy(() => ({}))
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
  const block1 = Object.assign(sinon.spy(() => ({})), {
    pre: sinon.spy(() => {}),
    post: sinon.spy(() => ({}))
  })
  const block2 = Object.assign(sinon.spy(() => ({})), {
    pre: [ sinon.spy(() => {}), block1.pre ],
    post: [ sinon.spy(() => {}), block1.post ]
  })
  const block3 = Object.assign(sinon.spy(() => ({})), {
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
