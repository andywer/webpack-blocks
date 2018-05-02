const test = require('ava')
const sinon = require('sinon')
const { entryPoint } = require('../index')

test('entryPoint() should normalize string to object entry', t => {
  const merge = sinon.spy(() => prevConfig => prevConfig)

  entryPoint('./test.js')(null, { merge })({})

  t.is(merge.callCount, 1)
  t.deepEqual(merge.lastCall.args, [
    {
      entry: {
        main: ['./test.js']
      }
    }
  ])
})

test('entryPoint() should normalize string array to object entry', t => {
  const merge = sinon.spy(() => prevConfig => prevConfig)

  entryPoint(['./test.js', './test2.js'])(null, { merge })({})

  t.is(merge.callCount, 1)
  t.deepEqual(merge.lastCall.args, [
    {
      entry: {
        main: ['./test.js', './test2.js']
      }
    }
  ])
})

test("entryPoint() should normalize an entry object's values", t => {
  const merge = sinon.spy(() => prevConfig => prevConfig)

  entryPoint({
    main: './app.js',
    test: ['./test.js']
  })(null, { merge })({})

  t.is(merge.callCount, 1)
  t.deepEqual(merge.lastCall.args, [
    {
      entry: {
        main: ['./app.js'],
        test: ['./test.js']
      }
    }
  ])
})
