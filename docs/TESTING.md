# How to test blocks

Short summary: prefer integration tests instead of unit tests. End-to-end tests are even more
convincing, but require more effort. So focus on integration tests and maybe add some end-to-end
tests for the most critical bits.

## Unit tests

Let's start with unit tests. You may find the following flow chart useful:

```
Is the block just a helper that sets config, but adds no loaders or plugins?
                                  |
              +-------------------+-------------------+
              |                                       |
             yes                                      no
              |                                       |
              \/                                      \/
        Ok, go for the unit test              Nope, keep reading
```

It is often a good idea to skip writing unit tests for blocks and focus on integration tests
instead. The moment you need to rewrite your unit test because you moved some block logic into a
post hook you will know why you should have written an integration test instead.

## Integration tests

In this context integration tests are tests that actually run `createConfig()` on the block and
possibly other blocks to check if the created configuration matches the expected output.

It is also quite simple to write one. Here is a short example:

```js
import test from 'ava'
import { createConfig, match } from 'webpack-blocks'
import myBlock from '../my-block'

test('my block works with match()', t => {
  const output = createConfig([match('*.myext', { exclude: /node_modules/ }, [myBlock()])])

  t.deepEqual(output, {
    module: {
      rules: [
        {
          test: /^.*\.myext/,
          exclude: /node_modules/,
          use: ['my-fancy-loader']
        }
      ]
    }
  })
})
```

Even if you feed `createConfig()` nothing more than your block it is still an integration test,
since you also test if your block is actually compatible with `createConfig`.

The benefit compared to unit testing is that this way you focus on testing the block's output, not
its implementation details, like if the configuration is changed by the block's main code or a post
hook.

## End-to-end tests

Integration testing is a convenient way to quickly find regressions. But the confidence that the
block will actually work in a real-world use case is still quite limited.

This is where end-to-end tests are useful: they actually run webpack on a minimalistic test project
that uses the block.

You can have a look at webpack-block's end-to-end tests in
[../packages/webpack/**tests**/end-to-end.test.js](packages/webpack/__tests__/end-to-end.test.js)
(the test file) and [../packages/webpack/**e2e-fixtures**/](packages/webpack/__e2e-fixtures__/) (the
test projects).

Those test projects consist of a `webpack.config.js`, an `app.js` and whatever source files are
supposed to be tested.

The end-to-end test will run webpack and then match the generated build artefacts in `build/`
against their expected values:

```js
import test from 'ava'
import fs from 'mz/fs'
import path from 'path'
import webpack from 'webpack'

const fixturesPath = path.join(__dirname, '..', '__e2e-fixtures__')

test('building a minimal webpack project works', async t => {
  const projectPath = path.join(fixturesPath, 'minimal')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  // run the bundle created by webpack
  const bundleExports = require(path.join(buildPath, 'bundle.js'))

  t.is(bundleExports, 'I am the minimal test export')
})

function runWebpack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error) {
        reject(error)
      } else if (stats.hasErrors()) {
        stats.toJson().errors.forEach(error => console.error(error, '\n'))
        reject(new Error('Webpack soft error occured. See stderr output.'))
      } else {
        resolve(stats)
      }
    })
  })
}
```

These tests require more effort and run slower than integration tests, but the confidence in blocks
tested like this is pretty high.
