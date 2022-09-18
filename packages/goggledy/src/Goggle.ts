import {
  GoggleEmpty,
  GoggleMeta,
  GoggleMetaLine,
  GoggleMetaBoolean,
  GoggleMetaGeneric,
  GoggleMetaKey,
  GoggleMetaData,
  GoggleComment,
  GoggleInstruction,
  GoggleInstructionActionOptionKey,
} from '.'

export type GoggleLine =
  | GoggleEmpty
  | GoggleMetaLine
  | GoggleComment
  | GoggleInstruction

export class Goggle {
  lines: GoggleLine[] = []

  private static lineHandlers: [
    (str: string) => GoggleLine,
    (str: string) => boolean,
  ][] = [
    [(str) => GoggleEmpty.parse(str), (str) => GoggleEmpty.test(str)],
    [(str) => GoggleMeta.parse(str), (str) => GoggleMeta.test(str)],
    [(str) => GoggleComment.parse(str), (str) => GoggleComment.test(str)],
    [
      (str) => GoggleInstruction.parse(str),
      (str) => GoggleInstruction.test(str),
    ],
  ]

  constructor(lines?: GoggleLine[], metaData?: GoggleMetaData) {
    if (lines?.length) {
      this.lines = lines
    }
    if (metaData) {
      this.metaData = metaData
    }
  }

  toString(): string {
    return this.lines.map((line) => line.toString()).join('\n')
  }

  toJSON(): object {
    return {
      metaData: this.metaData,
      lines: this.lines.map((line) => line.toJSON()),
    }
  }

  static parse(str: string): Goggle {
    const rawLines = str.split('\n')
    const lines: GoggleLine[] = []

    rawLines.forEach((rawLine, index) => {
      rawLine = rawLine.trimStart()
      const lineNumber = index + 1

      // Try to parse the line with each line handler
      this.lineHandlers.forEach(([parse, test]) => {
        if (!test(rawLine)) {
          return
        }

        try {
          lines.push(parse(rawLine))
        } catch (error) {
          throw new Error(
            `Error parsing line ${lineNumber}: ${(error as Error).message}`,
          )
        }
      })
    })

    return new Goggle(lines)
  }

  get metaData(): GoggleMetaData {
    const meta: GoggleMetaData = {}
    this.lines.forEach((line) => {
      if (
        line instanceof GoggleMetaBoolean ||
        line instanceof GoggleMetaGeneric
      ) {
        Object.assign(meta, { [line.key]: line.value })
      }
    })
    return meta
  }

  /**
   * Override all the meta data of the Goggle.
   * Existing meta data will be overwritten, obmitted meta data will be
   * removed and new meta data will be added.
   */
  set metaData(metaData: GoggleMetaData) {
    // Remove all existing meta data
    this.lines = this.lines.filter((line) => {
      return !(
        line instanceof GoggleMetaBoolean || line instanceof GoggleMetaGeneric
      )
    })
    // Add all meta data
    Object.entries(metaData)
      .reverse()
      .forEach(([key, value]) => {
        this.lines = [
          GoggleMeta.create(key as GoggleMetaKey, value),
          ...this.lines,
        ]
      })
  }

  private getInstructionsByAction(
    action: GoggleInstructionActionOptionKey,
  ): Readonly<GoggleInstruction[]> {
    return <GoggleInstruction[]>(
      this.lines.filter(
        (line) => line instanceof GoggleInstruction && line.action === action,
      )
    )
  }

  get boosts(): Readonly<GoggleInstruction[]> {
    return this.getInstructionsByAction(GoggleInstructionActionOptionKey.BOOST)
  }

  get downranks(): Readonly<GoggleInstruction[]> {
    return this.getInstructionsByAction(
      GoggleInstructionActionOptionKey.DOWNRANK,
    )
  }

  get discards(): Readonly<GoggleInstruction[]> {
    return this.getInstructionsByAction(
      GoggleInstructionActionOptionKey.DISCARD,
    )
  }
}
