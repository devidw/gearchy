import { components } from '@octokit/openapi-types'
import {
  GoggleInstructionActionOptionKey,
  GoggleInstructionGenericOptionValue,
} from 'goggledy'

export type Gist = components['schemas']['gist-simple'] & {
  url: string
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
