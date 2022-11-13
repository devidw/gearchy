import { useGoggleHostLocalStore } from './local'
import { useGoggleHostGitHubStore } from './github'

export const allGoggleHostStores = {
  local: useGoggleHostLocalStore,
  github: useGoggleHostGitHubStore,
} as const
