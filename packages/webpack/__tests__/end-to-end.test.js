import test from 'ava'
import fs from 'mz/fs'
import { JSDOM } from 'jsdom'
import path from 'path'
import webpack from 'webpack'

const fixturesPath = path.join(__dirname, '../__e2e-fixtures__')

test('building a minimal webpack project works', async t => {
  const projectPath = path.join(fixturesPath, 'minimal')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  const bundleExports = require(path.join(buildPath, 'bundle.js'))
  t.is(bundleExports, 'I am the minimal test export')
})

test('building the babel/postcss/extract-text project works', async t => {
  const projectPath = path.join(fixturesPath, 'babel-postcss-extract-text')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  require(path.join(buildPath, 'bundle.js'))

  // Check if bundle contains injected process.env.TEST
  const bundleContents = await fs.readFile(path.join(buildPath, 'bundle.js'), { encoding: 'utf8' })
  t.true(bundleContents.indexOf('module.exports = "This is the injected process.env.TEST!"') > -1)

  // Check if CSS file contains correct content
  const styleContents = await fs.readFile(path.join(buildPath, 'styles.css'), { encoding: 'utf8' })
  t.true(removeWhitespaces(styleContents).indexOf(removeWhitespaces('.app { margin: 40px; }')) > -1)
})

test('building the sass/extract-text project works', async t => {
  const projectPath = path.join(fixturesPath, 'sass-extract-text')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  global.window = new JSDOM('<html><body></body></html>')
  global.document = global.window.document
  require(path.join(buildPath, 'bundle.js'))

  // Check if CSS file contains correct content
  const styleContents = await fs.readFile(path.join(buildPath, 'styles.css'), { encoding: 'utf8' })
  t.true(
    removeWhitespaces(styleContents).indexOf(removeWhitespaces('body { padding: 25px; }')) > -1
  )
})

test('building the typescript project works', async t => {
  const projectPath = path.join(fixturesPath, 'typescript')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  global.window = new JSDOM('<html><body></body></html>')
  global.document = global.window.document
  require(path.join(buildPath, 'bundle.js'))

  // Check if bundle contains injected process.env.TEST
  const bundleContents = await fs.readFile(path.join(buildPath, 'bundle.js'), { encoding: 'utf8' })
  t.true(bundleContents.indexOf('module.exports = "This is the injected process.env.TEST!"') > -1)
})

test('the postcss/sass/source-maps project build does not fail', async t => {
  // Regression test for https://github.com/andywer/webpack-blocks/issues/116

  const projectPath = path.join(fixturesPath, 'postcss-sass-sourcemaps')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  t.pass()
})

test('building the sass/css-modules project works', async t => {
  const projectPath = path.join(fixturesPath, 'sass-css-modules')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  global.window = new JSDOM('<html><body></body></html>')
  global.document = global.window.document
  require(path.join(buildPath, 'bundle.js'))

  // Check if CSS file contains correct content
  const styleContents = await fs.readFile(path.join(buildPath, 'styles.css'), { encoding: 'utf8' })
  t.truthy(removeWhitespaces(styleContents).match(/\.styles--myClass--[0-9a-zA-Z]+{margin:10px;}/))
  t.truthy(
    removeWhitespaces(styleContents).match(/\.styles--myClass--[0-9a-zA-Z]+:hover{color:#ff0000;}/)
  )
})

function runWebpack(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error) {
        reject(error)
      } else if (stats.hasErrors()) {
        // eslint-disable-next-line no-console
        stats.toJson().errors.forEach(error => console.error(error, '\n'))
        reject(new Error('Webpack soft error occured. See stderr output.'))
      } else {
        resolve(stats)
      }
    })
  })
}

function removeWhitespaces(string) {
  return string.replace(/\s/g, '')
}
