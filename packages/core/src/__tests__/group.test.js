import test from 'ava'
import sinon from 'sinon'
import { group } from '../index'

test('group() merges the blocks', (t) => {
  const block1 = createTestBlock1()
  const block2 = createTestBlock2()
  const block3 = createTestBlock3()

  const grouped = group([ block1, block2, block3 ])
  t.is(typeof grouped, 'function')

  const resultingConfig = grouped({}, {})
  t.deepEqual(resultingConfig, {
    distinct1: 'distinct1',
    distinct2: 'distinct2',
    distinct3: 'distinct3',
    shared: 'shared3'
  })

  t.is(block1.callCount, 1)
  t.is(block2.callCount, 1)
  t.is(block3.callCount, 1)
})

test('group() merges pre hooks', (t) => {
  const block1 = createTestBlock1()
  const block2 = createTestBlock2()
  const block3 = createTestBlock3()

  const grouped = group([ block1, block2, block3 ])

  // there are no hooks set on block2 and block3's hook is an array
  t.deepEqual(grouped.pre, [ block1.pre, block3.pre[0] ])
  t.is(block1.pre.callCount, 0)
  t.is(block3.pre[0].callCount, 0)
})

test('group() merges post hooks', (t) => {
  const block1 = createTestBlock1()
  const block2 = createTestBlock2()
  const block3 = createTestBlock3()

  const grouped = group([ block1, block2, block3 ])

  // there are no hooks set on block2 and block3's hook is an array
  t.deepEqual(grouped.post, [ block1.post, block3.post[0] ])
  t.is(block1.post.callCount, 0)
  t.is(block3.post[0].callCount, 0)
})

// Single-function pre & post hook
function createTestBlock1 () {
  const setter = () => ({
    distinct1: 'distinct1',
    shared: 'shared1'
  })

  const pre = () => undefined
  const post = () => ({
    post1: 'post1',
    postShared: 'shared1'
  })

  return Object.assign(sinon.spy(setter), {
    pre: sinon.spy(pre),
    post: sinon.spy(post)
  })
}

// No hooks
function createTestBlock2 () {
  const setter = () => ({
    distinct2: 'distinct2',
    shared: 'shared2'
  })

  return sinon.spy(setter)
}

// Array-of-functions pre & post hook
function createTestBlock3 () {
  const setter = () => ({
    distinct3: 'distinct3',
    shared: 'shared3'
  })

  const pre = () => undefined
  const post = () => ({
    post3: 'post3',
    postShared: 'shared3'
  })

  return Object.assign(sinon.spy(setter), {
    pre: [ sinon.spy(pre) ],
    post: [ sinon.spy(post) ]
  })
}
