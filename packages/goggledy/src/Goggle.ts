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
    const lines = str.split('\n').map((line) => {
      line = line.trimStart()
      switch (true) {
        case GoggleEmpty.test(line):
          return new GoggleEmpty()
        case GoggleMeta.test(line):
          return GoggleMeta.parse(line)
        case GoggleComment.test(line):
          return GoggleComment.parse(line)
        default:
          return GoggleInstruction.parse(line)
      }
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
