import { Goggle } from '../src'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

describe('Goggle fixtures', () => {
  // Load all file paths from /__fixtures__ directory into an array
  const fixtures = readdirSync(join(__dirname, '../__fixtures__')).map((file) =>
    join(__dirname, '../__fixtures__', file),
  )

  test.each(fixtures)('should parse and stringify %s', (fixturePath) => {
    const fixtureContent = readFileSync(fixturePath, 'utf8')
    expect(Goggle.parse(fixtureContent).toString()).toBe(fixtureContent)
  })
})
