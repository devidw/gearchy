import { GoggleLine } from './GoggleLine'

export enum GoggleInstructionGenericOptionKey {
  SITE = 'site',
}
export type GoggleInstructionGenericOptionValue = string

export class GoggleInstructionGenericOption extends GoggleLine {
  static regex = /^(site)=(.+)$/
  #key!: GoggleInstructionGenericOptionKey
  #value!: GoggleInstructionGenericOptionValue

  constructor(
    key: GoggleInstructionGenericOptionKey,
    value: GoggleInstructionGenericOptionValue,
  ) {
    super()
    this.key = key
    this.value = value
  }

  static testKey(key: unknown): key is GoggleInstructionGenericOptionKey {
    return Object.values(GoggleInstructionGenericOptionKey).includes(
      key as GoggleInstructionGenericOptionKey,
    )
  }

  static testValue(
    value: unknown,
  ): value is GoggleInstructionGenericOptionValue {
    return typeof value === 'string' && value.length > 0
  }

  get key(): GoggleInstructionGenericOptionKey {
    return this.#key
  }

  set key(key: GoggleInstructionGenericOptionKey) {
    if (!GoggleInstructionGenericOption.testKey(key)) {
      throw new Error(`Invalid key for GoggleInstructionGenericOption: ${key}`)
    }
    this.#key = key
  }

  get value(): GoggleInstructionGenericOptionValue {
    return this.#value
  }

  set value(value: GoggleInstructionGenericOptionValue) {
    if (!GoggleInstructionGenericOption.testValue(value)) {
      throw new Error(
        `Invalid value for GoggleInstructionGenericOption: ${value}`,
      )
    }
    this.#value = value
  }

  toString(): string {
    return `${this.key}=${this.value}`
  }

  static parse(str: string): GoggleInstructionGenericOption {
    const [key, value] = str.split('=')
    return new GoggleInstructionGenericOption(
      key as GoggleInstructionGenericOptionKey,
      value as GoggleInstructionGenericOptionValue,
    )
  }
}
