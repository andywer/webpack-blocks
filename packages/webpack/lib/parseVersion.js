module.exports = parseVersion

/**
 * Parse semver-compliant version string.
 *
 * @param {string} versionString
 * @return {object}   { major: number, minor: number, patch: number, prerelease: string, raw: string }
 */
function parseVersion (versionString) {
  const [ release, prerelease ] = versionString.split('-')
  const splitRelease = release
    .split('.')
    .map(number => parseInt(number, 10))

  return {
    major: splitRelease[0],
    minor: splitRelease[1],
    patch: splitRelease[2],
    prerelease: prerelease || '',
    raw: versionString
  }
}
