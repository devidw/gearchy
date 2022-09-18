import { GoggleBaseLine } from '..'

export enum GoggleInstructionNumericOptionKey {
  BOOST = 'boost',
  DOWNRANK = 'downrank',
}
export type GoggleInstructionNumericOptionValue =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | undefined

export class GoggleInstructionNumericOption extends GoggleBaseLine {
  static regex = /^(boost|downrank)(=([1-9]|10))?$/
  #key!: GoggleInstructionNumericOptionKey
  #value?: GoggleInstructionNumericOptionValue

  constructor(
    key: GoggleInstructionNumericOptionKey,
    value?: GoggleInstructionNumericOptionValue,
  ) {
    super()
    this.key = key
    this.value = value
  }

  testKey(key: unknown): key is GoggleInstructionNumericOptionKey {
    return Object.values(GoggleInstructionNumericOptionKey).includes(
      key as GoggleInstructionNumericOptionKey,
    )
  }

  testValue(value: unknown): value is GoggleInstructionNumericOptionValue {
    return (
      value === undefined ||
      (typeof value === 'number' && value >= 1 && value <= 10)
    )
  }

  get key() {
    return this.#key
  }

  set key(key: GoggleInstructionNumericOptionKey) {
    if (!this.testKey(key)) {
      throw new Error('Invalid key')
    }
    this.#key = key
  }

  get value() {
    return this.#value
  }

  set value(value: GoggleInstructionNumericOptionValue) {
    if (!this.testValue(value)) {
      throw new Error('Invalid value')
    }
    this.#value = value
  }

  toString(): string {
    switch (this.value) {
      case undefined:
        return this.key
      default:
        return this.key + '=' + this.value
    }
  }

  static parse(line: string): GoggleInstructionNumericOption {
    const [key, value] = line.split('=')
    const theKey = key as GoggleInstructionNumericOptionKey
    const theValue = value
      ? (parseInt(value) as GoggleInstructionNumericOptionValue)
      : undefined
    return new GoggleInstructionNumericOption(theKey, theValue)
  }
}
