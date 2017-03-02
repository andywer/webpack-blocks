import test from 'ava'
import sinon from 'sinon'
import typescript from '../index'
import { CheckerPlugin } from 'awesome-typescript-loader'

test('Typescript default options work', t => {
  const block = typescript()
  const merge = sinon.spy(() => prevConfig => prevConfig)

  const context = {
    fileType: () => '*.ts'
  }

  block(context, { merge })({})

  t.is(merge.callCount, 1)
  t.deepEqual(merge.lastCall.args, [
    {
      resolve: {
        extensions: ['.ts', '.tsx']
      },
      module: {
        loaders: [
          {
            test: '*.ts',
            loaders: ['awesome-typescript-loader']
          }
        ]
      },
      plugins: [new CheckerPlugin()]
    }
  ])
})

test('adds file type if missing', t => {
  const block = typescript()
  const emptyContext = {
    fileType: {
      types: {},
      all: function () {
        return (() => this.types)()
      },
      add: function (name, regex) {
        return ((name, regex) => { this.types[name] = regex })(name, regex)
      }
    }
  }

  block.pre(emptyContext)

  t.deepEqual(emptyContext.fileType.types, {
    'application/x-typescript': /\.(ts|tsx)$/
  })
})

test('does not try to add file type if already present', t => {
  const block = typescript()
  const filledContext = {
    fileType: {
      types: { 'application/x-typescript': /\.(ts|tsx)$/ },
      all: () => filledContext.fileType.types,
      add: sinon.spy(() => {})
    }
  }

  block.pre(filledContext)

  t.falsy(filledContext.fileType.add.called)
})
