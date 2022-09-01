import { Notify } from 'quasar'
import { defineStore } from 'pinia'
import { components } from '@octokit/openapi-types'
import { useGitHubStore } from './github'
import { useGoggleStore } from './goggle'

type Gist = components['schemas']['base-gist']

const api = useGitHubStore().api

export const useGistStore = defineStore('gist', {
  state: () => ({
    login: '',
    pagination: {
      gistsPerPage: 100,
      gogglesPerPage: 10,
      pageInfo: {
        endCursor: null,
        hasNextPage: true,
      },
    },
    gists: [] as Gist[],
    gist: {} as Gist,
    isLoading: false,
    error: null as null | unknown | Error,
  }),

  getters: {},

  actions: {
    resetGists() {
      this.gists = []
      this.pagination.pageInfo.endCursor = null
      this.pagination.pageInfo.hasNextPage = true
    },
    async fetchGists() {
      if (!this.pagination.pageInfo.hasNextPage) {
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const {
          viewer: {
            gists: { pageInfo, edges },
            login,
          },
        } = await api.graphql(
          `query GetGists ($perPage: Int!, $after: String) {
            viewer {
              gists(
                privacy: ALL,
                orderBy: {field: UPDATED_AT, direction: DESC},
                first: $perPage,
                after: $after
              ) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  node {
                    id: name
                    url
                    description
                    public: isPublic
                    files {
                      extension
                    }
                  }
                }
              }
              login
            }
          }`,
          {
            perPage: this.pagination.gistsPerPage,
            after: this.pagination.pageInfo.endCursor,
          },
        )
        // console.log(pageInfo, edges)
        this.login = login
        this.pagination.pageInfo = pageInfo
        const filtered = edges.filter(
          (edge: { node: { files: { extension: string }[] } }) =>
            edge.node.files[0].extension === '.goggle',
        )
        this.gists = this.gists.concat(
          filtered.map((edge: { node: object }) => edge.node),
        )
        // Automatically go further
        if (
          this.gists.length < this.pagination.gogglesPerPage &&
          pageInfo.hasNextPage
        ) {
          await this.fetchGists()
        }
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    },
    async fetchGist(id: string) {
      this.isLoading = true
      this.error = null
      this.gist = {} as Gist
      try {
        const {
          viewer: { gist, login },
        } = await api.graphql(
          `query GetGist($name: String!) {
            viewer {
              gist(name: $name) {
                url
                id: name
                description
                files {
                  filename: name
                  text
                }
                public: isPublic
              }
              login
            }
          }`,
          { name: id },
        )

        if (gist === null) {
          throw new Error("Gist doesn't exist")
        }

        this.login = login
        this.gist = gist
        useGoggleStore().parseGoggle()
      } catch (e) {
        this.error = e
        this.router.push('/')
      } finally {
        this.isLoading = false
      }
    },
    async createGist(isPublic: boolean) {
      this.isLoading = true
      this.error = null
      // Reload gists list with new gist
      this.pagination.pageInfo.hasNextPage = true
      this.gist = {} as Gist
      try {
        const res = await api.request('POST /gists', {
          public: isPublic,
          files: {
            'index.goggle': {
              content: '!',
            },
          },
        })
        this.gist.public = false
        this.gist.url = res.data.html_url
        this.gist.id = res.data.id
        this.router.push(`/goggle/${this.gist.id}`)
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    },
    async updateGist() {
      this.resetGists()
      const goggleStore = useGoggleStore()
      try {
        await api.request(`PATCH /gists/${this.gist.id}`, {
          gist_id: this.gist.id,
          description:
            goggleStore.goggle.metaData.name ||
            goggleStore.goggle.metaData.description ||
            '',
          files: {
            [this.gist.files[0].filename || 'index.goggle']: {
              content: goggleStore.stringifiedGoggle,
            },
          },
        })
        Notify.create({
          type: 'positive',
          message: 'Updated and submitted successfully',
          caption: 'GitHub gist updated and Brave goggle submitted',
        })
      } catch (e) {
        this.error = e
      }
    },
    async deleteGist() {
      this.error = null
      try {
        this.gists = this.gists.filter((gist: Gist) => gist.id !== this.gist.id)
        this.router.push('/')
        await api.request(`DELETE /gists/${this.gist.id}`, {
          gist_id: this.gist.id,
        })
        Notify.create({
          type: 'positive',
          message: 'Goggle deleted successfully',
        })
      } catch (e) {
        this.error = e
      }
    },
  },
})
