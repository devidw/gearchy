import { GoggleBaseLine } from '.'

export class GoggleComment extends GoggleBaseLine {
  /**
   * @see https://stackoverflow.com/a/977294/13765033
   */
  static regex =
    /^!(?:(?! (name|description|public|author|homepage|issues|transferred_to|avatar|license):))(?<value>(.*))/
  value: string

  constructor(value: string) {
    super()
    this.value = value
  }

  toString(): string {
    return `!${this.value}`
  }

  toJSON(): object {
    return {
      type: 'comment',
      value: this.value,
    }
  }

  static parse(line: string): GoggleComment {
    const groups = line.match(this.regex)?.groups
    const value = groups?.value ?? ''
    return new GoggleComment(value)
  }
}
