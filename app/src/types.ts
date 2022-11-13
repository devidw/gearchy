import type {
  GoggleInstructionActionOptionKey,
  GoggleInstructionGenericOptionValue,
} from 'goggledy'
import type { allGoggleHostStores } from './stores/hosts'

export type GoggleFileHostHandle = keyof typeof allGoggleHostStores

export type GoggleFileHost = ReturnType<typeof allGoggleHostStores[GoggleFileHostHandle]>

export type GoggleFileHostInfo = {
  name: string
  handle: GoggleFileHostHandle
  icon: string
  canSubmit: boolean
}

export type GoggleFilePreview = {
  host: GoggleFileHostHandle
  id: string
  name: string
  url?: string
}

export type GoggleFile = GoggleFilePreview & {
  content: string
}

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
