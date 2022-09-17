import { GoggleLine } from './GoggleLine'

export enum GoggleMetaDataKey {
  NAME = 'name',
  DESCRIPTION = 'description',
  PUBLIC = 'public',
  AUTHOR = 'author',
  HOMEPAGE = 'homepage',
  ISSUES = 'issues',
  TRANSFERRED_TO = 'transferred_to',
  AVATAR = 'avatar',
  LICENSE = 'license',
}

export type GoggleMetaData = Partial<{
  [GoggleMetaDataKey.NAME]: string
  [GoggleMetaDataKey.DESCRIPTION]: string
  [GoggleMetaDataKey.PUBLIC]: boolean
  [GoggleMetaDataKey.AUTHOR]: string
  [GoggleMetaDataKey.HOMEPAGE]: string
  [GoggleMetaDataKey.ISSUES]: string
  [GoggleMetaDataKey.TRANSFERRED_TO]: string
  [GoggleMetaDataKey.AVATAR]: string
  [GoggleMetaDataKey.LICENSE]: string
}>

export class GoggleMeta extends GoggleLine {
  static regex =
    /!\s?(?<key>(name|description|public|author|homepage|issues|transferred_to|avatar|license)):\s?(?<value>(.*))/
  #key!: GoggleMetaDataKey
  #value!: string | boolean

  constructor(key: GoggleMetaDataKey, value: string | boolean) {
    super()
    this.key = key
    this.value = value
  }

  static testKey(key: unknown): key is GoggleMetaDataKey {
    return Object.values(GoggleMetaDataKey).includes(key as GoggleMetaDataKey)
  }

  static testValue(value: unknown): value is string | boolean {
    return typeof value === 'string' || typeof value === 'boolean'
  }

  get key(): GoggleMetaDataKey {
    return this.#key
  }

  set key(key: GoggleMetaDataKey) {
    if (!GoggleMeta.testKey(key)) {
      throw new Error(`Invalid key for GoggleMeta: ${key}`)
    }
    this.#key = key
  }

  get value() {
    return this.#value
  }

  set value(value: string | boolean) {
    if (!GoggleMeta.testValue(value)) {
      throw new Error(`Invalid value for GoggleMeta: ${value}`)
    }
    this.#value = value
  }

  toString(): string {
    return `! ${this.key}: ${this.value}`
  }

  toJSON(): object {
    return {
      type: 'meta',
      key: this.key,
      value: this.value,
    }
  }

  // TODO: Refactor into seperate classes to also call .test() and .parse()
  // for boolean and string meta data values
  // This would also make sure that key value combinations have runtime type
  // checks via the user defined type guards testKey() and testValue()
  static parse(line: string): GoggleMeta {
    const groups = line.match(this.regex)?.groups
    if (!groups?.key) {
      throw new Error(`Invalid meta data: ${line}`)
    }
    switch (true) {
      // ! public: true
      case groups.key === GoggleMetaDataKey.PUBLIC && groups.value === 'true':
        return new GoggleMeta(GoggleMetaDataKey.PUBLIC, true)
      // ! public: false
      case groups.key === GoggleMetaDataKey.PUBLIC && groups.value === 'false':
        return new GoggleMeta(GoggleMetaDataKey.PUBLIC, false)
      // ! any other valid key: value
      case Object.values(GoggleMetaDataKey).includes(
        groups.key as GoggleMetaDataKey,
      ):
        return new GoggleMeta(groups.key as GoggleMetaDataKey, groups?.value)
      // Should never happen because regex already checks for valid keys,
      // but typescript complains if we don't handle "all" cases.
      default:
        /* istanbul ignore next */
        throw new Error(`Invalid meta data: ${line}`)
    }
  }
}
