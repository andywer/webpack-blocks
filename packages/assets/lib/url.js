const _ = require('lodash')

module.exports = url

/**
 * @param {string} fileType
 * @param {object} [options] You can pass all url-loader options.
 * @param {*}      [options.include]
 * @param {*}      [options.exclude]
 * @return {Function}
 * @see https://github.com/webpack-contrib/url-loader
 */
function url (fileType, options = {}) {
  if (!fileType || typeof fileType !== 'string') {
    throw new Error(`Need to pass a valid file type to url().`)
  }
  return (context, util) => util.addLoader({
    test: context.fileType(fileType),
    include: options.include,
    exclude: options.exclude,
    use: [
      {
        loader: 'url-loader',
        options: _.omit(options, [ 'exclude', 'include' ])
      }
    ]
  })
}
