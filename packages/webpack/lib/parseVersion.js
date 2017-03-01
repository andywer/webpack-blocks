module.exports = parseVersion

/**
 * Parse semver-compliant version string.
 *
 * @param {string} versionString
 * @return {object}   { major: number, minor: number, patch: number, prerelease: string, raw: string }
 */
function parseVersion (versionString) {
  const splitVersion = versionString.split('-')
  const release = splitVersion[0]
  const prerelease = splitVersion[1] || ''
  const splitRelease = release
    .split('.')
    .map((number) => parseInt(number, 10))

  return {
    major: splitRelease[0],
    minor: splitRelease[1],
    patch: splitRelease[2],
    prerelease: prerelease || '',
    raw: versionString
  }
}
