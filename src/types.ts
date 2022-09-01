import { GoggleInstructionGenericOptionValue } from 'goggledy'

export type GoggleActionObject = {
  id: string
  value?: number
  pattern?: string
  site?: GoggleInstructionGenericOptionValue
  options?: string[]
}
