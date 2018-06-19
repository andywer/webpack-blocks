import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import execa from 'execa'
import test from 'ava'

const configFile = require.resolve('../webpack.config.babel')

test('it exports the development config', t => {
  const { NODE_ENV } = process.env
  process.env.NODE_ENV = 'development'

  const originalConfig = requireConfig()
  const module = Object.assign({}, originalConfig.module, {
    rules: originalConfig.module.rules.map(rule => {
      if (rule.test.toString() === /\.(ts|tsx)$/.toString()) {
        return Object.assign({}, rule, {
          use: rule.use.map(use =>
            Object.assign({}, use, {
              options: { configFileName: '<REPLACED>' }
            })
          )
        })
      }

      return rule
    })
  })
  const config = Object.assign({}, originalConfig, {
    module,
    plugins: originalConfig.plugins.map(p => p.constructor.name)
  })
  t.snapshot(config)

  process.env.NODE_ENV = NODE_ENV
})

test('it exports the production config', t => {
  const { NODE_ENV } = process.env
  process.env.NODE_ENV = 'production'

  delete require.cache['../webpack.config.babel.js']
  const originalConfig = requireConfig()
  const module = Object.assign({}, originalConfig.module, {
    rules: originalConfig.module.rules.map(rule => {
      if (rule.test.toString() === /\.css$/.toString()) {
        return Object.assign({}, rule, {
          use: rule.use.map(use =>
            Object.assign({}, use, {
              loader: path.basename(use.loader)
            })
          )
        })
      }

      if (rule.test.toString() === /\.(ts|tsx)$/.toString()) {
        return Object.assign({}, rule, {
          use: rule.use.map(use =>
            Object.assign({}, use, {
              options: { configFileName: '<REPLACED>' }
            })
          )
        })
      }

      return rule
    })
  })
  const output = Object.assign({}, originalConfig.output, {
    path: path.basename(originalConfig.output.path)
  })
  const config = Object.assign({}, originalConfig, {
    plugins: originalConfig.plugins.map(p => p.constructor.name),
    module,
    output
  })
  t.snapshot(config)

  process.env.NODE_ENV = NODE_ENV
})

test('it builds', async t => {
  const buildLocation = path.resolve(__dirname, '../build')
  rimraf(buildLocation, () => {})
  await execa('yarn', ['build'], { cwd: path.resolve(__dirname, '..') })

  testHtml()
  testCss()
  testJs()

  function testHtml() {
    const html = fs.readFileSync(path.resolve(buildLocation, 'index.html'), { encoding: 'utf8' })
    const re = /<link href="css\/main.*.css" rel="stylesheet">/

    t.true(re.test(html))
    t.true(html.includes('<script type="text/javascript" src="bundle.js"></script>'))
  }

  function testJs() {
    const js = fs.readFileSync(path.resolve(buildLocation, 'bundle.js'), { encoding: 'utf8' })
    t.true(js.includes('No content here. We only test the build process 😉'))
  }

  function testCss() {
    const files = fs.readdirSync(path.resolve(buildLocation, 'css'), { encoding: 'utf8' })
    t.is(files.length, 1)

    const css = fs.readFileSync(path.resolve(buildLocation, 'css', files[0]), { encoding: 'utf8' })
    t.true(css.startsWith('.'))
    t.true(css.endsWith('{margin:30px auto;text-align:center}'))
  }
})

function requireConfig() {
  if (require.cache[configFile]) {
    delete require.cache[configFile]
  }
  return require(configFile)
}
