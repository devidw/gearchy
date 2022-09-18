export abstract class GoggleBaseLine {
  static regex: RegExp

  static test(str: string) {
    return this.regex.test(str)
  }

  // @see https://github.com/microsoft/TypeScript/issues/34516
  // static abstract parse() {}
}
