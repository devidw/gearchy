import {
  GoggleInstructionActionOptionKey,
  GoggleInstructionGenericOptionValue,
} from 'goggledy'

export type GoggleFileHostInfo = {
  name: string
  handle: string
  icon: string
  canSubmit: boolean
}

export type GoggleFilePreview = {
  host: string
  id: string
  name: string
  url?: string
}

export type GoggleFile = GoggleFilePreview & {
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
