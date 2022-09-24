import { useGoggleHostLocalStore } from './local'
import { useGoggleHostGitHubStore } from './github'

// hosts object should be typed to use GoggleFileHostKey as key
export const hosts = {
  local: useGoggleHostLocalStore(),
  github: useGoggleHostGitHubStore(),
} as const
