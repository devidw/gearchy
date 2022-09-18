import { GoggleBaseLine } from '..'

export enum GoggleMetaGenericKey {
  NAME = 'name',
  DESCRIPTION = 'description',
  AUTHOR = 'author',
  HOMEPAGE = 'homepage',
  ISSUES = 'issues',
  TRANSFERRED_TO = 'transferred_to',
  AVATAR = 'avatar',
  LICENSE = 'license',
}

export class GoggleMetaGeneric extends GoggleBaseLine {
  static regex = new RegExp(
    `! ?(?<key>(${Object.values(GoggleMetaGenericKey).join(
      '|',
    )})): ?(?<value>(.*))`,
  )
  #key!: GoggleMetaGenericKey
  #value!: string

  constructor(key: GoggleMetaGenericKey, value: string) {
    super()
    this.key = key
    this.value = value
  }

  static testKey(key: unknown): key is GoggleMetaGenericKey {
    return Object.values(GoggleMetaGenericKey).includes(
      key as GoggleMetaGenericKey,
    )
  }

  static testValue(value: unknown): value is string {
    return typeof value === 'string'
  }

  get key() {
    return this.#key
  }

  set key(key: GoggleMetaGenericKey) {
    if (!GoggleMetaGeneric.testKey(key)) {
      throw new Error(`Invalid key for GoggleMeta: ${key}`)
    }
    this.#key = key
  }

  get value() {
    return this.#value
  }

  set value(value: string | boolean) {
    if (!GoggleMetaGeneric.testValue(value)) {
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

  static parse(line: string): GoggleMetaGeneric {
    const groups = line.match(this.regex)?.groups
    if (!groups?.key) {
      throw new Error(`Invalid meta data: ${line}`)
    }
    return new GoggleMetaGeneric(
      groups.key as GoggleMetaGenericKey,
      groups.value ?? '',
    )
  }
}
