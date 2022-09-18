import {
  GoggleBaseLine,
  GoggleMetaBoolean,
  GoggleMetaBooleanKey,
  GoggleMetaGeneric,
  GoggleMetaGenericKey,
} from '..'

export type GoggleMetaLine = GoggleMetaBoolean | GoggleMetaGeneric

export enum GoggleMetaKey {
  PUBLIC = 'public',
  NAME = 'name',
  DESCRIPTION = 'description',
  AUTHOR = 'author',
  HOMEPAGE = 'homepage',
  ISSUES = 'issues',
  TRANSFERRED_TO = 'transferred_to',
  AVATAR = 'avatar',
  LICENSE = 'license',
}

export type GoggleMetaData = Partial<{
  [GoggleMetaBooleanKey.PUBLIC]: boolean
  [GoggleMetaGenericKey.NAME]: string
  [GoggleMetaGenericKey.DESCRIPTION]: string
  [GoggleMetaGenericKey.AUTHOR]: string
  [GoggleMetaGenericKey.HOMEPAGE]: string
  [GoggleMetaGenericKey.ISSUES]: string
  [GoggleMetaGenericKey.TRANSFERRED_TO]: string
  [GoggleMetaGenericKey.AVATAR]: string
  [GoggleMetaGenericKey.LICENSE]: string
}>

export class GoggleMeta extends GoggleBaseLine {
  constructor() {
    super()
  }

  static test(line: string) {
    return GoggleMetaBoolean.test(line) || GoggleMetaGeneric.test(line)
  }

  static create(key: GoggleMetaKey, value: boolean | string) {
    switch (true) {
      case Object.values(GoggleMetaBooleanKey).includes(
        key as unknown as GoggleMetaBooleanKey,
      ):
        return new GoggleMetaBoolean(
          key as unknown as GoggleMetaBooleanKey,
          value as unknown as boolean,
        )
      case Object.values(GoggleMetaGenericKey).includes(
        key as unknown as GoggleMetaGenericKey,
      ):
        return new GoggleMetaGeneric(
          key as unknown as GoggleMetaGenericKey,
          value as string,
        )
      default:
        throw new Error(`Invalid GoggleMeta key: ${key}`)
    }
  }

  static parse(line: string) {
    switch (true) {
      case GoggleMetaBoolean.test(line):
        return GoggleMetaBoolean.parse(line)
      case GoggleMetaGeneric.test(line):
        return GoggleMetaGeneric.parse(line)
      default:
        throw new Error(`Invalid GoggleMeta: ${line}`)
    }
  }
}
