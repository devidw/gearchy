import { LocalStorage } from 'quasar'
import { Octokit } from 'https://cdn.skypack.dev/octokit'

const authToken = LocalStorage.getItem('authToken')
export const api = new Octokit({ auth: authToken })
