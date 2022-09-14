import { GoggleLine } from './GoggleLine'

export enum GoggleInstructionBooleanOptionKey {
  DISCARD = 'discard',
  INURL = 'inurl',
  INTITLE = 'intitle',
  INDESCRIPTION = 'indescription',
  INCONTENT = 'incontent',
}

// TODO: Does it make sense to have a value for this? When set should always be
// truthy. Would not make sense to set to false, since then it should no be set
// in the first place. Because this would mean that the option should no bet set
// at all.

export class GoggleInstructionBooleanOption extends GoggleLine {
  static regex = /^(discard|inurl|intitle|indescription|incontent)$/
  #key!: GoggleInstructionBooleanOptionKey
  #value!: boolean

  constructor(key: GoggleInstructionBooleanOptionKey, value = true) {
    super()
    this.key = key
    this.value = value
  }

  static testKey(key: unknown): key is GoggleInstructionBooleanOptionKey {
    return Object.values(GoggleInstructionBooleanOptionKey).includes(
      key as GoggleInstructionBooleanOptionKey,
    )
  }

  static testValue(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }

  get key(): GoggleInstructionBooleanOptionKey {
    return this.#key
  }

  set key(key: GoggleInstructionBooleanOptionKey) {
    if (!GoggleInstructionBooleanOption.testKey(key)) {
      throw new Error(`Invalid key for GoggleInstructionBooleanOption: ${key}`)
    }
    this.#key = key
  }

  get value() {
    return this.#value
  }

  set value(value: boolean) {
    if (!GoggleInstructionBooleanOption.testValue(value)) {
      throw new Error(
        `Invalid value for GoggleInstructionBooleanOption: ${value}`,
      )
    }
    this.#value = value
  }

  toString(): string {
    return this.value ? this.key : ''
  }

  static parse(str: string): GoggleInstructionBooleanOption {
    return new GoggleInstructionBooleanOption(
      str as GoggleInstructionBooleanOptionKey,
    )
  }
}
