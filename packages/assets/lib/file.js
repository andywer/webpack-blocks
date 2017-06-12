const { synthesizeMatch } = require('./compat')

module.exports = file

/**
 * @param {string} [fileType]   Deprecated.
 * @param {object} [options] You can pass all file-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/file-loader
 */
function file (fileType, options = {}) {
  return (context, util) => {
    if (fileType && typeof fileType === 'object' && Object.keys(options).length === 0) {
      options = fileType
      fileType = null
    }
    if (fileType || options.exclude || options.include) {
      console.warn(`file(): You are using the deprecated 'fileType' parameter, 'options.exclude' or 'options.include'. Use match() instead.`)
    } else if (!context.match) {
      throw new Error(
        `The file() block can only be used in combination with match(). ` +
        `Use match() to state on which files to apply the file loader.`
      )
    }

    return util.addLoader(
      Object.assign(
        {
          use: [
            { loader: 'file-loader', options }
          ]
        },
        // for API backwards compatibility only
        synthesizeMatch(fileType && context.fileType(fileType), options),
        context.match
      )
    )
  }
}
