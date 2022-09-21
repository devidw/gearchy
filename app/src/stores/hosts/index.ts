import { useGoggleHostLocalStore } from './local'
import { useGoggleHostGitHubStore } from './github'

const stores = {
  local: useGoggleHostLocalStore(),
  github: useGoggleHostGitHubStore(),
}

/**
 * Available hosts
 * Filter objects with `isAvailable` getter
 * Return object with only those key/value pairs that are available
 */
export const availableHosts = Object.fromEntries(
  Object.entries(stores).filter(([, store]) => store.isAvailable),
)
