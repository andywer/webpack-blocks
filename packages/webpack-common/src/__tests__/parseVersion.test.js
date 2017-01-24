import test from 'ava'
import parseVersion from '../parseVersion'

test('parseVersion() works', (t) => {
  t.deepEqual(parseVersion('1.2.3'), {
    major: 1,
    minor: 2,
    patch: 3,
    prerelease: '',
    raw: '1.2.3'
  })

  t.deepEqual(parseVersion('0.12.0-beta'), {
    major: 0,
    minor: 12,
    patch: 0,
    prerelease: 'beta',
    raw: '0.12.0-beta'
  })

  t.deepEqual(parseVersion('2.2.0-rc.1'), {
    major: 2,
    minor: 2,
    patch: 0,
    prerelease: 'rc.1',
    raw: '2.2.0-rc.1'
  })
})
