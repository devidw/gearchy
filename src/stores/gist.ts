import { defineStore } from 'pinia'
import { components } from '@octokit/openapi-types'
import { api } from '../services/api'
import { useGoggleStore } from './goggle'

type Gist = components['schemas']['base-gist']

export const useGistStore = defineStore('gist', {
  state: () => ({
    login: '',
    gists: [] as Gist[],
    gist: {} as Gist,
    loading: false,
    error: null as null | unknown | Error,
  }),

  getters: {
  },

  actions: {
    async fetchGists() {
      this.loading = true
      this.gists = []
      try {
        const { viewer: { gists: { edges }, login }
        } = await api.graphql(
          `query GetGists {
            viewer {
              gists(first: 100, privacy: ALL) {
                edges {
                  node {
                    id: name
                    url
                    description
                    files {
                      extension
                      name
                    }
                    public: isPublic
                  }
                }
              }
              login
            }
          }`
        )
        this.login = login
        const filtered = edges.filter((edge: { node: { files: { extension: string }[] } }) => edge.node.files[0].extension === '.goggle')
        this.gists = filtered.map((edge: { node: object }) => edge.node)
        // console.log(this.gists)
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async fetchGist(id: string) {
      this.loading = true
      this.gist = {} as Gist
      try {
        const { viewer: { gist, login } } = await api.graphql(
          `query GetGist($name: String!) {
            viewer {
              gist(name: $name) {
                url
                id: name
                description
                files {
                  text
                }
                public: isPublic
              }
              login
            }
          }`,
          { name: id })
        this.login = login
        this.gist = gist
        const goggleStore = useGoggleStore()
        goggleStore.parseGoggle()
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async createGist() {
      this.loading = true
      this.gist = {} as Gist
      try {
        const res = await api.request('POST /gists', {
          public: false,
          files: {
            'index.goggle': {
              content: '!'
            }
          }
        })
        this.gist.public = false
        this.gist.url = res.data.html_url
        this.gist.id = res.data.id
        this.router.push(`/goggle/${this.gist.id}`)
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async updateGist() {
      this.loading = true
      try {
        await api.request(`PATCH /gists/${this.gist.id}`, {
          gist_id: this.gist.id,
          // description:,
          files: {
            'index.goggle': {
              content: 'hello'
            }
          }
        })
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async deleteGist() {
      this.loading = true
      this.gist = {} as Gist
      try {
        await api.request(`DELETE /gists/${this.gist.id}`, {
          gist_id: this.gist.id
        })
        this.router.push('/')
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
  }
})
