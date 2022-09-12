import { GoggleMeta, GoggleMetaDataKey } from '../src'

describe('GoggleMeta', () => {
  test('construction', () => {
    const meta = new GoggleMeta(GoggleMetaDataKey.NAME, 'some name')
    expect(meta.key).toBe('name')
    expect(meta.value).toBe('some name')
  })

  test('detecting', () => {
    expect(GoggleMeta.test('')).toBe(false)
    expect(GoggleMeta.test('! key: val')).toBe(false)
    expect(GoggleMeta.test('! name: some name')).toBe(true)
  })

  test('parsing line without `key: value` schema', () => {
    expect(() => GoggleMeta.parse('! name')).toThrow(Error)
  })

  test('parsing line with invalid key', () => {
    expect(() => GoggleMeta.parse('! foo: bar')).toThrow(Error)
  })

  test('parsing string', () => {
    const meta = GoggleMeta.parse('! name: some name')
    expect(meta.key).toBe('name')
    expect(meta.value).toBe('some name')
  })

  test('parsing false', () => {
    expect(GoggleMeta.parse('! public: false').value).toBe(false)
  })

  test('parsing true', () => {
    expect(GoggleMeta.parse('! public: true').value).toBe(true)
  })

  test('stringification', () => {
    const line = '! name: some name'
    expect(GoggleMeta.parse(line).toString()).toBe(line)
  })
})
