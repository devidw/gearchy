import type {
  GoggleInstructionActionOptionKey,
  GoggleInstructionGenericOptionValue,
} from 'goggledy'
// import type { Store } from 'pinia'

// export type GoggleFileHostStore = Store<string, {}, {}, {}>

export type GoggleFileHostKey = 'local' | 'github'

export type GoggleFileHostInfo = {
  name: string
  handle: string
  icon: string
  canSubmit: boolean
}

export type GoggleFilePreview = {
  host: string
  id: string | number
  name: string
  url?: string
}

export type GoggleFile = GoggleFilePreview & {
  content: string
}

export type IndexedDBGoggleFile = {
  id?: number
  name: string
  content: string
}

export type GoggleEditTab = 'meta' | 'code' | GoggleInstructionActionOptionKey

export type GoggleActionRule = {
  id: string
  value?: number
  pattern?: string
  site?: GoggleInstructionGenericOptionValue
  options?: string[]
}

export type GoggleRuleActionAndIndex = {
  action: GoggleInstructionActionOptionKey
  index: number
}
