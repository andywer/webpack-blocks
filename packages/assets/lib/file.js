const _ = require('lodash')

module.exports = file

/**
 * @param {string} fileType
 * @param {object} [options] You can pass all file-loader options.
 * @param {*}      [options.include]
 * @param {*}      [options.exclude]
 * @return {Function}
 * @see https://github.com/webpack-contrib/file-loader
 */
function file (fileType, options = {}) {
  if (!fileType || typeof fileType !== 'string') {
    throw new Error(`Need to pass a valid file type to file().`)
  }
  return (context, util) => util.addLoader({
    test: context.fileType(fileType),
    include: options.include,
    exclude: options.exclude,
    use: [
      {
        loader: 'file-loader',
        options: _.omit(options, [ 'exclude', 'include' ])
      }
    ]
  })
}
