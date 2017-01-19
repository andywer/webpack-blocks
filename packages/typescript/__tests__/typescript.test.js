import test from 'ava'
import typescript from '../index'
import { CheckerPlugin } from 'awesome-typescript-loader'

test('Typescript default options work', (t) => {
  const block = typescript()

  const context = {
    fileType: () => '*.ts'
  }

  const config = block(context)

  t.deepEqual(config.resolve, {
    extensions: ['.ts', '.tsx']
  })
  t.deepEqual(config.module.loaders, [{
    test: '*.ts',
    loaders: ['awesome-typescript-loader']
  }])
  t.deepEqual(config.plugins, [new CheckerPlugin()])

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

  const filledContext = {
    fileType: {
      types: { 'application/x-typescript': /\.(ts|tsx)$/ },
      all: function () {
        return (() => this.types)()
      },
      add: function () {
        return (() => { this.error = true })()
      }
    }
  }

  block.pre(filledContext)

  t.falsy(filledContext.fileType.error)
})

