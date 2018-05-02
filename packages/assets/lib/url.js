module.exports = url

/**
 * @param {object} [options] You can pass all url-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/url-loader
 */
function url(options = {}) {
  return (context, util) => {
    if (!context.match) {
      throw new Error(
        `The url() block can only be used in combination with match(). ` +
          `Use match() to state on which files to apply the url loader.`
      )
    }

    return util.addLoader(
      Object.assign(
        {
          use: [{ loader: 'url-loader', options }]
        },
        context.match
      )
    )
  }
}
