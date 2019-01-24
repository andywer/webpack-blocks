module.exports = file

/**
 * @param {object} [options] You can pass all file-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/file-loader
 */
function file(options = {}) {
  return (context, util) => {
    if (!context.match) {
      throw new Error(
        `The file() block can only be used in combination with match(). ` +
          `Use match() to state on which files to apply the file loader.`
      )
    }

    return util.addLoader(
      Object.assign(
        {
          use: [{ loader: 'file-loader', options }]
        },
        context.match
      )
    )
  }
}
