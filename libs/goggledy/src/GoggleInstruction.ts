import { GoggleLine } from './GoggleLine'
import {
  GoggleInstructionBooleanOption,
  GoggleInstructionBooleanOptionKey,
} from './GoggleInstructionBooleanOption'
import {
  GoggleInstructionNumericOption,
  GoggleInstructionNumericOptionKey,
  GoggleInstructionNumericOptionValue,
} from './GoggleInstructionNumericOption'
import {
  GoggleInstructionGenericOption,
  GoggleInstructionGenericOptionKey,
} from './GoggleInstructionGenericOption'

export type GoggleInstructionOptionKey =
  | GoggleInstructionBooleanOptionKey
  | GoggleInstructionNumericOptionKey
  | GoggleInstructionGenericOptionKey

export type GoggleInstructionOption =
  | GoggleInstructionBooleanOption
  | GoggleInstructionNumericOption
  | GoggleInstructionGenericOption

export enum GoggleInstructionActionOptionKey {
  DISCARD = 'discard',
  BOOST = 'boost',
  DOWNRANK = 'downrank',
}

export enum GoggleInstructionContextOptionKey {
  INURL = 'inurl',
  INTITLE = 'intitle',
  INDESCRIPTION = 'indescription',
  INCONTENT = 'incontent',
}

// TODO: Perhaps this could be refactored to set all actions with an inital
// value of never in the base options type, and then have a type that overrides
// it to be the correct type for each action.
type GoggleInstructionBaseOptions = Partial<
  {
    [value in GoggleInstructionGenericOptionKey]: string
  } & {
    [value in GoggleInstructionContextOptionKey]: true
  }
>

export type GoggleInstructionDiscardOptions = GoggleInstructionBaseOptions & {
  [GoggleInstructionBooleanOptionKey.DISCARD]?: true
  [GoggleInstructionNumericOptionKey.BOOST]?: never
  [GoggleInstructionNumericOptionKey.DOWNRANK]?: never
}

export type GoggleInstructionBoostOptions = GoggleInstructionBaseOptions & {
  [GoggleInstructionBooleanOptionKey.DISCARD]?: never
  [GoggleInstructionNumericOptionKey.BOOST]?: GoggleInstructionNumericOptionValue
  [GoggleInstructionNumericOptionKey.DOWNRANK]?: never
}

export type GoggleInstructionDownrankOptions = GoggleInstructionBaseOptions & {
  [GoggleInstructionBooleanOptionKey.DISCARD]?: never
  [GoggleInstructionNumericOptionKey.BOOST]?: never
  [GoggleInstructionNumericOptionKey.DOWNRANK]?: GoggleInstructionNumericOptionValue
}

export type GoggleInstructionOptions =
  | GoggleInstructionDiscardOptions
  | GoggleInstructionBoostOptions
  | GoggleInstructionDownrankOptions

export class GoggleInstruction extends GoggleLine {
  static regex = /^(?!!).+/
  pattern?: string
  optionLines: GoggleInstructionOption[]

  constructor(pattern?: string, options?: GoggleInstructionOptions) {
    super()
    this.optionLines = []
    this.pattern = pattern || ''
    this.options = options || {}
  }

  toString(): string {
    let stringified = this.pattern

    const options = this.optionLines
      .map((option) => option.toString())
      .filter((option) => option)
      .join(',')

    if (options) {
      stringified += '$' + options
    }

    return stringified || ''
  }

  toJSON() {
    return {
      type: 'instruction',
      pattern: this.pattern,
      options: this.options,
    }
  }

  static parse(line: string): GoggleInstruction {
    const instruction = new GoggleInstruction()

    const [pattern, options] = line.split('$')

    instruction.pattern = pattern

    if (options) {
      const optionLines = options.split(',')
      optionLines.forEach((optionLine) => {
        switch (true) {
          case GoggleInstructionBooleanOption.test(optionLine):
            instruction.optionLines.push(
              GoggleInstructionBooleanOption.parse(
                optionLine as GoggleInstructionBooleanOptionKey,
              ),
            )
            break
          case GoggleInstructionNumericOption.test(optionLine):
            instruction.optionLines.push(
              GoggleInstructionNumericOption.parse(optionLine),
            )
            break
          case GoggleInstructionGenericOption.test(optionLine):
            instruction.optionLines.push(
              GoggleInstructionGenericOption.parse(optionLine),
            )
            break
          default:
            break
        }
      })
    }

    return instruction
  }

  get options(): GoggleInstructionOptions {
    const options: GoggleInstructionOptions = {}
    this.optionLines.forEach(({ key, value }) => {
      Object.assign(options, { [key]: value })
    })
    return options
  }

  set options(options: GoggleInstructionOptions) {
    this.optionLines = [] // clear existing options
    Object.entries(options).forEach(([key, value]) => {
      switch (true) {
        case Object.values(GoggleInstructionBooleanOptionKey).includes(
          key as GoggleInstructionBooleanOptionKey,
        ):
          this.optionLines.push(
            new GoggleInstructionBooleanOption(
              key as GoggleInstructionBooleanOptionKey,
              value as boolean,
            ),
          )
          break
        case Object.values(GoggleInstructionNumericOptionKey).includes(
          key as GoggleInstructionNumericOptionKey,
        ):
          this.optionLines.push(
            new GoggleInstructionNumericOption(
              key as GoggleInstructionNumericOptionKey,
              value as GoggleInstructionNumericOptionValue,
            ),
          )
          break
        case Object.values(GoggleInstructionGenericOptionKey).includes(
          key as GoggleInstructionGenericOptionKey,
        ):
          this.optionLines.push(
            new GoggleInstructionGenericOption(
              key as GoggleInstructionGenericOptionKey,
              value as string,
            ),
          )
          break
        default:
          /* istanbul ignore next */
          throw new Error(`Invalid option ${key} provided`)
      }
    })
  }

  get action(): GoggleInstructionActionOptionKey {
    return (
      <GoggleInstructionActionOptionKey>(
        Object.keys(this.options).find((key) =>
          Object.values(GoggleInstructionActionOptionKey).includes(
            key as GoggleInstructionActionOptionKey,
          ),
        )
      ) || GoggleInstructionActionOptionKey.BOOST // default action
    )
  }
}
