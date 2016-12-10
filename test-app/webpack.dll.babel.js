const {
  createConfig, entryPoint, setContext, setOutput, webpack,
} = require('@webpack-blocks/webpack')

const { setDllPlugin } = require('../packages/webpack')

const path = require('path');
const dllPath = path.resolve(__dirname, './dll');

const entries = {
  react: ['react', 'react-dom'],
}

const output = {
  filename: '[name].dll.js',
  path: dllPath,
  library: '[name]_lib',
}

const dllOptions = {
  path: path.join(dllPath, '[name]-manifest.json'),
  name: '[name]_lib',
}

module.exports = createConfig([
  setContext(process.cwd()),
  entryPoint(entries),
  setOutput(output),
  setDllPlugin(dllOptions),
])
