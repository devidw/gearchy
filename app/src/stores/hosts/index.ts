import { useGoggleHostLocalStore } from './local'
import { useGoggleHostGitHubStore } from './github'

export const hosts = {
  local: useGoggleHostLocalStore(),
  github: useGoggleHostGitHubStore(),
}
