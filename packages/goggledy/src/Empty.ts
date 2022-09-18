import { GoggleBaseLine } from '.'

export class GoggleEmpty extends GoggleBaseLine {
  static regex = /^$/

  constructor() {
    super()
  }

  toString(): string {
    return ''
  }

  toJSON(): object {
    return {
      type: 'empty',
    }
  }

  static parse(str: string) {
    return new GoggleEmpty()
  }
}
