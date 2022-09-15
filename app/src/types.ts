import {
  GoggleInstructionActionOptionKey,
  GoggleInstructionGenericOptionValue,
} from 'goggledy'

export type GoggleEditTab = 'meta' | 'code' | GoggleInstructionActionOptionKey

export type GoggleActionObject = {
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
