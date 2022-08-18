import { defineStore } from 'pinia'
import { components } from '@octokit/openapi-types'
import { api } from '../services/api'

type Gist = components['schemas']['base-gist']

export const useGoggleStore = defineStore('goggle', {
  state: () => ({
    login: '',
    gists: [],
    gist: {} as Gist,
    goggle: {},
    loading: false,
    error: null as unknown | null | Error,
  }),

  getters: {
    stringifiedGoggle(state) {
      return
    },
  },

  actions: {
    async fetchGoggles() {
      this.loading = true
      this.error = null
      try {
        const { viewer: { gists: { edges }, login }
        } = await api.graphql(
          `query GetGists {
            viewer {
              gists(first: 100, privacy: ALL) {
                edges {
                  node {
                    name: id
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
        const filtered = edges.filter((node: { files: { extension: string }[] }) => node.files[0].extension === '.goggle')
        this.gists = filtered.map((node: object) => node)
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async fetchGoggle(id: string) {
      this.loading = true
      this.error = null
      try {
        const { viewer: { gist, login } } = await api.graphql(
          `query GetGist($name: String!) {
            viewer {
              gist(name: $name) {
                url
                name: id
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
        this.parseGoggle()
        this.loading = false
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    async createGoggle() {
      try {
        this.loading = true
        this.error = null
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
    async updateGoggle() {
      try {
        this.loading = true
        this.error = null
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
    async deleteGoggle() {
      try {
        this.loading = true
        this.error = null
        await api.request(`DELETE /gists/${this.gist.id}`, {
          gist_id: this.gist.id
        })
        this.router.push('/')
      } catch (e) {
        this.error = e
        this.loading = false
      }
    },
    parseGoggle() {
      this.goggle = {
        metaData: {
          name: '',
          description: this.gist.description || '',
          public: this.gist.public || false,
          author: this.login || '',
          transferedTo: '',
          homepage: this.gist.url || '',
          issues: this.gist.url || '',
          license: '',
          avatar: '',
        },
        discard: [],
        boost: [],
        downrank: [],
      }
    },
  }
})
