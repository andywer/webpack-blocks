import fs from 'fs'
import { basename } from 'path'
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
    rules: originalConfig.module.rules.map((rule, index) => {
      if (index === 2) {
        return Object.assign({}, rule, {
          use: rule.use.map(use => Object.assign({}, use, {
            loader: basename(use.loader)
          }))
        })
      }

      return rule
    })
  })
  const output = Object.assign({}, originalConfig.output, {
    path: basename(originalConfig.output.path)
  })
  const config = Object.assign({}, originalConfig, {
    plugins: originalConfig.plugins.map(p => p.constructor.name),
    module,
    output
  })
  t.snapshot(config)

  process.env.NODE_ENV = NODE_ENV
})

test.cb('it builds', t => {
  rimraf('./build', () => {})
  exec('npm run build', (err, stdout, stderr) => {
    t.is(err, null)
    testHtml()
    testCss()
    testJs()
    t.end()
  })

  function testHtml () {
    const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' })
    const re = /<link href="css\/main.*.css" rel="stylesheet">/

    t.true(re.test(html))
    t.true(html.includes('<script type="text/javascript" src="bundle.js"></script>'))
  }

  function testJs () {
    const js = fs.readFileSync('./build/bundle.js', { encoding: 'utf8' })
    t.true(js.includes('No content here. We only test the build process 😉'))
  }

  function testCss () {
    fs.readdirSync('./build/css', (err, files) => {
      t.is(err, null)
      t.is(files.length, 1)
      t.true(files[0].startsWith('.'))
      t.true(files[0].endsWith('{margin:30px auto;text-align:center}'))
    })
  }
})

function requireConfig () {
  if (require.cache[configFile]) {
    delete require.cache[configFile]
  }
  return require(configFile)
}
