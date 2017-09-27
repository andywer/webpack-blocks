import test from 'ava'
import fs from 'fs'
import { exec } from 'child_process'

test('it exports the config', t => {
  const originalConfig = require('../webpack.config.babel')
  const config = Object.assign({}, originalConfig, {
    plugins: originalConfig.plugins.map(p => p.constructor.name)
  })
  t.snapshot(config)
})

test.cb('it builds', t => {
  exec('npm run build', (err, stdout, stderr) => {
    t.is(err, null)

    const html = fs.readFileSync('./build/index.html', { encoding: 'utf8' })
    const js = fs.readFileSync('./build/bundle.js', { encoding: 'utf8' })
    const css = fs.readFileSync('./build/css/main.0ec7a2a4.css', { encoding: 'utf8' })

    t.true(html.includes('<link href="css/main.0ec7a2a4.css" rel="stylesheet">'))
    t.true(html.includes('<script type="text/javascript" src="bundle.js"></script>'))
    t.true(js.includes('No content here. We only test the build process 😉'))
    t.true(css.startsWith('.'))
    t.true(css.endsWith('{margin:30px auto;text-align:center}'))

    t.end()
  })
})
