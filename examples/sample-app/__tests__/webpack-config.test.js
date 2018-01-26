import fs from 'fs'
import path from 'path'
import { exec } from 'child_process'
import rimraf from 'rimraf'
import test from 'ava'

const configFile = require.resolve('../webpack.config.babel')

test('it exports the development config', t => {
  const originalConfig = requireConfig()
  const config = Object.assign({}, originalConfig, {
    plugins: originalConfig.plugins.map(p => p.constructor.name)
  })
  t.snapshot(config)
})

test('it exports the production config', t => {
  const { NODE_ENV } = process.env
  process.env.NODE_ENV = 'production'

  delete require.cache['../webpack.config.babel.js']
  const originalConfig = requireConfig()
  const module = Object.assign({}, originalConfig.module, {
    rules: originalConfig.module.rules.map((rule) => {
      if (rule.test.toString() === /\.css$/.toString()) {
        return Object.assign({}, rule, {
          use: rule.use.map(use => Object.assign({}, use, {
            loader: path.basename(use.loader)
          }))
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

test.skip('it builds', t => {
  const buildLocation = './build'
  rimraf(buildLocation, () => {})

  exec('npm run build', (err, stdout, stderr) => {
    t.is(err, null)
    testHtml()
    testCss()
    testJs()
    t.end()
  })

  function testHtml () {
    const html = fs.readFileSync(path.join(buildLocation, 'index.html'), { encoding: 'utf8' })
    const re = /<link href="css\/main.*.css" rel="stylesheet">/

    t.true(re.test(html))
    t.true(html.includes('<script type="text/javascript" src="bundle.js"></script>'))
  }

  function testJs () {
    const js = fs.readFileSync(path.join(buildLocation, 'bundle.js'), { encoding: 'utf8' })
    t.true(js.includes('No content here. We only test the build process 😉'))
  }

  function testCss () {
    const files = fs.readdirSync(path.join(buildLocation, 'css'), { encoding: 'utf8' })
    t.is(files.length, 1)

    const css = fs.readFileSync(path.join(buildLocation, 'css', files[0]), { encoding: 'utf8' })
    t.true(css.startsWith('.'))
    t.true(css.endsWith('{margin:30px auto;text-align:center}'))
  }
})

function requireConfig () {
  if (require.cache[configFile]) {
    delete require.cache[configFile]
  }
  return require(configFile)
}
