import {
  GoggleMeta,
  GoggleMetaKey,
  GoggleMetaBooleanKey,
  GoggleMetaGenericKey,
} from '../src'

describe('GoggleMeta', () => {
  test('construction', () => {
    const meta = GoggleMeta.create(GoggleMetaKey.NAME, 'some name')
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

  test('parsing empty value', () => {
    const meta = GoggleMeta.parse('! name: ')
    expect(meta.key).toBe('name')
    expect(meta.value).toBe('')
  })

  test('parising without leading space', () => {
    const meta = GoggleMeta.parse('!name: some name')
    expect(meta.key).toBe('name')
    expect(meta.value).toBe('some name')
  })

  test('parsing without space after colon', () => {
    const meta = GoggleMeta.parse('! name:foo')
    expect(meta.key).toBe('name')
    expect(meta.value).toBe('foo')
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

  test.each(Object.values(GoggleMetaKey))('parsing %s', (key) => {
    const meta = GoggleMeta.parse(`! ${key}: true`)
    expect(meta.key).toBe(key)
  })

  test.each(Object.values(GoggleMetaBooleanKey))(
    'parsing boolean key %s with true value',
    (key) => {
      const meta = GoggleMeta.parse(`! ${key}: true`)
      expect(meta.key).toBe(key)
      expect(meta.value).toBe(true)
    },
  )

  test.each(Object.values(GoggleMetaBooleanKey))(
    'parsing boolean key %s with false value',
    (key) => {
      const meta = GoggleMeta.parse(`! ${key}: false`)
      expect(meta.key).toBe(key)
      expect(meta.value).toBe(false)
    },
  )

  test.each(Object.values(GoggleMetaBooleanKey))(
    'parsing boolean key %s with invalid value',
    (key) => {
      expect(() => GoggleMeta.parse(`! ${key}: foo`)).toThrow(Error)
    },
  )
})
