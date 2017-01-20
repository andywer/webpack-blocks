import test from 'ava'
import { createConfig } from '../index'

const webpack = {}

test('fileType() works with existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      const regex = context.fileType('application/javascript')
      t.is(String(regex), String(/\.(js|jsx)$/))
      return {}
    }
  ])
})

test('fileType() throws on non-existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      t.throws(() => context.fileType('application/not-existent'), /Type is not registered/)
      return {}
    }
  ])
})

test('fileType.get() works with existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      const regex = context.fileType.get('application/javascript')
      t.is(String(regex), String(/\.(js|jsx)$/))
      return {}
    }
  ])
})

test('fileType.get() throws on non-existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      t.throws(() => context.fileType.get('application/not-existent'), /Type is not registered/)
      return {}
    }
  ])
})

test('fileType.has() works with existing types', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      t.true(context.fileType.has('application/javascript'))
      return {}
    }
  ])
})

test('fileType.has() works with non-existing types', (t) => {
  t.plan(1)

  createConfig(webpack, [
    (context) => {
      t.false(context.fileType.has('application/not-existent'))
      return {}
    }
  ])
})

test('fileType.add() works', (t) => {
  t.plan(2)

  createConfig(webpack, [
    (context) => {
      t.throws(() => context.fileType.get('application/new-thing'), /Type is not registered/)
      context.fileType.add('application/new-thing', '*.new')
      return {}
    },
    (context) => {
      t.is(context.fileType.get('application/new-thing'), '*.new')
      return {}
    }
  ])
})
