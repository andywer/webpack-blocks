/**
 * Parse semver-compliant version string.
 *
 * @param {string} versionString
 * @return {object}   { major: number, minor: number, patch: number, prerelease: string, raw: string }
 */
export default function parseVersion (versionString) {
  const [ release, prerelease = '' ] = versionString.split('-')
  const [ major, minor, patch ] = release
    .split('.')
    .map((number) => parseInt(number, 10))

  return {
    major,
    minor,
    patch,
    prerelease,
    raw: versionString
  }
}
