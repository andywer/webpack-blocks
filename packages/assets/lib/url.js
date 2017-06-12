const { synthesizeMatch } = require('./compat')

module.exports = url

/**
 * @param {string} [fileType]   Deprecated.
 * @param {object} [options] You can pass all url-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/url-loader
 */
function url (fileType, options = {}) {
  return (context, util) => {
    if (fileType && typeof fileType === 'object' && Object.keys(options).length === 0) {
      options = fileType
      fileType = null
    }
    if (fileType || options.exclude || options.include) {
      console.warn(`url(): You are using the deprecated 'fileType' parameter, 'options.exclude' or 'options.include'. Use match() instead.`)
    } else if (!context.match) {
      throw new Error(
        `The url() block can only be used in combination with match(). ` +
        `Use match() to state on which files to apply the url loader.`
      )
    }

    return util.addLoader(
      Object.assign(
        {
          use: [
            { loader: 'url-loader', options }
          ]
        },
        // for API backwards compatibility only
        synthesizeMatch(fileType && context.fileType(fileType), options),
        context.match
      )
    )
  }
}
