import { GoggleLine } from './GoggleLine'

export class GoggleEmpty extends GoggleLine {
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
}
