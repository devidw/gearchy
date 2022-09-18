import { GoggleBaseLine } from '..'

export enum GoggleMetaBooleanKey {
  PUBLIC = 'public',
}

export class GoggleMetaBoolean extends GoggleBaseLine {
  static regex = new RegExp(
    `! ?(?<key>(${Object.values(GoggleMetaBooleanKey).join(
      '|',
    )})): ?(?<value>(.*))`,
  )
  #key!: GoggleMetaBooleanKey
  #value!: boolean

  constructor(key: GoggleMetaBooleanKey, value: boolean | boolean) {
    super()
    this.key = key
    this.value = value
  }

  static testKey(key: unknown): key is GoggleMetaBooleanKey {
    return Object.values(GoggleMetaBooleanKey).includes(
      key as GoggleMetaBooleanKey,
    )
  }

  static testValue(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }

  get key() {
    return this.#key
  }

  set key(key: GoggleMetaBooleanKey) {
    if (!GoggleMetaBoolean.testKey(key)) {
      throw new Error(`Invalid key for GoggleMeta: ${key}`)
    }
    this.#key = key
  }

  get value() {
    return this.#value
  }

  set value(value: boolean) {
    if (!GoggleMetaBoolean.testValue(value)) {
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

  static parse(line: string): GoggleMetaBoolean {
    const groups = line.match(this.regex)?.groups

    if (!groups?.key || !groups?.value) {
      throw new Error(`Invalid GoggleMetaBoolean: ${line}`)
    }

    if (!['true', 'false'].includes(groups.value)) {
      throw new Error(`Invalid value for GoggleMeta: ${groups.value}`)
    }

    return new GoggleMetaBoolean(
      groups.key as GoggleMetaBooleanKey,
      groups.value === 'true',
    )
  }
}
