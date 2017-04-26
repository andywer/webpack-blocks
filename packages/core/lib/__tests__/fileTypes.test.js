import test from 'ava'
import { createConfig } from '../index'

const webpack = {}

test('fileType() works with existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      const regex = context.fileType('application/javascript')
      t.is(String(regex), String(/\.(js|jsx)$/))
      return prevConfig
    }
  ])
})

test('fileType() throws on non-existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      t.throws(() => context.fileType('application/not-existent'), /Type is not registered/)
      return prevConfig
    }
  ])
})

test('fileType.get() works with existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      const regex = context.fileType.get('application/javascript')
      t.is(String(regex), String(/\.(js|jsx)$/))
      return prevConfig
    }
  ])
})

test('fileType.get() throws on non-existing type', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      t.throws(() => context.fileType.get('application/not-existent'), /Type is not registered/)
      return prevConfig
    }
  ])
})

test('fileType.has() works with existing types', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      t.true(context.fileType.has('application/javascript'))
      return prevConfig
    }
  ])
})

test('fileType.has() works with non-existing types', (t) => {
  t.plan(1)

  createConfig(webpack, [
    context => prevConfig => {
      t.false(context.fileType.has('application/not-existent'))
      return prevConfig
    }
  ])
})

test('fileType.add() works', (t) => {
  t.plan(2)

  createConfig(webpack, [
    context => prevConfig => {
      t.throws(() => context.fileType.get('application/new-thing'), /Type is not registered/)
      context.fileType.add('application/new-thing', '*.new')
      return prevConfig
    },
    context => prevConfig => {
      t.is(context.fileType.get('application/new-thing'), '*.new')
      return prevConfig
    }
  ])
})
