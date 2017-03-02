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
